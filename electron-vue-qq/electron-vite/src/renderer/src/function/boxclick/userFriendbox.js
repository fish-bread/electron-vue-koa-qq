import { ref } from 'vue'

export const showMiniUserFriendBox = ref(false)
export const MiniUserFriendBox = ref(null)
export const MiniUserFriendBoxButton = ref(null)
//点击用户盆友迷你盒子
export const UserFriendMiniBoxClick = () => {
  console.log('showMiniUserFriendBox')
  showMiniUserFriendBox.value = !showMiniUserFriendBox.value
}
