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
    user_name: String,
    user_email: String,
    user_uid: { type: Number, unique: true, required: true },
    user_headshot: {type: String, default: 'http://localhost:3000/userHeadshot/2.jpg?t=1701164122754'},
    user_level: { type: Number, default: 0 },
    user_thumbs_up: { type: Number, default: 0 },
    user_personal_signature: { type: String, default: '用户还并未设置个性签名' },
    user_gender: { type: String, default: 'none' },
    user_birthday: { type: String, default: 'none' },
    user_country: { type: String, default: '中国' },
    user_region: { type: String, default: 'none' },
    user_friend_uid: [ String ]
})
const userModel = db.model('user', UserSchema, 'user')
module.exports = userModel;