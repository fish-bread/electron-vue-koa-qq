import { ref } from 'vue'
import { add_user_axios } from '../axios/search'
import { sendMessage } from '../axios/sendMessage'

export const user = ref({
  /*user_name: '',
  user_uid: 'number',
  user_email: '',
  user_phone: '',
  user_headshot: '',
  user_friend_uid: []
  */
})
export const user_token = ref('')
export const user_friend = ref([
  /*{
    user_friend_name: '',
    user_friend_uid: '',
    user_friend_final_history: '',
    user_friend_headshot: ''
  }*/
])
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
// 添加 user_friend_final_history 属性
user_friend.value.forEach((friend) => {
  const history = user_friend_history.value.find(
    (h) => h.user_friend.user_friend_uid === friend.user_friend_uid
  )
  if (history && history.user_history.length > 0) {
    const lastMessage = history.user_history[history.user_history.length - 1]
    // 提取消息内容
    if (lastMessage.user_take) {
      friend.user_friend_final_history =
        `${history.user.user_name}` + ':' + ` ${lastMessage.user_take}` // 用户发送的消息
    } else if (lastMessage.friend_user_take) {
      friend.user_friend_final_history =
        `${history.user_friend.user_friend_name}` + ':' + `${lastMessage.friend_user_take}` // 好友发送的消息
    }
  } else {
    friend.user_friend_final_history = null // 如果没有历史记录，设置为 null
  }
  console.log('friend.user_friend_final_history', friend.user_friend_final_history)
})
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
