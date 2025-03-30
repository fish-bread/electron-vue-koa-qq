import { ref } from 'vue'
import { sendImg } from '../axios/user'
import { user } from './user'
export const isUserHeadshot = ref(false)
export const isUserProfile = ref(false)
//裁剪图片
export const cropper = ref()
export const option = ref({
  autoCrop: true, // 是否默认生成截图框
  autoCropHeight: '240px', // 默认生成截图框宽度(默认值：容器的 80%, 可选值：0 ~ max), 真正裁剪出来的图片的宽度为 autoCropHeight * 1.25
  autoCropWidth: '240px', // 默认生成截图框宽度(默认值：容器的 80%, 可选值：0 ~ max), 真正裁剪出来的图片的宽度为 autoWidth * 1.25
  canMove: true, // 上传图片是否可以移动
  canScale: true, // 图片是否允许滚轮缩放
  centerBox: true, // 截图框是否被限制在图片里面
  fixed: true, // 是否固定截图框的宽高比例
  fixedBox: true, // 是否固定截图框大小
  fixedNumber: [1, 1], // 截图框的宽高比例([ 宽度 , 高度 ])
  img: '', // 裁剪图片的地址(可选值：url 地址, base64, blob)
  infoTrue: true, // infoTrue为 true 时显示预览图片的宽高信息,infoTrue为 false 时表示显示裁剪框的宽高信息
  mode: 'contain', // 截图框可拖动时的方向(可选值：contain , cover, 100px, 100% auto)
  origin: false, // 上传的图片是否按照原始比例渲染
  outputSize: 1, // 裁剪生成图片的质量(可选值：0.1 ~ 1)
  outputType: 'png', // 裁剪生成图片的格式(可选值：png, jpeg, webp)
  full: true // 是否输出原图比例的截图
})
export const previews = ref()
//上传文件
export const user_headshot = async () => {
  console.log('user headshot')
  cropper.value.getCropBlob(async (blob) => {
    let avatar = new File([blob], `${user.value.user_uid}.png`)
    await sendImg(avatar)
  })
}
