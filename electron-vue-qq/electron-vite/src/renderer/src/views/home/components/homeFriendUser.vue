<!--suppress HtmlUnknownAttribute, HtmlDeprecatedAttribute -->
<script setup>
import { ref, onMounted } from 'vue'
import {
  selectedUser,
  user_friend,
  selectedUserUid,
  user_search,
  clearInput,
  openSearch,
  initialize_user,
  user
} from '../../../function/user'
import { searchUserAxios, searchUserFriendAxios } from '../../../axios/search'
import { accent_color } from '../../../function/colorPalette'
const isFocused = ref(false)
onMounted(async () => {
  await window.api.updateWindow(async () => {
    console.log('执行好友更新函数')
    await initialize_user()
    // 重新更新user及获取好友列表
    await searchUserFriendAxios()
    console.log('好友列表已更新', user_friend.value, 'user', user.value)
  })
})
</script>

<template>
  <div class="home-friend-user">
    <!--搜索用户-->
    <div class="home-friend-user-search">
      <!--搜索-->
      <div
        class="home-friend-user-search-input"
        :style="{ border: isFocused ? '1px solid blue' : '1px solid khaki' }"
      >
        <div class="home-friend-user-search-svg">
          <svg
            t="1741917977118"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="3680"
            width="200"
            height="200"
          >
            <path
              d="M448 221.866667c-55.466667 0-106.666667 25.6-145.066667 64-8.533333 12.8-8.533333 34.133333 4.266667 46.933333 12.8 8.533333 34.133333 8.533333 46.933333-4.266667 21.333333-25.6 55.466667-38.4 93.866667-38.4s72.533333 12.8 93.866667 38.4c8.533333 8.533333 17.066667 12.8 25.6 12.8 8.533333 0 17.066667-4.266667 21.333333-8.533333 12.8-12.8 12.8-29.866667 4.266667-46.933333-38.4-38.4-89.6-64-145.066667-64z"
              p-id="3681"
            ></path>
            <path
              d="M908.8 832l-145.066667-145.066667c51.2-68.266667 81.066667-149.333333 81.066667-238.933333 0-217.6-174.933333-392.533333-392.533333-392.533333s-392.533333 174.933333-392.533334 392.533333 174.933333 392.533333 392.533334 392.533333c89.6 0 170.666667-29.866667 238.933333-81.066666l145.066667 145.066666c8.533333 8.533333 25.6 17.066667 38.4 17.066667s25.6-4.266667 38.4-17.066667c17.066667-17.066667 17.066667-51.2-4.266667-72.533333z m-789.333333-384c0-183.466667 149.333333-332.8 332.8-332.8s332.8 149.333333 332.8 332.8-149.333333 332.8-332.8 332.8-332.8-149.333333-332.8-332.8z"
              p-id="3682"
            ></path>
          </svg>
        </div>
        <input
          v-model="user_search"
          class="search-input"
          type="text"
          placeholder="搜索"
          @focus="isFocused = true"
          @blur="isFocused = false"
          @keydown.enter="searchUserAxios"
        />
        <div v-show="isFocused === true" class="home-friend-user-search-svg" @click="clearInput">
          <svg
            t="1741918074924"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="3849"
            width="200"
            height="200"
          >
            <path
              d="M558.933333 512l320-320c12.8-12.8 12.8-34.133333 0-46.933333s-34.133333-12.8-46.933333 0L512 465.066667 192 149.333333c-12.8-12.8-34.133333-12.8-46.933333 0s-12.8 34.133333 0 46.933334l320 320-320 320c-12.8 12.8-12.8 34.133333 0 46.933333 4.266667 4.266667 12.8 8.533333 21.333333 8.533333s17.066667-4.266667 21.333333-8.533333l320-320 320 320c4.266667 4.266667 12.8 8.533333 21.333334 8.533333s17.066667-4.266667 21.333333-8.533333c12.8-12.8 12.8-34.133333 0-46.933333L558.933333 512z"
              p-id="3850"
            ></path>
          </svg>
        </div>
      </div>
      <!--添加用户-->
      <div class="home-friend-user-search-friend">
        <button class="home-friend-user-search-friend-button" @click="openSearch">
          <svg
            t="1742049370649"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="3237"
            width="200"
            height="200"
          >
            <path
              d="M810.666667 477.866667h-264.533334V213.333333c0-17.066667-12.8-34.133333-29.866666-34.133333-17.066667 0-29.866667 12.8-34.133334 29.866667v268.8H213.333333c-17.066667 0-34.133333 12.8-34.133333 34.133333s12.8 34.133333 34.133333 34.133333h268.8V810.666667c0 17.066667 12.8 34.133333 29.866667 34.133333 17.066667 0 29.866667-12.8 34.133333-29.866667v-268.8H810.666667c17.066667 0 34.133333-12.8 34.133333-34.133333s-17.066667-34.133333-34.133333-34.133333z"
              p-id="3238"
            ></path>
          </svg>
        </button>
      </div>
    </div>
    <!--用户列表-->
    <div class="home-friend-user-friend-list">
      <div
        v-for="(users, index) in user_friend"
        :key="index"
        class="home-friend-user-friend-list-user"
        :class="{ selected: selectedUserUid === users.user_friend_uid }"
        @click="selectedUser(users.user_friend_uid)"
      >
        <div class="home-friend-user-friend-list-user-img">
          <img :src="users.user_friend_headshot" alt="" />
        </div>
        <div class="home-friend-user-friend-list-user-title">
          <div class="home-friend-user-friend-list-user-name">{{ users.user_friend_name }}</div>
          <div class="home-friend-user-friend-list-user-local">
            {{ users.user_friend_local_name }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
img {
  width: 100%;
  height: 100%;
}
.icon {
  width: 15px;
  height: 15px;
}
input {
  all: unset;
  background-color: #f5f5f5;
  height: 100%;
  font-size: 13px;
}
input::placeholder {
  -webkit-user-select: none;
}
.home-friend-user {
  -webkit-user-select: none;
  background-color: rgba(225, 225, 225, 0.3);
  height: 100vh;
  display: grid;
  grid-template-rows: 66px auto;
  box-sizing: border-box;
  border-right: 1px solid #c0c0c0;
}
.home-friend-user-search {
  -webkit-app-region: drag;
  display: grid;
  align-items: center;
  justify-content: center;
  grid-template-columns: auto 40px;
}
.home-friend-user-search-input {
  -webkit-app-region: no-drag;
  box-sizing: border-box;
  margin-top: 30px;
  width: 200px;
  height: 25px;
  grid-template-columns: 20px auto 20px;
  display: grid;
  align-items: center;
  border-radius: 5px;
  overflow: hidden;
  background-color: #f5f5f5;
}
.home-friend-user-search-svg {
  z-index: 5;
  width: 20px;
  height: 25px;
  display: grid;
  align-items: center;
  justify-content: center;
  pointer-events: auto;
  background-color: #f5f5f5;
}
.home-friend-user-friend-list {
  -webkit-app-region: no-drag;
  box-sizing: border-box;
  overflow: auto;
}
.home-friend-user-friend-list::-webkit-scrollbar {
  display: none;
}
.home-friend-user-friend-list-user {
  height: 70px;
  display: grid;
  grid-template-columns: 43px auto;
  align-items: center;
  padding: 0 10px 0 15px;
  grid-column-gap: 10px;
  cursor: default;
}
.home-friend-user-friend-list-user:hover {
  background-color: #f5f5f5;
}
.selected {
  background-color: v-bind(accent_color) !important; /* 蓝色背景 */
  color: white; /* 文字颜色 */
}
.home-friend-user-friend-list-user-img {
  height: 43px;
  border-radius: 50%;
  overflow: hidden;
}
.home-friend-user-friend-list-user-title {
  height: 43px;
  display: grid;
  grid-template-rows: 25px 18px;
}
.home-friend-user-friend-list-user-name {
  overflow: hidden;
  font-size: 16px;
  line-height: 25px;
}
.home-friend-user-friend-list-user-local {
  overflow: hidden;
  font-size: 11px;
  line-height: 18px;
  color: gray;
}
.home-friend-user-search-friend {
  -webkit-app-region: no-drag;
  box-sizing: border-box;
  margin-top: 30px;
  display: grid;
  align-items: center;
  justify-items: center;
}
.home-friend-user-search-friend-button {
  all: unset;
  background-color: #f5f5f5;
  display: grid;
  align-items: center;
  justify-items: center;
  width: 25px;
  height: 25px;
  border-radius: 5px;
}
.home-friend-user-search-friend-button:hover {
  background-color: #ebebeb;
}
</style>
