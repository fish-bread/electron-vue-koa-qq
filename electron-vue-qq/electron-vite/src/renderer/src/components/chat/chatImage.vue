<script setup>
import {
  ischatImage,
  removeImage,
  selectedImages,
  statusMessageImage,
  totalImageSize
} from './chatImage'
import { accent_color } from '../../function/colorPalette'
import { send_image } from '../../axios/sendMessage'
// 引入全局的 URL 对象
const URL = window.URL || window.webkitURL
</script>

<template>
  <div class="image-preview-container">
    <button @click="ischatImage = false">返回</button>
    <div class="image-preview-scroll">
      <div v-for="(image, index) in selectedImages" :key="index" class="image-preview-item">
        <img :src="URL.createObjectURL(image)" alt="预览图片" class="preview-image" />
        <button class="remove-image-button" @click="removeImage(index)">×</button>
      </div>
    </div>
    <div class="size-info">
      已选择 {{ selectedImages.length }} 张图片，总大小:
      {{ (totalImageSize / 1024 / 1024).toFixed(2) }}MB
      <span v-if="selectedImages.length >= 9" class="limit-message"> (已达到最大数量限制) </span>
      <span>{{ statusMessageImage }}</span>
      <button
        class="home-chat-local-input-out-put"
        :style="{ backgroundColor: accent_color }"
        @click="send_image"
      >
        <div style="-webkit-user-select: none; -webkit-user-drag: none">发送</div>
      </button>
    </div>
  </div>
</template>

<style scoped>
.home-chat-local-input-out-put {
  all: unset;
  margin-right: 20px;
  width: 95px;
  height: 26px;
  background-color: #0099ff;
  overflow: hidden;
  border-radius: 3px;
  line-height: 22px;
  text-align: center;
  font-size: 15px;
  color: #fff;
  position: absolute;
  z-index: 6;
  top: -3px;
  left: 540px;
}
.home-chat-local-input-out-put:hover {
  background-color: #0093f5;
}
button {
  margin-bottom: 3px;
  padding: 8px 16px;
  background-color: v-bind(accent_color);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}
.image-preview-container {
  position: relative;
  padding: 10px;
  border-top: 1px solid #c0c0c0;
  height: 100%;
  overflow: auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  box-sizing: border-box;
}

.image-preview-scroll {
  display: flex;
  gap: 10px;
  overflow-x: auto;
  padding-bottom: 10px;
  width: 100%;
  flex-wrap: wrap;
}
.image-preview-scroll::-webkit-scrollbar {
  display: none;
}
.image-preview-item {
  position: relative;
  width: 100px;
  height: 100px;
  flex-shrink: 0;
}

.preview-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 4px;
}

.remove-image-button {
  all: unset;
  position: absolute;
  top: 5px;
  right: 5px;
  width: 20px;
  height: 20px;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  display: grid;
  align-items: center;
  justify-content: center;
}

.size-info {
  position: relative;
  font-size: 12px;
  color: #666;
  margin-top: 5px;
  text-align: right;
}
</style>
