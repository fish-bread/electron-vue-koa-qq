<script setup>
import HomeSidebar from './components/homeSidebar.vue'
import HomeFriendUser from './components/homeFriendUser.vue'
import HomeChat from './components/homeChat.vue'
import { onMounted } from 'vue'
import { initialize_user, user } from '../../function/user'
import { searchUserFriendAxios } from '../../axios/search'
import { handleClickOutside } from '../../function/boxclick/clickOut'
import UserProfile from '../../components/user/UserProfile.vue'
import UserHeadshot from '../../components/user/userHeadshot.vue'
import { isUserProfile, isUserHeadshot } from '../../function/UserProfile'
import { loadImage } from '../../function/cacheImage'
import { background_image, chat_background, userColorStyle } from '../../function/colorPalette'
onMounted(async () => {
  //加载用户
  await initialize_user()
  await searchUserFriendAxios()
  //加载样式
  await userColorStyle()
  //接收样式
  window.api.updateStyle(async () => {
    console.log('重新加载背景样式')
    await userColorStyle()
  })
  // 用户头像
  user.value.user_headshot = await loadImage(user.value.user_headshot)
  console.log('图片', user.value.user_headshot)
})
</script>

<template>
  <div
    class="background"
    :style="{
      backgroundColor: chat_background,
      backgroundImage: background_image ? `url(${background_image})` : 'none',
      backgroundSize: 'cover'
    }"
    @click="handleClickOutside"
  >
    <home-sidebar></home-sidebar>
    <home-friend-user></home-friend-user>
    <home-chat></home-chat>
    <!--修改资料-->
    <user-profile v-if="isUserProfile === true"></user-profile>
    <!--上传图片-->
    <user-headshot v-if="isUserHeadshot === true"></user-headshot>
  </div>
</template>

<style scoped>
.background {
  background-color: #f2f2f2;
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-columns: 59px 250px auto;
}
</style>
