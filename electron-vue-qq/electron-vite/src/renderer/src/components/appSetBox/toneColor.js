import { ref } from 'vue'
import { accent_color, chat_bubbles, chat_background } from '../../function/colorPalette'

export const istoneColor = ref(false)
export const tone_accent_color = ref('#0099ff')
export const tone_chat_bubbles = ref('#0099ff')
export const tone_chat_background = ref('#f2f2f2')
export const tone_background_image = ref(null)
export const confirmToneColor = async () => {
  accent_color.value = tone_accent_color.value
  chat_bubbles.value = tone_chat_bubbles.value
  chat_background.value = tone_chat_background.value
  //保存本地的样式及函数
  const color = {
    accent_color: accent_color.value,
    chat_bubbles: chat_bubbles.value,
    chat_background: chat_background.value
  }
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
