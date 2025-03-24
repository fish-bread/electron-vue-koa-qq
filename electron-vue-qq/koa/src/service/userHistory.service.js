const userHistoryModel = require('../mongoDB/userHistory.mongooser.js')
class UserHistoryService {
    // 创建和添加用户历史
    async createUserHistory(history, user1, user2) { // 需要传入 uid 参数
            try {
                console.log('传入的 user1:', user1);
                console.log('传入的 user2:', user2);
                const find = await userHistoryModel.findOne({
                    'user1.user1_uid': user2.user_uid,
                    'user2.user2_uid': user1.user_uid
                },{},{})
                console.log('是否寻找到',find)
                if (find) {
                    const updatedUser = await userHistoryModel.findOneAndUpdate(
                        {
                            'user1.user1_uid': user2.user_uid,
                            'user2.user2_uid': user1.user_uid
                        },
                        {
                            user1:{
                                user1_uid: user2.user_uid,
                                user1_name: user2.user_name,
                                user1_headshot: user2.user_headshot
                            },
                            user2:{
                                user2_uid: user1.user_uid,
                                user2_name: user1.user_name,
                                user2_headshot: user1.user_headshot
                            },
                            $push: { user_history: history }
                        },
                        { new: true, upsert: true }
                    );
                    if (updatedUser) {
                        console.log('创建/更新用户历史成功1:', updatedUser);
                        return updatedUser;
                    }
                } else {
                    const updatedUser = await userHistoryModel.findOneAndUpdate(
                        {
                            'user1.user1_uid': user1.user_uid,
                            'user2.user2_uid': user2.user_uid
                        },
                        {
                            user1:{
                                user1_uid: user1.user_uid,
                                user1_name: user1.user_name,
                                user1_headshot: user1.user_headshot
                            },
                            user2:{
                                user2_uid: user2.user_uid,
                                user2_name: user2.user_name,
                                user2_headshot: user2.user_headshot
                            },
                            $push: { user_history: history }
                        },
                        { new: true, upsert: true }
                    ); 
                    if (updatedUser) {
                        console.log('创建/更新用户历史成功1:', updatedUser);
                        return updatedUser;
                    }
                }
            } catch (error) {
                console.error('创建/更新用户历史发生错误:', error);
                throw error;
            }
        }
    //通过uid查找用户历史
    async searchUserHistoryUid(user_uid, user_to_uid) {
        const userHistory = await userHistoryModel.findOne({
            'user1.user1_uid': user_uid,
            'user2.user2_uid': user_to_uid
        }, {}, {})
        if (userHistory) {
            console.log('执行uid查询历史', userHistory)
            return userHistory;
        } else {
            const userHistory = await userHistoryModel.findOne({
                'user1.user1_uid':  user_to_uid,
                'user2.user2_uid': user_uid
            }, {}, {})
            console.log('执行uid查询历史', userHistory)
            return userHistory;
        }
    }
    //通过history删除用户
    async updateUserHistory( id, uid ) {
        const result = await userHistoryModel.findOneAndUpdate(
            { user_uid: uid }, // 查找条件：uid 匹配
            { $pull: { history: { id: id } } },// 更新操作：从 history 数组中移除 id 匹配的元素
            { new: true }
        );
        if (!result) {
            throw Error = '未查询到用户历史';
        } else {
            return result;
        }
    }
}
module.exports =new UserHistoryService;