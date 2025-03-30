import { ref } from 'vue'

export const selectedItem = ref('chat') // 默认选中"聊天消息"
export const selectItem = (itemName) => {
  console.log(itemName)
  selectedItem.value = itemName
}
//打开网站
export const webUrl = (url) => {
  window.api.sendUrl(url)
}
