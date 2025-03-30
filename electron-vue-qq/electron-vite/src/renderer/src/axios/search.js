import { user_none_search, user, user_friend, search_user, initialize_user } from '../function/user'
import { creatAxios } from './index'
//搜索不知道的用户
export const searchNoneUserAxios = async () => {
  search_user.value = []
  await creatAxios({
    method: 'post',
    url: '/user_none_search',
    data: {
      user_none_search_uid: user_none_search.value
    }
  })
    .then((res) => {
      console.log('返回用户', res.data.user)
      search_user.value.push(res.data.user)
      console.log('用和', search_user.value)
    })
    .catch((err) => {
      console.log(err)
    })
}
//添加用户为好友
export const add_user_axios = async (add_uid) => {
  await creatAxios({
    method: 'post',
    url: '/user_add_uid',
    data: {
      add_uid: add_uid,
      user_uid: user.value.user_uid
    }
  })
    .then(async (res) => {
      console.log(res.data.message)
      console.log('更新用户', res.data.user)
      if (res.data.message === '好友添加成功') {
        await window.api.localUser(res.data.user)
        // 添加好友成功后，重新获取用户信息
        await initialize_user()
        //发送到home窗体
        await window.api.sendWindow()
      }
    })
    .catch((err) => {
      console.log(err)
    })
}
//搜索知道的好友
export const searchUserAxios = async () => {
  console.log('测试搜索')
}
//请求用户朋友列表
export const searchUserFriendAxios = async () => {
  await creatAxios({
    method: 'post',
    url: '/user_friend',
    data: {
      user_uid: user.value.user_friend_uid
    }
  })
    .then(async (res) => {
      // 使用数组替换的方式触发响应式更新
      user_friend.value = [...res.data.user_friend]
      console.log('更新后的好友列表:', user_friend.value)
    })
    .catch((err) => {
      console.log(err)
    })
}
