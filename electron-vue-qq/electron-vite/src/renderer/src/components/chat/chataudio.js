import { ref } from 'vue'

export const localInput = ref()
export const chatAudiofonc = () => {
  ischatAudio.value = true
}
export const ischatAudio = ref(false)
//音频
export const isRecording = ref(false)
export const audioBlob = ref(null)
export const mediaRecorder = ref(null)
export const audioChunks = ref([])
export const statusMessage = ref('')
export const recordingTime = ref(0)
export const MAX_RECORDING_TIME = 60 // 最大录制时间60秒
export let timer = null
export let recordingTimeout = null

export const startRecording = async () => {
  try {
    statusMessage.value = '正在请求麦克风权限...'

    // 请求麦克风权限并获取音频流
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        sampleRate: 44100
      }
    })

    // 创建 MediaRecorder 实例
    mediaRecorder.value = new MediaRecorder(stream)

    // 重置数据
    audioChunks.value = []
    recordingTime.value = 0

    // 开始计时
    timer = setInterval(() => {
      recordingTime.value += 1
    }, 1000)

    // 设置60秒后自动停止
    recordingTimeout = setTimeout(() => {
      if (isRecording.value) {
        statusMessage.value = '已达到最大录制时间'
        stopRecording()
      }
    }, MAX_RECORDING_TIME * 1000)

    // 收集数据块
    mediaRecorder.value.ondataavailable = (event) => {
      if (event.data.size > 0) {
        audioChunks.value.push(event.data)
      }
    }

    // 录音结束时处理
    mediaRecorder.value.onstop = () => {
      // 创建 Blob 对象 (WAV格式)
      audioBlob.value = new Blob(audioChunks.value, { type: 'audio/mp3' })
      statusMessage.value = '录音已准备好下载'

      // 清除计时器
      clearInterval(timer)
      clearTimeout(recordingTimeout)
      timer = null
      recordingTimeout = null

      // 关闭音频流
      stream.getTracks().forEach((track) => track.stop())
    }

    // 开始录制，每100ms收集一次数据
    mediaRecorder.value.start(100)
    isRecording.value = true
    statusMessage.value = '正在录音...'
  } catch (error) {
    console.error('录音错误:', error)
    statusMessage.value = `录音失败: ${error.message}`
    isRecording.value = false
    clearTimers()
  }
}

export const stopRecording = () => {
  if (mediaRecorder.value && isRecording.value) {
    mediaRecorder.value.stop()
    isRecording.value = false
    statusMessage.value = '录音已停止'
    clearTimers()
  }
}

export const downloadAudio = () => {
  if (!audioBlob.value) return

  // 创建下载链接
  const url = URL.createObjectURL(audioBlob.value)
  const a = document.createElement('a')
  a.style.display = 'none'
  a.href = url
  a.download = `recording-${new Date().toISOString().replace(/[:.]/g, '-')}.wav`
  document.body.appendChild(a)
  a.click()

  // 清理
  setTimeout(() => {
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }, 100)
}

export const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60)
    .toString()
    .padStart(2, '0')
  const secs = (seconds % 60).toString().padStart(2, '0')
  return `${mins}:${secs}`
}

export const clearTimers = () => {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
  if (recordingTimeout) {
    clearTimeout(recordingTimeout)
    recordingTimeout = null
  }
}
