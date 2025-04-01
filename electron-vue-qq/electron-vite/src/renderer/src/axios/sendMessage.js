import {
  selectedUserUid,
  user,
  user_friend,
  user_friend_history_one,
  user_token
} from '../function/user'
import { creatAxios, fileAxios } from './index'
import { audioBlob, statusMessage } from '../components/chat/chataudio'
import { selectedImages, statusMessageImage } from '../components/chat/chatImage'
import { selectedFiles, statusMessageFile } from '../components/chat/chatFile'
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
        fileType: messageData.fileType,
        fileSize: messageData.fileSize,
        timestamp: messageData.timestamp
      }
      console.log('消息类型', newMessage.fileType)
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
        fileSize: messageData.fileSize,
        fileType: messageData.fileType,
        timestamp: messageData.timestamp
      }
      console.log('消息类型', newMessage.fileType)
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
            fileSize: message.fileSize,
            fileType: message.fileType,
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
            fileSize: message.fileSize,
            fileType: message.fileType,
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
//心跳函数
export const wsHeartbeat = () => {
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
}
//音频函数
export const sendAudioWs = async () => {
  if (!audioBlob.value) return
  statusMessage.value = '正在发送音频...'
  // 创建FormData对象
  const formData = new FormData()
  formData.append('audio', audioBlob.value, `recording-${Date.now()}.mp3`)
  formData.append('user_uid', user.value.user_uid)
  formData.append('user_to_uid', selectedUserUid.value)
  await fileAxios({
    method: 'POST',
    url: '/user_chat_audio',
    data: formData
  })
    .then((res) => {
      console.log(res.data.message)
      statusMessage.value = '音频发送成功'
    })
    .catch((err) => {
      console.log(err)
      statusMessage.value = '音频发送失败:'
    })
}
//图片函数
export const send_image = async () => {
  if (!selectedImages.value || selectedImages.value.length === 0) return
  statusMessageImage.value = '正在发送图片...'
  // 创建FormData对象
  const formData = new FormData()
  // 添加所有图片到 FormData
  selectedImages.value.forEach((image) => {
    formData.append(`images`, image) // 使用数组形式上传多个文件
  })
  formData.append('user_uid', user.value.user_uid)
  formData.append('user_to_uid', selectedUserUid.value)
  await fileAxios({
    method: 'POST',
    url: '/user_chat_image',
    data: formData
  })
    .then((res) => {
      statusMessageImage.value = '图片发送成功'
      selectedImages.value = []
      console.log(res.data.message)
    })
    .catch((err) => {
      console.log('图片发送失败:', err)
      statusMessageImage.value = '图片发送失败'
    })
}
//文件函数
export const send_file = async () => {
  if (!selectedFiles.value || selectedFiles.value.length === 0) return
  statusMessageFile.value = '正在发送文件...'
  const formData = new FormData()
  // 添加所有文件到 FormData
  selectedFiles.value.forEach((fileData) => {
    formData.append(`files`, fileData.file) // 使用数组形式上传多个文件
  })
  formData.append('user_uid', user.value.user_uid)
  formData.append('user_to_uid', selectedUserUid.value)
  await fileAxios({
    method: 'POST',
    url: '/user_chat_file',
    data: formData
  })
    .then((res) => {
      statusMessageFile.value = '文件发送成功'
      selectedFiles.value = []
      console.log(res.data.message)
    })
    .catch((err) => {
      console.log('图片发送失败:', err)
      statusMessageFile.value = '文件发送失败'
    })
}
//获取名字
export const file_name = (url) => {
  // 1. 提取文件名（最后一个 '/' 后的内容）
  const fileName = url.split('/').pop() // "file_v.f100830_1743151848552.mp3"

  // 2. 去掉 'file_' 前缀
  const withoutPrefix = fileName.replace('file_', '') // "v.f100830_1743151848552.mp3"

  // 3. 分割并提取关键部分
  const parts = withoutPrefix.split('_') // ["v.f100830", "1743151848552.mp3"]
  const prefix = parts[0] // "v.f100830"
  const suffix = parts[1].split('.')[1] // "mp3"（从 "1743151848552.mp3" 提取）

  const desiredName = `${prefix}.${suffix}`
  console.log(desiredName) // 输出: v.f100830.mp3
  return desiredName
}
