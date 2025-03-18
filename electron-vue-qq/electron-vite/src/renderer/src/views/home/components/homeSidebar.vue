<script setup>
import { user } from '../../../function/user'
</script>

<template>
  <div class="body-sidebar">
    <!--logo-->
    <div class="body-sidebar-logo">test</div>
    <!--用户头像-->
    <div class="body-sidebar-user_headshot">
      <img :src="user.user_headshot" alt="" />
    </div>
  </div>
</template>

<style scoped>
img {
  width: 100%;
  height: 100%;
}
.body-sidebar {
  -webkit-app-region: drag;
  background-color: #cdcdcd;
  display: grid;
  box-sizing: border-box;
  padding: 10px 5px 30px 5px;
  justify-items: center;
  grid-template-rows: 30px 45px auto;
  grid-row-gap: 10px;
}
.body-sidebar-logo {
  width: 45px;
  height: 30px;
  line-height: 30px;
  text-align: center;
}
.body-sidebar-user_headshot {
  -webkit-app-region: no-drag;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background-color: gray;
  overflow: hidden;
}
</style>
