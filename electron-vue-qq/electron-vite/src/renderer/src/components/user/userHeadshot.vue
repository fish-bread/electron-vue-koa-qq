<!--suppress HtmlDeprecatedAttribute, HtmlUnknownAttribute -->
<script setup>
import {
  isUserHeadshot,
  user_headshot,
  option,
  previews,
  cropper
} from '../../function/UserProfile'
import { previewImageUrl } from '../../axios/user'
import 'vue-cropper/dist/index.css'
import { VueCropper } from 'vue-cropper'
import { onMounted, ref } from 'vue'

onMounted(() => {
  option.value.img = previewImageUrl.value
})
const changeScale = (scaleSize) => {
  cropper.value.changeScale(scaleSize)
  console.log('changeScale', scaleSize)
  lastScaleValue.value = scaleValue.value // 更新上一次的滑块值
}
const scaleValue = ref(0) // 滑块的默认值，初始为 0
const lastScaleValue = ref(0) // 记录上一次的滑块值
const handleScaleChange = (event) => {
  const newScale = parseFloat(event.target.value)
  if (newScale > lastScaleValue.value) {
    // 向右拖动，放大
    cropper.value.changeScale(1)
  } else if (newScale < lastScaleValue.value) {
    // 向左拖动，缩小
    cropper.value.changeScale(-1)
  }
  lastScaleValue.value = newScale // 更新上一次的滑块值
}
// 实时预览
const realTime = (data) => {
  // console.log('realTime data =', data)
  previews.value = data
}
</script>

<template>
  <div class="user-headshot">
    <div class="user-headshot-box">
      <!--头部-->
      <div class="user-headshot-box-top">
        <!--标题-->
        <div class="user-headshot-box-top-text">裁剪图片</div>
        <!--取消按钮-->
        <button class="user-headshot-box-top-button" @click="isUserHeadshot = false">
          <svg
            t="1742388636219"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="3405"
            width="200"
            height="200"
          >
            <path
              d="M558.933333 512l320-320c12.8-12.8 12.8-34.133333 0-46.933333s-34.133333-12.8-46.933333 0L512 465.066667 192 149.333333c-12.8-12.8-34.133333-12.8-46.933333 0s-12.8 34.133333 0 46.933334l320 320-320 320c-12.8 12.8-12.8 34.133333 0 46.933333 4.266667 4.266667 12.8 8.533333 21.333333 8.533333s17.066667-4.266667 21.333333-8.533333l320-320 320 320c4.266667 4.266667 12.8 8.533333 21.333334 8.533333s17.066667-4.266667 21.333333-8.533333c12.8-12.8 12.8-34.133333 0-46.933333L558.933333 512z"
              p-id="3406"
            ></path>
          </svg>
        </button>
      </div>
      <!--中间图片-->
      <div class="user-headshot-box-center">
        <!--图片预览-->
        <vue-cropper
          ref="cropper"
          class="crop"
          :auto-crop="option.autoCrop"
          :auto-crop-height="option.autoCropHeight"
          :auto-crop-width="option.autoCropWidth"
          :can-move="option.canMove"
          :can-scale="option.canScale"
          :center-box="option.centerBox"
          :fixed="option.fixed"
          :fixed-box="option.fixedBox"
          :fixed-number="option.fixedNumber"
          :img="option.img"
          :info-true="option.infoTrue"
          :mode="option.mode"
          :origin="option.origin"
          :output-size="option.outputSize"
          :output-type="option.outputType"
          @real-time="realTime"
        ></vue-cropper>
      </div>
      <!--底部组件-->
      <div class="user-headshot-box-bottom">
        <!--放大及缩小图片-->
        <div class="user-headshot-box-bottom-zoom">
          <!--缩小svg-->
          <div class="user-headshot-box-bottom-zoom-svg" @click="changeScale(-1)">
            <svg
              t="1742556065048"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="8702"
              width="200"
              height="200"
            >
              <path
                d="M919.264 905.984l-138.912-138.912C851.808 692.32 896 591.328 896 480c0-229.376-186.624-416-416-416S64 250.624 64 480s186.624 416 416 416c95.008 0 182.432-32.384 252.544-86.208l141.44 141.44a31.904 31.904 0 0 0 45.248 0 32 32 0 0 0 0.032-45.248zM128 480C128 285.92 285.92 128 480 128s352 157.92 352 352-157.92 352-352 352S128 674.08 128 480z"
                p-id="8703"
              ></path>
              <path
                d="M625.792 448H336a32 32 0 0 0 0 64h289.792a32 32 0 1 0 0-64z"
                p-id="8704"
              ></path>
            </svg>
          </div>
          <!--中间进度条-->
          <input v-model="scaleValue" type="range" min="0" max="30" @input="handleScaleChange" />
          <!--放大svg-->
          <div class="user-headshot-box-bottom-zoom-svg" @click="changeScale(1)">
            <svg
              t="1742556044701"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="7701"
              width="200"
              height="200"
            >
              <path
                d="M919.264 905.984l-138.912-138.912C851.808 692.32 896 591.328 896 480c0-229.376-186.624-416-416-416S64 250.624 64 480s186.624 416 416 416c95.008 0 182.432-32.384 252.544-86.208l141.44 141.44a31.904 31.904 0 0 0 45.248 0 32 32 0 0 0 0.032-45.248zM128 480C128 285.92 285.92 128 480 128s352 157.92 352 352-157.92 352-352 352S128 674.08 128 480z"
                p-id="7702"
              ></path>
              <path
                d="M625.792 448H512v-112a32 32 0 0 0-64 0V448h-112a32 32 0 0 0 0 64H448v112a32 32 0 1 0 64 0V512h113.792a32 32 0 1 0 0-64z"
                p-id="7703"
              ></path>
            </svg>
          </div>
        </div>
        <!--确认取消-->
        <div class="user-headshot-box-bottom-button-all">
          <!--确认-->
          <button class="user-headshot-box-bottom-button blue" @click="user_headshot">保存</button>
          <!--取消-->
          <button class="user-headshot-box-bottom-button white" @click="isUserHeadshot = false">
            取消
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.crop {
  width: 100%;
  height: 100%;
}
.user-headshot {
  background-color: rgba(60, 60, 60, 0.57);
  position: absolute;
  z-index: 8;
  width: 100%;
  height: 100%;
  display: grid;
  align-items: center;
  justify-content: center;
}
.user-headshot-box {
  width: 320px;
  height: 453px;
  background-color: #f2f2f2;
  border-radius: 7px;
  display: flex;
  flex-direction: column;
  justify-items: center;
  overflow: hidden;
}
.user-headshot-box-top {
  width: 100%;
  height: 30px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  box-sizing: border-box;
}
.user-headshot-box-top-text {
  box-sizing: border-box;
  margin-left: 135px;
  font-size: 12px;
  line-height: 30px;
  -webkit-user-select: none;
}
.user-headshot-box-top-button {
  all: unset;
  display: grid;
  align-items: center;
  justify-items: center;
  cursor: pointer;
}
.user-headshot-box-top-button .icon {
  width: 18px;
  height: 18px;
}
.user-headshot-box-center {
  width: 100%;
  height: 317px;
  background-color: khaki;
}
.user-headshot-box-center img {
  object-fit: cover;
  width: 100%;
  height: 100%;
}
.user-headshot-box-bottom {
  height: 106px;
  display: flex;
  flex-direction: column;
  width: 100%;
}
.user-headshot-box-bottom-zoom {
  width: 100%;
  height: 40px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px 0 10px;
  box-sizing: border-box;
}
.user-headshot-box-bottom-zoom-svg {
  -webkit-user-select: none;
  width: 30px;
  height: 30px;
  display: grid;
  align-items: center;
  justify-items: center;
}
.user-headshot-box-bottom-zoom-svg .icon {
  width: 20px;
  height: 20px;
}
.user-headshot-box-bottom-zoom-svg .icon:hover {
  fill: #0099ff;
}
.user-headshot-box-bottom-zoom-progress-bar {
  width: 215px;
  background-color: orange;
}
.user-headshot-box-bottom-button-all {
  width: 100%;
  height: 66px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  box-sizing: border-box;
}
.user-headshot-box-bottom-button {
  all: unset;
  -webkit-user-select: none;
  box-sizing: border-box;
  width: 75px;
  height: 27px;
  border-radius: 3px;
  display: grid;
  align-items: center;
  justify-content: center;
  font-size: 14px;
}
.blue {
  background-color: #0099ff;
  color: #fff;
}
.blue:hover {
  background-color: #0093f5;
}
.white {
  margin-left: 10px;
  margin-right: 15px;
  border: 1px solid #cecece;
}
.white:hover {
  background-color: #e9e9e9;
}
</style>
