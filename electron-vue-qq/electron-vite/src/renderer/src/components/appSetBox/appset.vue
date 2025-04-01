<script setup>
import { onMounted, ref } from 'vue'

const downloadsPath = ref()
// 获取当前下载路径
const getCurrentDownloadsPath = async () => {
  try {
    downloadsPath.value = await window.api.getDownloadsPath()
  } catch (error) {
    console.error('获取下载路径失败:', error)
  }
}

// 更改下载路径
const changeDownloadPath = async () => {
  try {
    const newPath = await window.api.openDirectoryDialog()
    if (newPath) {
      const result = await window.api.setDownloadsPath(newPath)
      if (result.success) {
        downloadsPath.value = newPath
      }
    }
  } catch (error) {
    console.error('更改下载路径失败:', error)
  }
}

// 组件挂载时获取路径
onMounted(() => {
  getCurrentDownloadsPath()
})
const clearImage = async () => {
  await window.api.clearImageCache()
}
</script>

<template>
  <div class="set-box">
    <div class="set-box-filePath">
      <div style="font-size: 14px">保存位置</div>
      <div class="set-box-filePath-box">
        <div class="set-box-filePath-box-in">
          <div class="set-box-filePath-box-in-left">
            <div class="title">将接收的文件保存到</div>
            <div class="download-path" :title="downloadsPath">{{ downloadsPath }}</div>
          </div>
          <button class="download-button" style="font-size: 11px" @click="changeDownloadPath">
            更改存储路径
          </button>
        </div>
        <div class="set-box-filePath-box-in">
          <div class="set-box-filePath-box-in-left">
            <div class="title">将接收的聊天文件保存到</div>
            <div>path</div>
          </div>
          <button class="download-button" style="font-size: 11px">更改存储路径</button>
        </div>
      </div>
    </div>
    <!--图片缓存位置-->
    <div class="set-box-filePath-2">
      <div style="font-size: 14px">图片缓存位置</div>
      <button @click="clearImage">清除图片缓存</button>
    </div>
  </div>
</template>

<style scoped>
.set-box {
  -webkit-user-select: none;
  box-sizing: border-box;
  padding: 0 15px 0 15px;
  background-color: #f2f2f2;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  gap: 20px;
}
.set-box-filePath {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 150px;
  gap: 10px;
}
.set-box-filePath-2 {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 150px;
  gap: 10px;
  align-items: flex-start;
}
.set-box-filePath-box {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  border-radius: 5px;
  box-sizing: border-box;
  padding: 0 5px 0 5px;
}
.set-box-filePath-box-in {
  width: 100%;
  height: 50%;
  display: grid;
  grid-template-columns: auto 100px;
  align-items: center;
}
.set-box-filePath-box-in-left {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.title {
  box-sizing: border-box;
  margin-bottom: 10px;
  font-size: 13px;
}
.download-path {
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
}
.download-button {
  all: unset;
  box-sizing: border-box;
  border: 1px #2c2c2c solid;
  border-radius: 5px;
  background-color: #ffffff;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.download-button:hover {
  background-color: #dadada;
}
</style>
