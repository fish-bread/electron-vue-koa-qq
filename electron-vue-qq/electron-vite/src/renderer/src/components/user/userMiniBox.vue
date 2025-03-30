<script setup>
import { user } from '../../function/user.js'
import { MiniUserBox, showMiniUserBox } from '../../function/boxclick/userminibox'
import { isUserProfile } from '../../function/UserProfile'
</script>

<template>
  <div v-show="showMiniUserBox" ref="MiniUserBox" class="userMiniBox" @click.stop>
    <!--顶部用户信息-->
    <div class="user-top">
      <!--用户头像-->
      <div class="user-img">
        <img :src="user.user_headshot" alt="" />
      </div>
      <!--用户名字及uid-->
      <div class="user-name-box">
        <div class="user-name">{{ user.user_name }}</div>
        <div class="user-uid">uid:&nbsp;{{ user.user_uid }}</div>
        <div class="user-connect-box">
          <svg
            t="1742379652254"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="7565"
            width="200"
            height="200"
          >
            <path
              d="M512 0c281.6 0 512 230.4 512 512s-230.4 512-512 512-512-230.4-512-512 230.4-512 512-512z"
              fill="#28D2A0"
              p-id="7566"
            ></path>
          </svg>
          <div class="user-connect">在线</div>
        </div>
      </div>
      <!--点赞-->
      <div class="user-Thumbs-up-box">
        <svg
          t="1742381372799"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="3237"
          width="200"
          height="200"
        >
          <path
            d="M213.333333 392.533333H132.266667c-21.333333 0-42.666667 8.533333-55.466667 25.6s-21.333333 34.133333-21.333333 55.466667l34.133333 405.333333c4.266667 38.4 34.133333 68.266667 72.533333 68.266667H213.333333c42.666667 0 76.8-34.133333 76.8-76.8V469.333333c0-42.666667-34.133333-76.8-76.8-76.8z m8.533334 482.133334c0 4.266667-4.266667 8.533333-8.533334 8.533333H166.4c-4.266667 0-8.533333-4.266667-8.533333-8.533333L119.466667 469.333333c0-4.266667 0-8.533333 4.266666-8.533333 0 0 4.266667-4.266667 8.533334-4.266667H213.333333c4.266667 0 8.533333 4.266667 8.533334 8.533334v409.6zM964.266667 422.4c-12.8-17.066667-34.133333-29.866667-59.733334-29.866667h-187.733333l8.533333-21.333333c8.533333-29.866667 17.066667-59.733333 21.333334-93.866667 4.266667-46.933333-4.266667-81.066667-21.333334-110.933333-25.6-42.666667-89.6-98.133333-136.533333-89.6-21.333333 4.266667-34.133333 21.333333-38.4 42.666667v12.8c-4.266667 55.466667-12.8 132.266667-38.4 170.666666-21.333333 29.866667-64 59.733333-115.2 81.066667-25.6 12.8-46.933333 42.666667-46.933333 68.266667v418.133333c0 42.666667 34.133333 76.8 76.8 76.8h362.666666c34.133333 0 64-21.333333 72.533334-55.466667l115.2-405.333333c4.266667-21.333333 0-42.666667-12.8-64z m-51.2 51.2l-115.2 405.333333c0 4.266667-4.266667 8.533333-8.533334 8.533334H426.666667c-4.266667 0-8.533333-4.266667-8.533334-8.533334v-418.133333c0-4.266667 4.266667-8.533333 8.533334-12.8 42.666667-25.6 102.4-64 132.266666-110.933333 34.133333-59.733333 42.666667-153.6 46.933334-192 17.066667 8.533333 42.666667 29.866667 59.733333 55.466666 8.533333 17.066667 12.8 42.666667 12.8 76.8 0 25.6-8.533333 51.2-17.066667 81.066667L640 418.133333c-4.266667 8.533333 0 21.333333 4.266667 29.866667 4.266667 8.533333 17.066667 12.8 25.6 12.8h230.4c4.266667 0 8.533333 4.266667 8.533333 4.266667s4.266667 4.266667 4.266667 8.533333z"
            p-id="3238"
          ></path>
        </svg>
        <div class="user-Thumbs-up-number">{{ user.user_thumbs_up }}</div>
      </div>
    </div>
    <!--中间各种东西-->
    <div class="user-center">
      <!--等级-->
      <div class="user-center-level">
        <div class="user-center-text">等级</div>
        <div class="user-center-text-right">LV:&nbsp; {{ user.user_level }}</div>
      </div>
      <!--签名-->
      <div class="user-center-level">
        <div class="user-center-text">签名</div>
        <div class="user-center-text-right">{{ user.user_personal_signature }}</div>
      </div>
      <!--所在地-->
      <div class="user-center-level">
        <div class="user-center-text">所在地</div>
        <div class="user-center-text-right">{{ user.user_region }}</div>
      </div>
    </div>
    <!--底部按钮-->
    <div class="user-bottom">
      <!--编辑资料-->
      <button class="user-bottom-button" @click="isUserProfile = true">编辑资料</button>
    </div>
  </div>
</template>

<style scoped>
img {
  -webkit-user-select: none;
  -webkit-user-drag: none;
  width: 100%;
  height: 100%;
}
.userMiniBox {
  position: absolute;
  z-index: 6;
  left: 50px;
  top: 0;
  width: 320px;
  height: 320px;
  border-radius: 7px;
  background-color: rgb(255, 255, 255);
  box-shadow:
    5px 5px 10px rgba(128, 128, 128, 0.4),
    -5px 5px 10px rgba(128, 128, 128, 0.4);
  display: grid;
  grid-template-rows: 120px auto 100px;
  overflow: hidden;
}
.user-top {
  display: grid;
  grid-template-columns: 60px auto 50px;
  box-sizing: border-box;
  padding-left: 20px;
  padding-top: 40px;
  grid-column-gap: 20px;
}
.user-img {
  -webkit-user-select: none;
  -webkit-user-drag: none;
  box-sizing: border-box;
  width: 100%;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
}
.user-name-box {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 80px;
}
.user-name {
  cursor: default;
  font-size: 16px;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.user-uid {
  font-size: 12px;
  color: #c1c1c1;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.user-connect-box {
  -webkit-user-drag: none;
  -webkit-user-select: none;
  font-size: 14px;
  display: flex;
  flex-direction: row;
  cursor: default;
  width: 60px;
  border-radius: 3px;
  overflow: hidden;
  align-items: center;
  box-sizing: border-box;
  padding-left: 3px;
}
.user-connect-box:hover {
  background-color: #eff0f2;
}
.user-connect-box .icon {
  width: 16px;
  height: 16px;
}
.user-Thumbs-up-box {
  -webkit-user-drag: none;
  -webkit-user-select: none;
  cursor: default;
  box-sizing: border-box;
  margin-top: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 3px;
  overflow: hidden;
}
.user-Thumbs-up-box:hover {
  background-color: #eff0f2;
}
.user-Thumbs-up-box .icon {
  width: 20px;
  height: 20px;
}
.user-Thumbs-up-number {
  font-size: 12px;
}
.user-connect {
  box-sizing: border-box;
  padding-left: 5px;
}
.user-center {
  box-sizing: border-box;
  padding-top: 5px;
  padding-left: 20px;
  display: grid;
  grid-template-rows: repeat(3, 20px);
  grid-row-gap: 15px;
}
.user-center-level {
  display: flex;
  flex-direction: row;
}
.user-center-text {
  -webkit-user-drag: none;
  -webkit-user-select: none;
  color: #c1c1c1;
  font-size: 14px;
  width: 80px;
}
.user-center-text-right {
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 14px;
}
.user-bottom {
  padding-left: 20px;
  display: grid;
  align-items: center;
  justify-content: center;
}
.user-bottom-button {
  all: unset;
  -webkit-user-select: none;
  box-sizing: border-box;
  padding: 5px 10px 5px 10px;
  border: 1px #cccccc solid;
  border-radius: 3px;
}
.user-bottom-button:hover {
  background-color: #f5f5f5;
}
</style>
