import { ref } from 'vue'

// 当前播放状态
export const currentPlayingAudio = ref({
  index: -1,
  isPlaying: false,
  duration: 0,
  remaining: 0
})
// 存储所有音频的时长
export const audioDurations = ref({})
// 获取所有音频元素的引用
export const audioElements = ref([])

// 播放/暂停音频
export const toggleAudio = (index) => {
  const audio = audioElements.value[index]

  // 如果点击的是当前正在播放的音频
  if (currentPlayingAudio.value.index === index && currentPlayingAudio.value.isPlaying) {
    audio.pause()
    currentPlayingAudio.value.isPlaying = false
    return
  }

  // 停止当前播放的音频
  if (currentPlayingAudio.value.index !== -1) {
    const prevAudio = audioElements.value[currentPlayingAudio.value.index]
    prevAudio.pause()
    prevAudio.currentTime = 0
  }

  // 播放新音频
  audio.play()
  currentPlayingAudio.value = {
    index,
    isPlaying: true,
    duration: audioDurations.value[index] || 0,
    remaining: audioDurations.value[index] || 0
  }

  // 更新时间显示
  audio.ontimeupdate = () => {
    if (audio.duration) {
      currentPlayingAudio.value.remaining = Math.ceil(audio.duration - audio.currentTime)
    }
  }

  // 音频结束处理
  audio.onended = () => {
    currentPlayingAudio.value = {
      index: -1,
      isPlaying: false,
      duration: 0,
      remaining: 0
    }
  }
}
// 处理音频可以播放时的回调
export const audioCanplay = async (e, index) => {
  const audio = e.target

  // 解决Safari等浏览器duration返回Infinity的问题
  while (audio.duration === Infinity) {
    await new Promise((r) => setTimeout(r, 200))
    audio.currentTime = 10000000 * Math.random()
  }

  // 存储音频时长
  audioDurations.value[index] = Math.ceil(audio.duration)

  // 如果是当前播放的音频，更新显示
  if (currentPlayingAudio.value.index === index) {
    currentPlayingAudio.value.duration = audioDurations.value[index]
    currentPlayingAudio.value.remaining = audioDurations.value[index]
  }
}
