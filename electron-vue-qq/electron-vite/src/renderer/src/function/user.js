import { ref } from 'vue'
import { add_user_axios } from '../axios/search'
import { sendMessage } from '../axios/sendMessage'
//默认用户
export const user = ref({
  /*
  //名字
  user_name: '',
  //uid
  user_uid: 'number',
  //邮箱
  user_email: '',
  //头像
  user_headshot: '',
  //等级
  user_level: '',
  //点赞
  user_thumbs_up: '',
  //个签
  user_personal_signature: '',
  //性别
  user_gender: '',
  //生日
  user_birthday: '',
  //国家
  user_country: '',
  //地区
  user_region: '',
  //朋友列表
  user_friend_uid: []
  */
})
//用户token
export const user_token = ref('')
//用户朋友列表
export const user_friend = ref([
  /*{
    //名字
    user_friend_name: '',
    //uid
    user_friend_uid: '',
    //头像
    user_friend_headshot: ''
    //等级
    user_friend_level: '',
    //点赞
    user_friend_thumbs_up: '',
    //个签
    user_friend_personal_signature: '',
   //性别
   user_friend_gender: '',
   //生日
   user_friend_birthday: '',
   //国家
   user_friend_country: '',
   //地区
   user_friend_region: '',
  }*/
])
//用户资料
export const user_profile = ref({
  user_headshot: '',
  user_name: '',
  user_personal_signature: '',
  user_gender: '',
  user_birthday: '',
  user_country: '',
  user_region: ''
})
//未知用户
export const search_user = ref([
  /*
      search_user_name: '',
      search_user_uid: '',
      search_user_headshot: ''
    */
])
//已知用户
export const search_user_friend = ref([])
//用户全部历史
export const user_friend_history = ref([
  /*{
    user: {
      user_uid: '',
      user_headshot: '',
      user_name: ''
    },
    user_friend: {
      user_friend_uid: '',
      user_friend_headshot: '',
      user_friend_name: ''
    },
    user_history: []
  }*/
])
//用户单个历史
export const user_friend_history_one = ref()
//搜索用户
export const user_search = ref('')
//搜索未知用户
export const user_none_search = ref('')
//选定的uid用户
export const selectedUserUid = ref(null)
//用户将要发送的消息
export const user_send_message = ref('')
//函数
//选中用户uid
export const selectedUser = (user_uid) => {
  selectedUserUid.value = user_uid
  console.log(selectedUserUid.value)
}
//初始化user
export const initialize_user = async () => {
  //用户渲染
  user.value = await window.api.searchUser()
  user_token.value = await window.api.searchToken()
  console.log('用户', user.value)
  console.log('渲染token', user_token.value)
}
//清空input
export const clearInput = () => {
  user_search.value = ''
  console.log('执行')
}
//搜索用户
export const openSearch = async () => {
  await window.api.openSearchWindow()
}
//添加用户
export const add_user = async (uid) => {
  console.log(uid)
  await add_user_axios(uid)
}
//发送消息
export const send_message = async (message) => {
  if (message.trim() === '') return // 防止发送空消息
  console.log('消息', message)
  await sendMessage(message)

  user_send_message.value = '' // 清空 textarea
}
