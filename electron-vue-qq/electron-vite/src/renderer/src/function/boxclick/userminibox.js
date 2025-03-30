import { ref } from 'vue'
export const showMiniUserBox = ref(false)
export const MiniUserBox = ref(null) // 使用 Vue 的 ref 获取 DOM 元素
export const MiniUserBoxButton = ref(null)
//点击用户迷你盒子
export const UserMiniBoxClick = () => {
  console.log('showMiniUserBox')
  showMiniUserBox.value = !showMiniUserBox.value
}
