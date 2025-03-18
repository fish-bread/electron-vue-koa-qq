<!--suppress ALL -->
<script setup>
import { close, shrink, setFullScreen } from '../../function/Window/TopBorder'
import {
  clearInput,
  add_user,
  search_user,
  user_none_search,
  user,
  initialize_user
} from '../../function/user'
import { searchNoneUserAxios } from '../../axios/search'
import { ref, onMounted } from 'vue'
const isFocused = ref(false)
const search = ref([{ name: '全部' }, { name: '用户' }, { name: '群聊' }])
const selectedIndex = ref(0) // 新增选中索引状态
// 点击按钮时更新选中状态
const selectButton = (index) => {
  selectedIndex.value = index
  console.log(selectedIndex.value)
}
onMounted(async () => {
  await initialize_user()
})
</script>

<template>
  <div class="search-body">
    <!--top-->
    <div class="search-body-top">
      <!--顶部按钮-->
      <div class="search-body-top-button">
        <div class="search-body-top-logo">全网搜索</div>
        <button class="gray" @click="shrink">
          <svg
            t="1741916524280"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="3514"
            width="200"
            height="200"
          >
            <path
              d="M819.2 477.866667h-597.333333c-17.066667 0-34.133333 12.8-34.133334 34.133333s12.8 34.133333 34.133334 34.133333h597.333333c17.066667 0 34.133333-12.8 34.133333-34.133333s-12.8-34.133333-34.133333-34.133333z"
              p-id="3515"
            ></path>
          </svg>
        </button>
        <button class="gray" @click="setFullScreen">
          <svg
            t="1741916508767"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="3348"
            width="200"
            height="200"
          >
            <path
              d="M832 93.866667h-640c-51.2 0-93.866667 42.666667-93.866667 93.866666v640c0 51.2 42.666667 93.866667 93.866667 93.866667h640c51.2 0 93.866667-42.666667 93.866667-93.866667v-640c4.266667-46.933333-42.666667-93.866667-93.866667-93.866666z m29.866667 738.133333c0 17.066667-12.8 34.133333-34.133334 34.133333h-640c-17.066667 0-34.133333-12.8-34.133333-34.133333v-640c0-17.066667 12.8-34.133333 34.133333-34.133333h640c17.066667 0 34.133333 12.8 34.133334 34.133333v640z"
              p-id="3349"
            ></path>
          </svg>
        </button>
        <button class="red" @click="close">
          <svg
            t="1741916485573"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="3182"
            width="200"
            height="200"
          >
            <path
              d="M558.933333 512l320-320c12.8-12.8 12.8-34.133333 0-46.933333s-34.133333-12.8-46.933333 0L512 465.066667 192 149.333333c-12.8-12.8-34.133333-12.8-46.933333 0s-12.8 34.133333 0 46.933334l320 320-320 320c-12.8 12.8-12.8 34.133333 0 46.933333 4.266667 4.266667 12.8 8.533333 21.333333 8.533333s17.066667-4.266667 21.333333-8.533333l320-320 320 320c4.266667 4.266667 12.8 8.533333 21.333334 8.533333s17.066667-4.266667 21.333333-8.533333c12.8-12.8 12.8-34.133333 0-46.933333L558.933333 512z"
              p-id="3183"
            ></path>
          </svg>
        </button>
      </div>
      <!--搜索-->
      <div class="search-body-search">
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
            v-model="user_none_search"
            class="search-input"
            type="text"
            placeholder="搜索"
            @focus="isFocused = true"
            @blur="isFocused = false"
            @keydown.enter="searchNoneUserAxios"
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
      </div>
      <!--底部切换搜索对象-->
      <div class="search-body-search-user">
        <button
          v-for="(user, index) in search"
          :key="index"
          :class="{ 'selected-button': selectedIndex === index }"
          class="search-body-search-user-button"
          @click="selectButton(index)"
        >
          {{ user.name }}
        </button>
      </div>
    </div>
    <!--body-->
    <div class="search-body-body">
      <!--用户列表-->
      <div class="home-friend-user-friend-list">
        <div
          v-for="(user, index) in search_user"
          :key="index"
          class="home-friend-user-friend-list-user"
        >
          <div class="home-friend-user-friend-list-user-img">
            <img :src="user.search_user_headshot" alt="" />
          </div>
          <div class="home-friend-user-friend-list-user-title">
            <div class="home-friend-user-friend-list-user-name">{{ user.search_user_name }}</div>
            <div class="home-friend-user-friend-list-user-local">
              {{ user.search_user_uid }}
            </div>
          </div>
          <div class="home-friend-user-friend-list-user-add">
            <button
              class="home-friend-user-friend-list-user-add-button"
              @click="add_user(user.search_user_uid)"
            >
              添加
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
input {
  all: unset;
  background-color: #f5f5f5;
  height: 100%;
  font-size: 13px;
}
.home-friend-user-search-input {
  -webkit-app-region: no-drag;
  box-sizing: border-box;
  margin-top: 15px;
  width: 95%;
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
.search-body-search {
  display: grid;
  justify-items: center;
  height: 100%;
  width: 100%;
  -webkit-app-region: no-drag;
  background-color: #ffffff;
}
.search-body-search-user {
  width: auto;
  height: 100%;
  background-color: #ffffff;
  -webkit-app-region: no-drag;
  display: grid;
  grid-column-gap: 20px;
  grid-template-columns: 50px 50px 50px;
  align-items: center;
  padding-left: 20px;
}
.search-body-search-user-button {
  all: unset;
  background-color: #ffffff;
  width: 50px;
  height: 30px;
  display: grid;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  border-radius: 7px;
}
.search-body-search-user-button:hover {
  background-color: #f5f5f5;
}
.search-body-search-user-button.selected-button {
  background-color: #f5f5f5 !important;
}
.search-body {
  -webkit-user-select: none;
  -webkit-user-drag: none;
  height: 100vh;
  -webkit-app-region: drag;
  display: grid;
  grid-template-rows: 126px auto;
}
.search-body-top {
  background-color: #ffffff;
  box-sizing: border-box;
  border-bottom: 1px solid #c0c0c0;
  display: grid;
  grid-template-rows: 30px auto 50px;
}
.search-body-top-button {
  display: grid;
  background-color: #ffffff;
  grid-template-columns: auto 30px 30px 30px;
  justify-items: center;
}
.search-body-top-logo {
  -webkit-user-select: none;
  -webkit-user-drag: none;
  -webkit-app-region: drag;
  box-sizing: border-box;
  margin-left: 60px;
  display: grid;
  font-size: 13px;
  align-items: center;
}
.search-body-body {
  -webkit-app-region: no-drag;
  background-color: #ffffff;
}
.home-friend-user-friend-list {
  -webkit-app-region: no-drag;
  box-sizing: border-box;
  background-color: #ffffff;
  overflow: auto;
}
.home-friend-user-friend-list::-webkit-scrollbar {
  display: none;
}
.home-friend-user-friend-list-user {
  background-color: #ffffff;
  height: 70px;
  display: grid;
  grid-template-columns: 43px auto 60px;
  align-items: center;
  padding: 0 10px 0 15px;
  grid-column-gap: 10px;
  cursor: default;
}
.home-friend-user-friend-list-user:hover {
  background-color: #f5f5f5;
}
.home-friend-user-friend-list-user-img {
  height: 43px;
  border-radius: 50%;
  overflow: hidden;
}
.home-friend-user-friend-list-user-name {
  overflow: hidden;
  font-size: 16px;
  line-height: 25px;
}
.home-friend-user-friend-list-user-add {
  display: grid;
  align-items: center;
  justify-items: center;
}
.home-friend-user-friend-list-user-add-button {
  all: unset;
  background-color: #ffffff;
  box-sizing: border-box;
  border: 1px solid #c0c0c0;
  font-size: 12px;
  padding: 5px 10px 5px 10px;
  border-radius: 5px;
}
.home-friend-user-friend-list-user-add-button:hover {
  background-color: #f5f5f5;
}
.home-friend-user-friend-list-user-local {
  overflow: hidden;
  font-size: 13px;
  line-height: 18px;
  color: gray;
  color: #0093f5;
}
img {
  width: 100%;
  height: 100%;
}
.icon {
  width: 18px;
  height: 18px;
}
.gray,
.red {
  all: unset;
  -webkit-app-region: no-drag;
  width: 28px;
  height: 28px;
  display: grid;
  align-items: center;
  justify-content: center;
}
.gray:hover {
  background-color: #e9e9e9;
}
.red:hover {
  background-color: red;
}
</style>
