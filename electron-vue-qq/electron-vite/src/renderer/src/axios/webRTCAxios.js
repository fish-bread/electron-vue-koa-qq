import { selectedUserUid, user, user_token } from '../function/user'
import { ref } from 'vue'

export const ws = ref(null)
const messages = ref([])
export const localVideo = ref(null)
export const remoteVideo = ref(null)

// WebRTC 配置
const configuration = {
  iceServers: [
    { urls: 'stun:stun.l.google.com:19302' } // 使用 Google 的公共 STUN 服务器
  ]
}

// RTCPeerConnection 实例
export const peerConnection = ref(null)

// 初始化 WebRTC
export const initializeWebRTC = async () => {
  try {
    // 获取本地媒体流（摄像头和麦克风）
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
    localVideo.value.srcObject = stream

    // 创建 RTCPeerConnection
    peerConnection.value = new RTCPeerConnection(configuration)

    // 将本地媒体流添加到 peerConnection
    stream.getTracks().forEach((track) => {
      peerConnection.value.addTrack(track, stream)
    })

    // 监听远程媒体流
    peerConnection.value.ontrack = (event) => {
      remoteVideo.value.srcObject = event.streams[0]
    }

    // 监听 ICE 候选者
    peerConnection.value.onicecandidate = (event) => {
      if (event.candidate) {
        // 发送 ICE 候选者到对方
        sendMessage({
          type: 'candidate',
          candidate: event.candidate,
          user_token: user_token.value
        })
      }
    }
  } catch (error) {
    console.error('Error initializing WebRTC:', error)
  }
}

// 连接 WebSocket
export const connectWebSocket = () => {
  ws.value = new WebSocket('ws://localhost:3001')

  ws.value.onopen = () => {
    console.log('WebSocket 连接成功')
    ws.value.isConnected = true
  }

  ws.value.onmessage = async (event) => {
    const message = JSON.parse(event.data)
    messages.value.push(message)
    console.log('收到消息:', message)

    // 处理 WebRTC 消息
    if (message.type === 'offer' || message.type === 'answer' || message.type === 'candidate') {
      await handleWebRTCMessage(message)
    }
  }

  ws.value.onclose = () => {
    console.log('WebSocket 连接关闭')
  }

  ws.value.onerror = (error) => {
    console.error('WebSocket 错误:', error)
  }
}

// 发送消息
export const sendMessage = (message) => {
  if (ws.value && ws.value.readyState === WebSocket.OPEN && ws.value.isConnected) {
    ws.value.send(JSON.stringify(message))
    console.log('发送消息:', message)
  } else {
    console.error('WebSocket 未连接')
  }
}

// 处理 WebRTC 消息
const handleWebRTCMessage = async (message) => {
  switch (message.type) {
    case 'offer':
      await handleOffer(message)
      break
    case 'answer':
      await handleAnswer(message)
      break
    case 'candidate':
      await handleCandidate(message)
      break
    default:
      console.warn('未知的消息类型:', message.type)
  }
}

// 处理 offer
const handleOffer = async (offer) => {
  await peerConnection.value.setRemoteDescription(new RTCSessionDescription(offer))
  console.log('Received Offer SDP:', offer.sdp) // 打印接收到的 SDP
  // 创建 answer
  const answer = await peerConnection.value.createAnswer()
  console.log('Generated Answer SDP:', answer.sdp) // 打印生成的 Answer SDP
  await peerConnection.value.setLocalDescription(answer)

  // 发送 answer 到对方
  sendMessage({
    type: 'answer',
    answer: answer,
    targetUid: selectedUserUid.value,
    user_token: user_token.value
  })
}

// 处理 answer
const handleAnswer = async (answer) => {
  try {
    console.log('Received Answer SDP:', answer.sdp) // 打印接收到的 Answer SDP
    await peerConnection.value.setRemoteDescription(new RTCSessionDescription(answer))
  } catch (error) {
    console.error('Error handling answer:', error)
  }
}

// 处理 candidate
const handleCandidate = async (candidate) => {
  await peerConnection.value.addIceCandidate(new RTCIceCandidate(candidate))
}
// 主动创建并发送 offer
export const createAndSendOffer = async (targetUid) => {
  try {
    if (!peerConnection.value) {
      console.error('PeerConnection 未初始化')
      return
    }

    // 创建 offer
    const offer = await peerConnection.value.createOffer()
    console.log('Generated Offer SDP:', offer.sdp) // 打印 SDP
    await peerConnection.value.setLocalDescription(offer)

    // 通过 WebSocket 发送 offer
    sendMessage({
      type: 'offer',
      offer: offer,
      targetUid: targetUid, // 目标用户的 UID
      userUid: user.value.user_uid, // 用户uid
      user_token: user_token.value
    })

    console.log('Offer 创建并发送成功:', offer)
  } catch (error) {
    console.error('创建或发送 offer 失败:', error)
  }
}
