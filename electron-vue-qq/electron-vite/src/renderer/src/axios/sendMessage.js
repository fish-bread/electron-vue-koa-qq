import {
  selectedUserUid,
  user,
  user_friend,
  user_friend_history_one,
  user_token
} from '../function/user'
import { creatAxios } from './index'
export let ws = null
let isConnecting = false
//启动ws
export const initWebSocket = () => {
  if (ws) return // 如果已经存在 WebSocket 实例，则不再创建

  ws = new WebSocket('ws://localhost:3001')

  ws.onopen = () => {
    console.log('WebSocket 连接已打开')
    isConnecting = true
  }

  ws.onmessage = (event) => {
    const messageData = JSON.parse(event.data)
    console.log('收到服务器消息:', messageData)

    // 如果消息是发送给当前选中的用户，则更新 user_friend_history_one
    if (messageData.user_to_uid === selectedUserUid.value) {
      const newMessage = {
        user_take: messageData.user_uid === user.value.user_uid ? messageData.user_message : null,
        friend_user_take:
          messageData.user_uid !== user.value.user_uid ? messageData.user_message : null,
        timestamp: messageData.timestamp
      }

      // 更新 user_friend_history_one
      if (!user_friend_history_one.value.user_history) {
        user_friend_history_one.value.user_history = []
      }
      //添加用户
      const friendUser = user_friend.value.find(
        (friendUser) => friendUser.user_friend_uid === selectedUserUid.value
      )
      user_friend_history_one.value.user = {
        user_uid: user.value.user_uid,
        user_name: user.value.user_name,
        user_headshot: user.value.user_headshot
      }
      user_friend_history_one.value.user_friend = {
        user_friend_uid: friendUser.user_friend_uid,
        user_friend_name: friendUser.user_friend_name,
        user_friend_headshot: friendUser.user_friend_headshot
      }
      user_friend_history_one.value.user_history.push(newMessage)
      console.log('webStock单个历史1', user_friend_history_one.value.user_history)
    } else if (messageData.user_uid === selectedUserUid.value) {
      const newMessage = {
        user_take:
          messageData.user_uid === user.value.user_to_uid ? messageData.user_message : null,
        friend_user_take:
          messageData.user_uid !== user.value.user_to_uid ? messageData.user_message : null,
        timestamp: messageData.timestamp
      }

      // 更新 user_friend_history_one
      if (!user_friend_history_one.value.user_history) {
        user_friend_history_one.value.user_history = []
      }
      user_friend_history_one.value.user_history.push(newMessage)
      console.log('webStock单个历史2', user_friend_history_one.value.user_history)
    }
  }

  ws.onclose = () => {
    console.log('WebSocket 连接已关闭')
    isConnecting = false
    // 尝试重连
    setTimeout(() => {
      initWebSocket()
    }, 5000) // 5秒后重连
  }

  ws.onerror = (error) => {
    console.error('WebSocket 错误:', error)
    isConnecting = false
  }
}
//发送消息
export const sendMessage = (message) => {
  if (!ws || !isConnecting) {
    console.error('WebSocket 未连接')
    return
  }
  console.log('用户uid', user.value.user_uid)
  console.log('发送uid', selectedUserUid.value)
  const messageData = {
    user_uid: user.value.user_uid,
    user_to_uid: selectedUserUid.value,
    user_message: message,
    user_token: user_token.value,
    Heartbeat: false
  }
  console.log('发送的json', messageData)
  ws.send(JSON.stringify(messageData))
}
//接收消息
export const userSearchHistory = async () => {
  user_friend_history_one.value = {
    user: {
      user_uid: '',
      user_name: '',
      user_headshot: ''
    },
    user_friend: {
      user_friend_uid: '',
      user_friend_name: '',
      user_friend_headshot: ''
    },
    user_history: ''
  }
  await creatAxios({
    method: 'POST',
    url: '/user_search_message',
    data: {
      user_uid: user.value.user_uid,
      user_to_uid: selectedUserUid.value
    }
  })
    .then((res) => {
      console.log(res.data.message)
      console.log('单个用户历史信息', res.data.user_history)
      if (res.data.user_history.user1.user1_uid === user.value.user_uid) {
        // 将后端返回的数据转换为前端所需的格式
        // 将格式化后的历史信息存储到 user_friend_history 中
        user_friend_history_one.value = {
          user: {
            user_uid: res.data.user_history.user1.user1_uid,
            user_name: res.data.user_history.user1.user1_name,
            user_headshot: res.data.user_history.user1.user1_headshot
          },
          user_friend: {
            user_friend_uid: res.data.user_history.user2.user2_uid,
            user_friend_name: res.data.user_history.user2.user2_name,
            user_friend_headshot: res.data.user_history.user2.user2_headshot
          },
          user_history: res.data.user_history.user_history.map((message) => ({
            user_take: message.sender_uid === user.value.user_uid ? message.message : null,
            friend_user_take: message.sender_uid === selectedUserUid.value ? message.message : null,
            timestamp: message.timestamp
          }))
        }
        console.log('存储历史信息1', user_friend_history_one.value)
      } else if (res.data.user_history.user2.user2_uid === user.value.user_uid) {
        // 将后端返回的数据转换为前端所需的格式
        // 将格式化后的历史信息存储到 user_friend_history 中
        user_friend_history_one.value = {
          user: {
            user_uid: res.data.user_history.user2.user2_uid,
            user_name: res.data.user_history.user2.user2_name,
            user_headshot: res.data.user_history.user2.user2_headshot
          },
          user_friend: {
            user_friend_uid: res.data.user_history.user1.user1_uid,
            user_friend_name: res.data.user_history.user1.user1_name,
            user_friend_headshot: res.data.user_history.user1.user1_headshot
          },
          user_history: res.data.user_history.user_history.map((message) => ({
            user_take: message.sender_uid === user.value.user_uid ? message.message : null,
            friend_user_take: message.sender_uid === selectedUserUid.value ? message.message : null,
            timestamp: message.timestamp
          }))
        }
        console.log('存储历史信息2', user_friend_history_one.value)
      }
    })
    .catch((err) => {
      console.log(err)
    })
}
// 心跳定时器 ID
export let heartbeatIntervalId = null

export const wsHeartbeat = () => {
  /*
  // 每隔5秒发送一次心跳请求
  heartbeatIntervalId = setInterval(() => {
    if (!ws || !isConnecting) {
      console.error('WebSocket 未连接')
      return
    }
    if (ws.readyState === WebSocket.OPEN) {
      console.log('发送心跳请求')
      ws.send(
        JSON.stringify({
          Heartbeat: true,
          user_token: user_token.value
        })
      )
    }
  }, 5000)

   */
}
