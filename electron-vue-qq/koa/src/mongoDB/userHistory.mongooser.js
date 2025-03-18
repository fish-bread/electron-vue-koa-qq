const mongoose = require('mongoose')
const { Schema } = mongoose
const db = mongoose.createConnection('mongodb://127.0.0.1:27017/qq_users',{
});
db.on('connected', (err) => {
    if(err) {
        console.log('users数据库连接失败'+err);
    }
    else {
        console.log('连接users数据库成功')
    }
});
const UserSchema = new Schema({
    user1: { 
        user1_uid: { type: Number, required: true },
        user1_name: { type: String, required: true },
        user1_headshot: { type: String, default: '/userHeadshot/2.jpg'},
    },
    user2: {
        user2_uid: { type: Number, required: true },
        user2_name: { type: String, required: true },
        user2_headshot: { type: String, default: '/userHeadshot/2.jpg'},
    },
    user_history: [{
        sender_uid: { type: Number, required: true }, // 发送者的 uid
        message: { type: String, required: true },   // 发送的内容
        timestamp: { type: Date, default: Date.now } // 时间戳
    }],
})
const userHistoryModel = db.model('userHistory', UserSchema, 'userHistory')
module.exports = userHistoryModel;