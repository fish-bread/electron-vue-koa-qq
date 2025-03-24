const userModel = require('../mongoDB/user.mongoose.js')
let newUid = 10000000000;
let defaultName = '用户';
class UserService {
    //创建用户
    async createUser(email) {
        const maxUid = await userModel.findOne().sort({user_uid:-1}).exec()
       console.log('是否存在用户',maxUid)
        if (maxUid) {
            console.log('查询最大uid为',maxUid.user_uid)
            newUid = maxUid.user_uid + 1 
        }
        const user =new userModel(
            {user_name: defaultName + newUid, user_email: email, user_uid:newUid}
        )
        await user.save()
        console.log('执行创建');
        return user
    }
    //删除用户
    async deleteUser(userUid) {
        const search = new UserService()
        const user = await search.searchUserUid(userUid);// 使用 searchUserUid 查找用户
        if (!user) {
            return { message: '用户不存在' };  // 如果没有找到用户，返回错误信息
        } else {
            const result = await userModel.deleteOne({user_uid: userUid},{});
            if (result.deletedCount === 0) {
                return {success: false, message: '未找到用户或用户已删除'};
            }
            return {success: true, message: '用户删除成功'};
        }
    }
    //通过邮箱查找用户
    async searchUser(email) {
        const findOk = await userModel.findOne({user_email: email,},{},{})
        if (findOk) {
            const { user_email , user_uid,
                user_name,user_headshot,
                user_level, user_thumbs_up, user_personal_signature,
                user_gender, user_birthday, user_country,
                user_region,user_friend_uid  } = findOk
            console.log('用户查找成功',{ user_email,  user_uid,
                user_name,user_headshot, 
                user_level, user_thumbs_up, user_personal_signature,
                user_gender, user_birthday, user_country,
                user_region, user_friend_uid  } );
            return { user_email , user_uid,
                user_name,user_headshot,
                user_level, user_thumbs_up, user_personal_signature,
                user_gender, user_birthday, user_country,
                user_region ,user_friend_uid }
        } else {
            console.log('用户未查询到', findOk)
            return null
        }
    }
    //通过uid查找用户
    async searchUserUid(userUid) {
        const user = await userModel.findOne({user_uid: userUid}, {}, {})
        if (user) {
            const { user_email , user_uid, 
                user_name,user_headshot,  
                user_level, user_thumbs_up, user_personal_signature, 
                user_gender, user_birthday, user_country,
                user_region ,user_friend_uid } = user
            console.log('用户查找成功', {user_email , user_uid,
                user_name,user_headshot,
                user_level, user_thumbs_up, user_personal_signature,
                user_gender, user_birthday, user_country,
                user_region, user_friend_uid});
            return { user_email , user_uid,
                user_name,user_headshot,
                user_level, user_thumbs_up, user_personal_signature,
                user_gender, user_birthday, user_country,
                user_region,user_friend_uid  }
        } else {
            console.log('未找到用户')
            return null
        }
    }
    //通过uid去更新用户资料
    async searchAndUpdateUser(user) {
        const updatedUser = userModel.findOneAndUpdate(
            { user_uid: user.userUid },
            {$set: {
                    user_name: user.userName,
                    user_Personal_signature: user.userPersonalSignature,
                    user_gender: user.userGender,
                    user_birthday: user.userBirthday,
                    user_country: user.userCountry,
                    user_region: user.userRegion,
                }},
            { new: true } // 返回更新后的文档
        )
        if (updatedUser) {
            console.log('用户资料更新成功', updatedUser);
            return updatedUser
        } else {
            console.log('未找到用户或更新失败', updatedUser);
            return null;
        }
    }
    //通过添加uid加好友
    async searchUserAddUid(addUid, userUid) {
        try {
            
            console.log('执行搜索')
            // 查找当前用户
            const currentUser = await userModel.findOne({ user_uid: userUid }, {}, {});
            if (!currentUser) {
                return { success: false, message: '当前用户不存在' };
            }

            // 查找要添加的好友
            const friendUser = await userModel.findOne({ user_uid: addUid }, {}, {});
            if (!friendUser) {
                return { success: false, message: '好友用户不存在' };
            }
            if (addUid === userUid) {
                return { success: false, message: '该用户是用户本身' };
            }
            // 检查是否已经是好友
            if (currentUser.user_friend_uid.includes(addUid)) {
                return { success: false, message: '该用户已经是好友' };
            }

            // 将好友 uid 添加到当前用户的 user_friend_uid 数组中
            currentUser.user_friend_uid.push(addUid);
            await currentUser.save();
            //好友也添加用户id进 user_friend_uid 数组中
            friendUser.user_friend_uid.push(userUid);
            await friendUser.save();
            //返回修改对象
            const user = await search.searchUserUid(userUid);
            // 返回修改后的 user 对象
            return {
                success: true,
                message: '好友添加成功',
                user: user
            };
        } catch (error) {
            console.error('添加好友失败:', error);
            return { success: false, message: '添加好友失败' };
        }
    }
    //通过朋友uid去遍历查找用户
    async searchUserFriendUid(userFriendUid) {
        try {
            const users = await userModel.find({ user_uid: { $in: userFriendUid } });
            return users.map(user => ({
                user_friend_name: user.user_name,
                user_friend_uid: user.user_uid,
                user_friend_headshot: user.user_headshot,
                user_friend_level: user.user_level,
                user_friend_thumbs_up: user.user_thumbs_up,
                user_friend_personal_signature: user.user_personal_signature,
                user_friend_gender: user.user_gender,
                user_friend_birthday: user.user_birthday,
                user_friend_country: user.user_country,
                user_friend_region: user.user_region,
            }));
        } catch (error) {
            console.error('Error searching user friends:', error);
            throw error;
        }
    }
    //更改用户名字
    async changeUser(userNewName, userUid ) {
        const search = new UserService()
        const user = await search.searchUserUid(userUid);  // 使用 searchUserUid 查找用户
        if (!user) {
            return { error: '用户不存在' };  // 如果没有找到用户，返回错误信息
        }
        // 如果找到了用户，更新用户名
        const updatedUser = await userModel.findOneAndUpdate(
            { user_uid: userUid },  // 查找条件
            { user_name: userNewName },  // 更新的字段
            { new: true }  // 返回更新后的文档
        );
        if (updatedUser) {
            console.log('用户名更新成功', updatedUser);
            return { userNewName: updatedUser.user_name, userNewUid: userUid };  // 返回更新后的用户名
        } else {
            return { error: '更新失败' };  // 如果更新失败，返回错误信息
        }
    }
    //更改用户头像图片路径
    async changeUserHeadshot(userNewHeadshot , userUid) {
       
        const user = await search.searchUserUid(userUid)
        if (!user) {
            return { error: '用户不存在' };  // 如果没有找到用户，返回错误信息
        }
        // 如果找到了用户，更新用户图片路径
        const updatedUser = await userModel.findOneAndUpdate(
            { user_uid: userUid },  // 查找条件
            { user_headshot: userNewHeadshot },  // 更新的字段
            { new: true }  // 返回更新后的文档
        );
        if (updatedUser) {
            const { user_email , user_uid,
                user_name,user_headshot,
                user_level, user_thumbs_up, user_personal_signature,
                user_gender, user_birthday, user_country,
                user_region ,user_friend_uid } = updatedUser
            console.log('用户图片路径更新成功', updatedUser);
            return { user_email , user_uid,
                user_name,user_headshot,
                user_level, user_thumbs_up, user_personal_signature,
                user_gender, user_birthday, user_country,
                user_region ,user_friend_uid };  // 返回更新后的用户Uid
        } else {
            return { error: '更新失败' };  // 如果更新失败，返回错误信息
        }
    }
}
const search = new UserService()
module.exports =new UserService;