import { ref } from 'vue'
import Vibrant from 'node-vibrant'
import { istoneColor } from '../components/appSetBox/toneColor'
//主题色_用户选中颜色
export const accent_color = ref('#0099ff')
//聊天气泡
export const chat_bubbles = ref('#0099ff')
//聊天背景
export const chat_background = ref('#f2f2f2')
export const background_image = ref(null) // For storing the background image URL
export const ImgInput = ref()
// 用于存储当前选中的图片文件
export const currentImageFile = ref(null)

//获取背景图片或样式
export const userColorStyle = async () => {
  const color = await window.api.searchColorStyle()
  const backgroundImage = await window.api.getBackgroundImage()
  accent_color.value = color.accent_color
  chat_bubbles.value = color.chat_bubbles
  chat_background.value = color.chat_background
  if (backgroundImage) {
    console.log('背景存在')
    const blob = new Blob([backgroundImage])
    background_image.value = URL.createObjectURL(blob)
  } else {
    background_image.value = color.background_image
    console.log('背景不存在')
  }
  console.log(color)
}
//保存样式
export const confirmColor = async () => {
  //保存本地的样式及函数
  const color = {
    accent_color: accent_color.value,
    chat_bubbles: chat_bubbles.value,
    chat_background: chat_background.value
  }
  // 如果有上传的图片文件，先保存到主进程
  if (currentImageFile.value) {
    try {
      // 将文件转换为ArrayBuffer并保存到主进程
      const arrayBuffer = await readFileAsArrayBuffer(currentImageFile.value)
      await window.api
        .saveBackgroundImage(color, arrayBuffer)
        .then(async () => {
          console.log('颜色样式', color)
          window.api.sendStyle()
          currentImageFile.value = null
        })
        .catch((err) => {
          console.log(err)
        })
    } catch (error) {
      console.error('保存图片失败:', error)
    }
  } else {
    console.log('颜色样式', color)
    await window.api
      .localColorStyle(color)
      .then(() => {
        window.api.sendStyle()
        istoneColor.value = false
      })
      .catch((err) => {
        console.log(err)
      })
  }
}
// 默认选中第一个按钮
export const selectedButtonIndex = ref(0)
export const buttonImg = () => {
  console.log('按钮')
  ImgInput.value.click()
}
// 图像处理函数
export const handleImageUpload = async (event) => {
  selectedButtonIndex.value = -1
  const file = event.target.files[0]
  if (!file) return

  // 验证文件类型
  if (!file.type.startsWith('image/')) {
    console.log('只能上传图片文件！')
    return
  }
  currentImageFile.value = file
  // 生成图片临时URL
  const imageUrl = URL.createObjectURL(file)
  background_image.value = imageUrl
  console.log('图片url', imageUrl)
  try {
    // 使用Vibrant提取主色
    const palette = await Vibrant.from(imageUrl).getPalette()

    // 分配颜色值
    accent_color.value = palette.Vibrant?.hex || '#0099ff' // 主色调
    chat_bubbles.value = palette.DarkVibrant?.hex || '#0099ff' // 深色调
    chat_background.value = palette.LightVibrant?.hex || '#f2f2f2' // 可选亮色调
  } catch (error) {
    console.error('颜色提取失败:', error)
  }
}
//恢复默认
export const handleDefaultColor = async () => {
  accent_color.value = '#0099ff'
  chat_bubbles.value = accent_color.value
  chat_background.value = '#f2f2f2'
  background_image.value = null
}
//颜色按钮样式
export const chooseColor = (color, index) => {
  console.log(color, index)
  accent_color.value = color.accent_color
  chat_bubbles.value = color.chat_bubbles
  chat_background.value = color.chat_background
  background_image.value = color.background_image
  selectedButtonIndex.value = index
}
// 比对当前颜色值与预设值，返回匹配的索引
export const findMatchingButtonIndex = () => {
  const currentValues = {
    accent_color: accent_color.value,
    chat_bubbles: chat_bubbles.value,
    chat_background: chat_background.value,
    background_image: background_image.value
  }
  return colorButton.value.findIndex(
    (button) =>
      button.accent_color === currentValues.accent_color &&
      button.chat_bubbles === currentValues.chat_bubbles &&
      button.chat_background === currentValues.chat_background &&
      button.background_image === currentValues.background_image
  )
}
//遍历按钮
export const colorButton = ref([
  {
    name: '默认',
    accent_color: '#0099ff',
    chat_bubbles: '#0099ff',
    chat_background: '#f2f2f2',
    background_image: null
  },
  {
    name: '典雅黑',
    accent_color: '#0066cc',
    chat_bubbles: '#666666',
    chat_background: '#111111',
    background_image: null
  },
  {
    name: '粉色',
    accent_color: '#7f7384',
    chat_bubbles: '#7f7384',
    chat_background: '#d7ced8',
    background_image: null
  }
])
// 辅助函数：将File对象转换为ArrayBuffer
const readFileAsArrayBuffer = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsArrayBuffer(file)
  })
}
