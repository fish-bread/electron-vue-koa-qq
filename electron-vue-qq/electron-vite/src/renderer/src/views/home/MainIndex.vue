<script setup>
import HomeSidebar from './components/homeSidebar.vue'
import HomeFriendUser from './components/homeFriendUser.vue'
import HomeChat from './components/homeChat.vue'
import { onMounted } from 'vue'
import { initialize_user } from '../../function/user'
import { searchUserFriendAxios } from '../../axios/search'
onMounted(async () => {
  await initialize_user()
  await searchUserFriendAxios()
})
</script>

<template>
  <div class="background">
    <home-sidebar></home-sidebar>
    <home-friend-user></home-friend-user>
    <home-chat></home-chat>
  </div>
</template>

<style scoped>
.background {
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-columns: 59px 250px auto;
}
</style>
