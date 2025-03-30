import { ref } from 'vue'
import { MiniUserBox, MiniUserBoxButton, showMiniUserBox } from './userminibox'
import { MiniUserFriendBox, MiniUserFriendBoxButton, showMiniUserFriendBox } from './userFriendbox'
//更多盒子
export const showMoreBox = ref(false)
export const moreBox = ref(null) // 使用 Vue 的 ref 获取 DOM 元素
export const moreBoxButton = ref(null)
export const moreBoxButtonText = ref([
  { name: '超级调色盘' },
  { name: '检测更新' },
  { name: '设置' },
  { name: '帮助' },
  { name: '关于' },
  { name: '退出登录' }
])
//点击更多盒子
export const toggleMoreBox = () => {
  showMoreBox.value = !showMoreBox.value
}

export const handleClickOutside = (event) => {
  // 处理 moreBox 的隐藏
  if (
    moreBox.value &&
    moreBoxButton.value &&
    !moreBoxButton.value.contains(event.target) &&
    !moreBox.value.contains(event.target)
  ) {
    showMoreBox.value = false
  }
  // 处理 userMiniBox 的隐藏
  if (
    MiniUserBox.value &&
    MiniUserBoxButton.value &&
    !MiniUserBoxButton.value.contains(event.target) &&
    !MiniUserBox.value.contains(event.target)
  ) {
    showMiniUserBox.value = false
  }
  //处理userFriendMiniBox 的隐藏
  if (
    MiniUserFriendBox.value &&
    MiniUserFriendBoxButton.value &&
    !MiniUserFriendBoxButton.value.contains(event.target) &&
    !MiniUserFriendBox.value.contains(event.target)
  ) {
    showMiniUserFriendBox.value = false
  }
}

//退出登录
export const loginOut = async () => {
  await window.api.openLoginWindow()
}
//app设置
export const appSet = () => {
  showMoreBox.value = false
  window.api.openAppSetWindow()
}
