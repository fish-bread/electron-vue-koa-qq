<template>
  <div class="audio-recorder">
    <button @click="returnTextarea">返回</button>
    <button :disabled="isRecording" @click="startRecording">开始录音</button>
    <button :disabled="!isRecording" @click="stopRecording">停止录音</button>
    <button :disabled="!audioBlob" @click="downloadAudio">下载录音</button>
    <button :disabled="!audioBlob" @click="sendAudioWs">发送录音</button>
    <p v-if="statusMessage">{{ statusMessage }}</p>
    <p>录制时长: {{ formatTime(recordingTime) }} / 60秒</p>
    <div v-if="isRecording" class="progress-bar">
      <div class="progress" :style="{ width: `${(recordingTime / 60) * 100}%` }"></div>
    </div>
  </div>
</template>

<script setup>
import { accent_color, chat_bubbles } from '../../function/colorPalette'
import { onBeforeUnmount } from 'vue'
import { sendAudioWs } from '../../axios/sendMessage'
import {
  audioBlob,
  clearTimers,
  downloadAudio,
  formatTime,
  ischatAudio,
  isRecording,
  recordingTime,
  startRecording,
  statusMessage,
  stopRecording
} from './chataudio'
const returnTextarea = () => {
  ischatAudio.value = false
}
// 组件卸载前停止录音
onBeforeUnmount(() => {
  if (isRecording.value) {
    stopRecording()
  }
  clearTimers()
})
</script>

<style scoped>
.audio-recorder {
  -webkit-user-select: none;
  padding: 20px;
  border-top: 1px solid #c0c0c0;
  border-radius: 5px;
  max-width: 400px;
}

button {
  margin-right: 10px;
  margin-bottom: 10px;
  padding: 8px 16px;
  background-color: v-bind(accent_color);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover:not(:disabled) {
  background-color: v-bind(chat_bubbles);
}

button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

p {
  margin: 10px 0;
  color: #666;
}

.progress-bar {
  margin-top: 10px;
  height: 6px;
  background-color: #eee;
  border-radius: 3px;
  overflow: hidden;
}

.progress {
  height: 100%;
  background-color: #42b983;
  transition: width 1s linear;
}
</style>
