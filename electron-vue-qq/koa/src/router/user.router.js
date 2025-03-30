//puppeteer与//cookie
//邮件验证
// noinspection SpellCheckingInspection

const nodemailer = require('nodemailer');
// 创建邮件传输器
const transporter = nodemailer.createTransport({
    service: '163', // 例如 'gmail', 'qq', '163' 等
    port: 465, // SMTP 端口
    secureConnection: true, // 使用了 SSL
    auth: {
        user: 'zx3434241933@163.com',
        pass: 'PBhwZ3BwcGVQ74C8' // 或 app password
    }
});
// 存储验证码和过期时间的键值对
const verificationCodes = new Map();
// 生成六位验证码
function generateVerificationCode() {
    let code = '';
    for (let i = 0; i < 6; i++) {
        code += Math.floor(Math.random() * 10);
    }
    return code;
}
//调用
const Router = require('@koa/router');
const { createUser, searchUser, searchUserUid,searchUserFriendUid, 
    searchUserAddUid, deleteUser, changeUserHeadshot,
    searchAndUpdateUser,getFileType} = require('../service/user.service.js')
const { createUserHistory, searchUserHistoryUid } = require('../service/userHistory.service');
const router = new Router();
//文件存储
const multer = require('@koa/multer');
const syncFs = require('fs')
const fs = require('fs').promises;
const path = require('path');
// Multer 配置 (内存存储)
const storage = multer.memoryStorage();
const upload = multer({ storage });
//jwt设置
const jwt = require('jsonwebtoken');
const JWT_SECRET = require('../UserController')
// 创建 WebSocket 服务器
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 3001, maxConnections: 100 });
const activeConnections = new Map();
const connections = new Map();
//传输消息
wss.on('connection', (ws) => {
    console.log('客户端连接数:', wss.clients.size);
    
    ws.on('message', async (message) => {
        // 将消息字符串解析为对象
        const messageData = JSON.parse(message);
        //心跳
        if (messageData.Heartbeat === true &&  messageData.user_token) {
            //console.log(`收到心跳消息：${message}`);
                try {
                    const decoded = jwt.verify(messageData.user_token, JWT_SECRET);
                    //console.log('心跳验证,decoded_jwt', decoded);
                    activeConnections.set(decoded.user_uid, ws); // 绑定UID与连接
                } catch (e) {
                    console.log('token验证失败')
                    ws.close(); // 认证失败则关闭连接
                }
        }
        //消息
        if ( messageData.Heartbeat === false && messageData.user_token) {
            try {
                console.log('接收样式',messageData);
                const decoded = jwt.verify(messageData.user_token, JWT_SECRET);
                console.log('decoded_jwt', decoded);
                activeConnections.set(decoded.user_uid, ws); // 绑定UID与连接
                console.log('当前活跃连接:', Array.from(activeConnections.keys()));
            } catch (e) {
                console.log('token验证失败')
                ws.close(); // 认证失败则关闭连接
            }
            try {
                console.log(`收到消息：${message}`);

                const { user_uid, user_to_uid, user_message } = messageData;
                console.log('消息解析', user_uid, user_to_uid, user_message);
                // 存储消息到 MongoDB
                const history = {
                    sender_uid: user_uid,
                    message: user_message,
                    fileType: 'text', // 添加标记表示这是音频消息
                    fileSize: null,
                    timestamp: new Date()
                };
                const user1 =await searchUserUid(user_uid);
                const user2 =await searchUserUid(user_to_uid);
                const userHistory = await createUserHistory(history, user1, user2);

                // 广播消息给指定客户端
                const targetWs = activeConnections.get(user_to_uid);
                const userWs = activeConnections.get(user_uid);
                if (targetWs && targetWs.readyState === WebSocket.OPEN) {
                    targetWs.send(JSON.stringify(
                        {
                            user_uid: user_uid,
                            user_to_uid: user_to_uid,
                            user_message: user_message,
                            fileType: 'text',
                            fileSize: null,
                            timestamp: new Date()
                        }
                    ));
                }
                if (userWs && userWs.readyState === WebSocket.OPEN) {
                    userWs.send(JSON.stringify(
                        {
                            user_uid: user_uid,
                            user_to_uid: user_to_uid,
                            user_message: user_message,
                            fileType: 'text',
                            fileSize: null,
                            timestamp: new Date()
                        }
                    ))
                    /*
                const user_history =   JSON.stringify({
                user1:{
                    user1_uid: userHistory.user1.user1_uid,
                    user1_name: userHistory.user1.user1_name,
                    user1_headshot: userHistory.user1.user1_headshot
                },
                 user2:{
                    user2_uid: userHistory.user2.user2_uid,
                    user2_name: userHistory.user2.user2_name,
                    user2_headshot: userHistory.user2.user2_headshot
                },
                 user_history: userHistory.user_history
                })
                console.log('发送消息',user_history)
                // 向客户端发送消息
                ws.send(user_history);*/
                }
            } catch (error) {
                console.error('消息处理错误:', error);
            }
        }
        //webrtc
        if (messageData.type === 'offer' || messageData.type === 'answer' || messageData.type === 'candidate') {
            console.log('webrtc链接', connections)
            try {
                const decoded = jwt.verify(messageData.user_token, JWT_SECRET);
                console.log('webrtc的decoded_jwt', decoded);
                connections.set(decoded.user_uid, ws); // 绑定UID与连接
            } catch (e) {
                console.log('token验证失败')
                ws.close(); // 认证失败则关闭连接
            }
            const targetWs = connections.get(messageData.targetUid);
            if (targetWs && targetWs.readyState === WebSocket.OPEN) {
                targetWs.send(JSON.stringify(messageData));
            } else {
                console.log('另一方客户端未启动')
            }
        }
    })
    //关闭ws
    ws.on('close', () => {
        console.log('客户端连接已关闭');
        console.log('剩余客户端连接数:', wss.clients.size);
        activeConnections.forEach((value, key) => {
            if (value === ws) activeConnections.delete(key);
        });
    });
    ws.on('error', (error) => {
        console.error('WebSocket error:', error);
        if (error.code === 'ECONNRESET') {
            console.log('客户端强制断开连接');
        }
    })
});
//创建和登录用户
router.post('/user_login_email', async (ctx, next) => {
    const {user_email, user_captcha} = ctx.request.body;
    console.log('验证码',user_captcha);
    // 获取存储的验证码
    const storedCode = verificationCodes.get(user_email);
    // 验证验证码是否有效
    if (!storedCode || storedCode.code !== user_captcha || Date.now() > storedCode.expires) {
        ctx.status = 400; // Bad Request
        ctx.body = { message: '无效或过期的验证码' };
        console.log('验证码验证失败')
        // 清除已经失效的验证码
        if ( storedCode && Date.now() > storedCode.expires) {
          verificationCodes.delete(user_email);
        }
        return; // 停止后续操作
    }
    // 验证码验证成功，清除验证码
    verificationCodes.delete(user_email);
    console.log('验证码验证成功')
    try {
        //检查用户是否存在
        const search = await searchUser(user_email);
        console.log('用户',search);
        if (ctx.request.body && search === null && user_captcha) {
            console.log('用户未创建',ctx.request.body);
            const user = await createUser(user_email);
            ctx.status = 201;
            console.log('创建用户成功')
            const newSearch = await searchUser(user_email);
            const token = jwt.sign({user_email: user_email, user_uid: newSearch.user_uid}, JWT_SECRET, { expiresIn: '24h' });
            console.log('token', token);
            ctx.body = {
                mission: '用户未存在,已成功创建',
                user: {
                    user_name: newSearch.user_name,
                    user_email: newSearch.user_email,
                    user_uid: newSearch.user_uid,
                    user_headshot: newSearch.user_headshot,
                    user_level: newSearch.user_level,
                    user_thumbs_up: newSearch.user_thumbs_up,
                    user_personal_signature: newSearch.user_personal_signature,
                    user_gender: newSearch.user_gender,
                    user_birthday: newSearch.user_birthday,
                    user_country: newSearch.user_country,
                    user_region: newSearch.user_region,
                    user_friend_uid: newSearch.user_friend_uid,
                },
                user_token: token,
            }
        }
    else {
        console.log('用户已创建')
        const newSearch = await searchUser(user_email);
        if (ctx.headers.authorization) {
            console.log('有token:', ctx.headers.authorization);
            console.log('登录状态');
        } else {
            console.log('无token')
            console.log('离线状态')
        }
        const token = jwt.sign({user_email: user_email, user_uid: newSearch.user_uid}, JWT_SECRET, { expiresIn: '24h' });
        console.log('token', token);
        ctx.body = {
            mission: '用户已存在',
            user: {
                user_name: newSearch.user_name,
                user_email: newSearch.user_email,
                user_uid: newSearch.user_uid,
                user_headshot: newSearch.user_headshot,
                user_level: newSearch.user_level,
                user_thumbs_up: newSearch.user_thumbs_up,
                user_personal_signature: newSearch.user_personal_signature,
                user_gender: newSearch.user_gender,
                user_birthday: newSearch.user_birthday,
                user_country: newSearch.user_country,
                user_region: newSearch.user_region,
                user_friend_uid: newSearch.user_friend_uid,
            },
            user_token: token,
        }
        ctx.status = 200;
    }
} catch (err) {
        console.error('用户注册/登录错误:', err); // 更详细的错误信息
        ctx.throw(500, '服务器内部错误'); // Internal Server Error
        console.log(err);
    }
    await next()
})
// 发送邮件验证码的路由
router.post('/user_sendEmail', async (ctx,next) => {
    console.log('触发邮件')
    try {
        const { to } = ctx.request.body; // 获取邮件信息
        // 检查是否已存在该邮箱的验证码，如果存在则删除
        if (verificationCodes.has(to)) {
            console.log('删除之前的验证码 for', to);
            verificationCodes.delete(to);
        }
        // 生成验证码并设置过期时间
        const verificationCode = generateVerificationCode();
        const expirationTime = Date.now() + 30 * 60 * 1000; // 30分钟过期
        verificationCodes.set(to, { code: verificationCode, expires: expirationTime });
        // 读取 HTML 文件内容
        const emailTemplatePath = path.join(__dirname,'../../static/emailHtml.html'); // 调整路径
        let htmlContent = await fs.readFile(emailTemplatePath, 'utf-8');
        // 替换验证码占位符
        htmlContent = htmlContent.replace('${verificationCode}', verificationCode);
    const mailOptions = {
        from: 'zx3434241933@163.com',
        to,
        subject: '验证你的邮箱', // 设置默认主题
        html: htmlContent // 设置默认内容
    };
    await transporter.sendMail(mailOptions); // 发送邮件
    ctx.body = { message: '邮件发送成功' }; // 返回成功信息
} catch (error) {
    console.error('Error sending email:', error);
    ctx.throw(500, 'Failed to send email'); // 抛出错误
}
    await next()
});
//验证用户登录状态
router.post('/user_login_token', async (ctx,next) => {
    try {
        // 通过 koa-jwt 自动校验 token 有效性
        // 如果 token 过期会直接抛出 401 错误
        ctx.body = { code: 200, message: 'token succeed' };
    } catch (error) {
        ctx.status = 401;
        ctx.body = { code: 401, message: 'Token expired' };
    }
})
//查找用户并更改头像
router.post('/user/changeUserHeadshot', upload.single('Headshot'), async (ctx, next) => {
    const { userUid }  = ctx.request.body
    const file = ctx.file;
    if (!userUid || !file) {
        ctx.status = 400;
        ctx.body = { message: '缺少 userUid  或文件' };
        return;
    }
    try {
        const fileExtension = path.extname(file.originalname);
        const newFileName = `${userUid}${fileExtension}`;
        const filePath = path.resolve(__dirname, '..', '..', 'static', 'userHeadshot', newFileName);
        await fs.writeFile(filePath, file.buffer);
        const userNewHeadshot = `http://localhost:3000/userHeadshot/${newFileName}?${Date.now()}`; // 新的头像路径
        // 调用你的 changeUserHeadshot 函数
        const updateResult = await changeUserHeadshot(userNewHeadshot, userUid);
        if (updateResult.error) { // 检查是否有错误
            ctx.status = 400;
            ctx.body = { 
                message: updateResult.error,
            };
            return;
        }
        ctx.status = 200;
        console.log('头像',updateResult)
        ctx.body = {
            message: '头像更新成功',
            user: updateResult // 返回新的头像路径
        };
    } catch (error) {
        console.error('头像保存失败:', error);
        ctx.status = 500;
        ctx.body = { message: '头像保存失败: ' + error.message }; // 返回更详细的错误信息
    }
    await next()
})
//查询并更新用户资料
router.post('/user_edit_profile',async (ctx,next) => {
    try {
    const { userUid,userName, userPersonalSignature,userGender,userBirthday,userCountry,userRegion } = ctx.request.body
    const user = { userUid,userName,userPersonalSignature,userGender,userBirthday,userCountry,userRegion }
        console.log('user资料',user)
    const searchUser = await searchAndUpdateUser(user)
    if (searchUser === null) {
        ctx.status = 404;
        ctx.body = {
            message: '未找到用户或更新失败'
        };
    }else {
        ctx.status = 200;
        ctx.body = {
            message: '用户资料更新成功',
            user:{
                user_name: searchUser.user_name,
                user_email:searchUser.user_email,
                user_uid: searchUser.user_uid,
                user_headshot: searchUser.user_headshot,
                user_level: searchUser.user_level,
                user_thumbs_up: searchUser.user_thumbs_up,
                user_personal_signature: searchUser.user_personal_signature,
                user_gender: searchUser.user_gender,
                user_birthday: searchUser.user_birthday,
                user_country: searchUser.user_country,
                user_region: searchUser.user_region,
                user_friend_uid: searchUser.user_friend_uid,
            }
        };
    }
}catch (error) {
        console.error('用户资料更新失败:', error);
        ctx.status = 500;
        ctx.body = {
            message: '用户资料更新失败'
        };
    }
})
//删除用户
router.post('/user/deleteUser', async (ctx, next) => {
    const { userUid } = ctx.request.body;
    if (ctx.request.body) {
        ctx.status = 200;
        const name = await deleteUser(userUid);
        ctx.body = {
            message: name.message,
        }
    }
    else {
        ctx.response.body = ctx.request.body;
        ctx.status = 500;
        console.log('用户输入信息为空')
    }
    await next()
})
//查询未知用户uid
router.post('/user_none_search', async (ctx) => {
    const { user_none_search_uid } = ctx.request.body;
    console.log('未知用户uid',user_none_search_uid);
    const user = await searchUserUid(user_none_search_uid)
    if (user === '') {
        ctx.status = 200;
        ctx.body = {
            user: ''
        }
    } else {
        ctx.status = 200;
        ctx.body = {
            user: {
                search_user_name: user.user_name,
                search_user_uid: user.user_uid,
                search_user_headshot:  user.user_headshot
            }
        }
    }
})
//添加未知用户uid
router.post('/user_add_uid', async (ctx) => {
    const { add_uid, user_uid } = ctx.request.body;
    console.log('添加未知用户',add_uid,'用户本人', user_uid);
    const user = await searchUserAddUid(add_uid,user_uid);
    ctx.status = 200;
    ctx.body = {
        message: user.message,
        user: user.user
    }
})
//返回用户朋友列表
router.post('/user_friend', async (ctx) => {
    const { user_uid } = ctx.request.body;
    console.log('列表uid', user_uid);
    try {
        // 确保 user_uid 是一个扁平数组
        const friends = await searchUserFriendUid(user_uid);
        ctx.status = 200;
        ctx.body = { 
            user_friend: friends
        };
    } catch (error) {
        ctx.status = 500;
        ctx.body = { message: 'Internal server error' };
    }
})
//查询历史
router.post('/user_search_message', async (ctx) => {
    const { user_uid, user_to_uid } = ctx.request.body;
    console.log('执行查询历史', user_uid, user_to_uid);
    const userHistory = await searchUserHistoryUid(user_uid, user_to_uid)
    if (userHistory) {
        ctx.status = 200;
        ctx.body = {
            message: '历史信息获取成功',
            user_history: {
                user1:{
                    user1_uid: userHistory.user1.user1_uid,
                    user1_name: userHistory.user1.user1_name,
                    user1_headshot: userHistory.user1.user1_headshot
                },
                user2:{
                    user2_uid: userHistory.user2.user2_uid,
                    user2_name: userHistory.user2.user2_name,
                    user2_headshot: userHistory.user2.user2_headshot
                },
                user_history: userHistory.user_history
            }
        }; 
    } else {
        ctx.body = {
            message: '用户未创建历史'
        }
    }
   
})
//储存音频文件
router.post('/user_chat_audio',  upload.single('audio'),async (ctx) => {
    console.log('收到音频上传请求'); // 添加日志
    const { user_uid,user_to_uid }  = ctx.request.body
    const file = ctx.file
    console.log('user_uid', user_uid);
    console.log('user_to_uid', user_to_uid);

    if (!file || !user_uid || !user_to_uid) {
        ctx.status = 400;
        ctx.body = { message: '缺少必要参数' };
        return;
    }

    try {
        // 创建用户文件夹路径
        const baseDir = path.resolve(__dirname, '..', '..', 'userFile');

        // 标准化文件夹名称：将用户ID排序后拼接，确保顺序无关
        const sortedIds = [user_uid, user_to_uid].sort();
        const standardizedDirName = `${sortedIds[0]}_${sortedIds[1]}`;
        const userDir = path.join(baseDir, standardizedDirName);

        // 如果文件夹不存在则创建
        if (!syncFs.existsSync(userDir)) {
            syncFs.mkdirSync(userDir, { recursive: true });
        }

        // 生成唯一文件名
        const timestamp = Date.now();
        const fileExtension = path.extname(file.originalname);
        const fileName = `audio_${timestamp}${fileExtension}`;
        const filePath = path.join(userDir, fileName);
        console.log('文件地址', filePath);

        // 写入文件
        await fs.writeFile(filePath, file.buffer);

        // 生成动态访问URL - 保持原始用户顺序的URL
        const fileUrl = `http://localhost:3000/user_audio/${user_uid}/${user_to_uid}/${fileName}`;

        // 创建历史记录
        const history = {
            sender_uid: user_uid,
            message: fileUrl, // 存储文件URL而不是实际内容
            fileType: 'audio', // 添加标记表示这是音频消息
            fileSize: null,
            timestamp: new Date()
        };

        const user1 = await searchUserUid(user_uid);
        const user2 = await searchUserUid(user_to_uid);
        await createUserHistory(history, user1, user2);
        
        // 通过WebSocket发送消息给双方
        console.log('当前活跃连接:',  [...activeConnections.entries()]);
        console.log('活跃连接详情:', activeConnections);
        const targetWs = activeConnections.get(Number(user_to_uid));
        const userWs = activeConnections.get(Number(user_uid));
        
        const wsMessage = {
            user_uid: Number(user_uid),
            user_to_uid: Number(user_to_uid),
            user_message: fileUrl, // 这里发送音频URL
            fileType: 'audio', // 添加标记表示这是音频消息
            fileSize: null,
            timestamp: new Date(),
            
        };
        console.log('准备发送WebSocket消息:', JSON.stringify(wsMessage));
        console.log('目标用户连接状态:', targetWs);
        console.log('当前用户连接状态:', userWs);
        
        if (targetWs && targetWs.readyState === WebSocket.OPEN) {
            console.log('发送ws给朋友');
            targetWs.send(JSON.stringify(wsMessage));
        }
        if (userWs && userWs.readyState === WebSocket.OPEN) {
           console.log('发送ws给用户');
            userWs.send(JSON.stringify(wsMessage));
        }

        ctx.status = 200;
        ctx.body = {
            message: '音频上传成功',
            fileUrl: fileUrl
        };
    } catch (err) {
        ctx.status = 400;
        console.log(err);
    }
})
//查询音频文件
router.get('/user_audio/:user_uid/:user_to_uid/:filename', async (ctx) => {
    const { user_uid, user_to_uid, filename } = ctx.params;

    try {
        const baseDir = path.resolve(__dirname, '..', '..', 'userFile');
        const filePath = path.join(baseDir, `${user_uid}_${user_to_uid}`,filename);
        const filpPath = path.join(baseDir, `${user_to_uid}_${user_uid}`,filename);
        // 检查文件是否存在
        if (!syncFs.existsSync(filePath)) {
            if (!syncFs.existsSync(filpPath)) {
                ctx.status = 404;
                ctx.body = { message: '文件不存在' };
                return;
            } 
            else {
                // 设置正确的Content-Type
                ctx.type = path.extname(filename);
                // 返回文件内容
                ctx.body = syncFs.createReadStream(filpPath);
            }
        } 
        else {
            // 设置正确的Content-Type
            ctx.type = path.extname(filename);
            // 返回文件内容
            ctx.body = syncFs.createReadStream(filePath);
        }
    } catch (error) {
        console.error('文件读取失败:', error);
        ctx.status = 500;
        ctx.body = { message: '文件读取失败' };
    }
});
// 存储图片文件
router.post('/user_chat_image', upload.array('images'), async (ctx) => {
    const { user_uid, user_to_uid } = ctx.request.body;
    const files = ctx.files; // 获取所有上传的文件
    
    if (!files || files.length === 0 || !user_uid || !user_to_uid) {
        ctx.status = 400;
        ctx.body = { message: '缺少必要参数' };
        return;
    }
    try {
        const baseDir = path.resolve(__dirname, '..', '..', 'userFile');
        const sortedIds = [user_uid, user_to_uid].sort();
        const standardizedDirName = `${sortedIds[0]}_${sortedIds[1]}`;
        const userDir = path.join(baseDir, standardizedDirName);

        // 创建目录如果不存在
        if (!syncFs.existsSync(userDir)) {
            syncFs.mkdirSync(userDir, { recursive: true });
        }

        // 存储所有图片并生成URL
        const imageUrls = [];
        for (const file of files) {
            const timestamp = Date.now();
            const fileExtension = path.extname(file.originalname);
            const fileName = `image_${timestamp}_${fileExtension}`;
            const filePath = path.join(userDir, fileName);

            await fs.writeFile(filePath, file.buffer);
            imageUrls.push(`http://localhost:3000/user_image/${user_uid}/${user_to_uid}/${fileName}`);
        }

        // 创建历史记录 (多个图片作为一条记录)
        const history = {
            sender_uid: user_uid,
            message: imageUrls.join('|'), // 用分隔符连接多个URL
            fileType: 'images', // 标记为多图片类型
            fileSize: null,
            timestamp: new Date()
        };

        const user1 = await searchUserUid(user_uid);
        const user2 = await searchUserUid(user_to_uid);
        await createUserHistory(history, user1, user2);

        // 通过WebSocket通知双方
        const targetWs = activeConnections.get(Number(user_to_uid));
        const userWs = activeConnections.get(Number(user_uid));

        const wsMessage = {
            user_uid: Number(user_uid),
            user_to_uid: Number(user_to_uid),
            user_message: imageUrls, // 发送URL数组
            fileType: 'images',
            fileSize: null,
            timestamp: new Date()
        };

        if (targetWs && targetWs.readyState === WebSocket.OPEN) {
            targetWs.send(JSON.stringify(wsMessage));
        }
        if (userWs && userWs.readyState === WebSocket.OPEN) {
            userWs.send(JSON.stringify(wsMessage));
        }

        ctx.status = 200;
        ctx.body = {
            message: '图片上传成功',
        };

    } catch (err) {
        console.error('图片上传失败:', err);
        ctx.status = 500;
        ctx.body = { message: '图片上传失败' };
    }
})
// 图片访问路由
router.get('/user_image/:user_uid/:user_to_uid/:filename', async (ctx) => {
    const { user_uid, user_to_uid, filename } = ctx.params;

    try {
        const baseDir = path.resolve(__dirname, '..', '..', 'userFile');
        const sortedIds = [user_uid, user_to_uid].sort();
        const dirName = `${sortedIds[0]}_${sortedIds[1]}`;
        const filePath = path.join(baseDir, dirName, filename);

        if (!syncFs.existsSync(filePath)) {
            ctx.status = 404;
            ctx.body = { message: '文件不存在' };
            return;
        }

        ctx.type = path.extname(filename);
        ctx.body = syncFs.createReadStream(filePath);

    } catch (error) {
        console.error('文件读取失败:', error);
        ctx.status = 500;
        ctx.body = { message: '文件读取失败' };
    }
});
//存储一般文件
router.post('/user_chat_file', upload.array('files'), async (ctx) => {
    const { user_uid, user_to_uid } = ctx.request.body;
    const files = ctx.files;
    if (!files || files.length === 0 || !user_uid || !user_to_uid) {
        console.log('缺少参数:', { files, user_uid, user_to_uid })
        ctx.status = 400;
        ctx.body = { message: '缺少必要参数' };
        return;
    }

    try {
        const baseDir = path.resolve(__dirname, '..', '..', 'userFile');
        const sortedIds = [user_uid, user_to_uid].sort();
        const standardizedDirName = `${sortedIds[0]}_${sortedIds[1]}`;
        const userDir = path.join(baseDir, standardizedDirName);

        // 创建目录如果不存在
        if (!syncFs.existsSync(userDir)) {
            syncFs.mkdirSync(userDir, {recursive: true});
        }
        const user1 = await searchUserUid(user_uid);
        const user2 = await searchUserUid(user_to_uid);
        // 为每个文件创建独立的历史记录
        for (const file of files) {
            // 处理中文文件名
            const originalName = decodeURIComponent(escape(file.originalname));
            const fileExtension = path.extname(originalName);
            const originalNameWithoutExt = path.basename(originalName, fileExtension); // 获取原文件名（不带后缀）
            const timestamp = Date.now();
            const fileName = `file_${originalNameWithoutExt}_${timestamp}${fileExtension}`; // 新文件名格式
            const filePath = path.join(userDir, fileName);

            await fs.writeFile(filePath, file.buffer);

            const fileUrl = `http://localhost:3000/user_file/${user_uid}/${user_to_uid}/${fileName}`;

            // 为每个文件创建独立的历史记录
            const history = {
                sender_uid: user_uid,
                message: fileUrl,
                fileType: getFileType(file.mimetype), // 根据mimetype分类
                fileSize: file.size,
                timestamp: new Date()
            };

            // 保存历史记录
            await createUserHistory(history, user1, user2);
            
            // 为每个文件发送独立的WebSocket消息
            const targetWs = activeConnections.get(Number(user_to_uid));
            const userWs = activeConnections.get(Number(user_uid));

            const wsMessage = {
                user_uid: Number(user_uid),
                user_to_uid: Number(user_to_uid),
                user_message: fileUrl,
                fileType: getFileType(file.mimetype),
                fileSize: file.size,
                timestamp: new Date()
            };

            if (targetWs && targetWs.readyState === WebSocket.OPEN) {
                targetWs.send(JSON.stringify(wsMessage));
            }
            if (userWs && userWs.readyState === WebSocket.OPEN) {
                userWs.send(JSON.stringify(wsMessage));
            }
        }

        ctx.status = 200;
        ctx.body = {
            message: '文件上传成功',
        };
    }catch (err) {
        console.error('文件上传失败:', err);
        ctx.status = 500;
        ctx.body = { message: '文件上传失败' };
    }
})
//读取一般文件
router.get('/user_file/:user_uid/:user_to_uid/:filename', async (ctx) => {
    const { user_uid, user_to_uid, filename } = ctx.params;
    try {
        const baseDir = path.resolve(__dirname, '..', '..', 'userFile');
        const sortedIds = [user_uid, user_to_uid].sort();
        const dirName = `${sortedIds[0]}_${sortedIds[1]}`;
        const filePath = path.join(baseDir, dirName, filename);

        if (!syncFs.existsSync(filePath)) {
            ctx.status = 404;
            ctx.body = { message: '文件不存在' };
            return;
        }

        ctx.type = path.extname(filename);
        ctx.body = syncFs.createReadStream(filePath);

    } catch (error) {
        console.error('文件读取失败:', error);
        ctx.status = 500;
        ctx.body = { message: '文件读取失败' };
    }
})
module.exports = router;