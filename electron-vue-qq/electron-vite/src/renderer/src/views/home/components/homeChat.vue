<!--suppress ALL -->
<script setup>
import { close, shrink, setFullScreen } from '../../../function/Window/TopBorder'
import {
  selectedUserUid,
  user_friend,
  user_send_message,
  send_message,
  user_friend_history_one
} from '../../../function/user'
import { ref, watch, onUnmounted, watchEffect, onMounted } from 'vue'
import { initWebSocket, userSearchHistory, ws } from '../../../axios/sendMessage'
// 当前选中的用户名
const selectedUserName = ref('')
// 当前选中的用户的聊天历史
const chatHistory = ref([])
const chatUserHeadshot = ref()
const chatUserFriendHeadshot = ref()
// 监听 selectedUserUid 的变化
watch(
  selectedUserUid,
  async (newUid) => {
    console.log('触发更新', user_friend_history_one.value)
    // 根据 selectedUserUid 查找对应的用户
    const user = user_friend.value.find((user) => user.user_friend_uid === newUid)
    if (user) {
      selectedUserName.value = user.user_friend_name // 更新选中的用户名
      await userSearchHistory()
    } else {
      selectedUserName.value = '' // 如果没有找到用户，清空用户名
    }

    // 查找对应的聊天历史
    const history = [user_friend_history_one.value]
    console.log('选择id切换历史', history)
    if (history !== undefined) {
      chatHistory.value = history[0].user_history
      chatUserHeadshot.value = history[0].user.user_headshot
      chatUserFriendHeadshot.value = history[0].user_friend.user_friend_headshot
      console.log(chatHistory.value)
    } else {
      chatHistory.value = [] // 如果没有找到历史记录，清空历史
    }
  },
  { immediate: true, deep: true }
) // immediate: true 表示立即执行一次
// 使用 watchEffect 监听 user_friend_history_one.value 的变化
watchEffect(
  () => {
    if (user_friend_history_one.value && user_friend_history_one.value.user_history) {
      // 查找对应的聊天历史
      const history = [user_friend_history_one.value]
      console.log('添加历史', history)
      chatHistory.value = history[0].user_history
      chatUserHeadshot.value = history[0].user.user_headshot
      chatUserFriendHeadshot.value = history[0].user_friend.user_friend_headshot
      console.log(chatHistory.value)
    } else {
      chatHistory.value = [] // 如果没有历史记录，清空 chatHistory
    }
  },
  { deep: true }
)
onMounted(() => {
  initWebSocket()
})
onUnmounted(() => {
  ws.close()
  console.log('WebSocket 连接已主动关闭')
})
</script>

<template>
  <div class="home-chat">
    <div class="home-chat-top">
      <!--窗体按钮-->
      <div class="home-chat-top-button">
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
      <!--单个用户-->
      <div class="home-chat-top-other">
        <div class="home-chat-top-other-user">
          <div class="user-name">{{ selectedUserName }}</div>
        </div>
      </div>
    </div>
    <!--聊天历史-->
    <div class="home-chat-local">
      <div class="home-chat-local-body">
        <div v-for="(message, index) in chatHistory" :key="index" class="message">
          <div v-if="message.user_take" class="user-message">
            <div class="user-message-text">{{ message.user_take }}</div>
            <div class="user-message-headshot">
              <img :src="chatUserHeadshot" alt="" />
            </div>
          </div>
          <div v-if="message.friend_user_take" class="friend-message">
            <div class="user-message-headshot">
              <img :src="chatUserFriendHeadshot" alt="" />
            </div>
            <div class="friend-message-text">{{ message.friend_user_take }}</div>
          </div>
        </div>
      </div>
      <!--输入框-->
      <div class="home-chat-local-input">
        <textarea
          v-model="user_send_message"
          @keydown.enter="send_message(user_send_message)"
        ></textarea>
        <div class="home-chat-local-input-out">
          <button class="home-chat-local-input-out-put" @click="send_message(user_send_message)">
            发送
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
textarea {
  all: unset;
  padding: 10px 10px 0 10px;
  white-space: pre-wrap; /* 允许自动换行 */
  word-wrap: break-word; /* 强制长单词换行 */
  overflow-wrap: break-word; /* 同上，更现代的写法 */
}
textarea::-webkit-scrollbar {
  display: none;
}
.icon {
  width: 18px;
  height: 18px;
}
.home-chat {
  background-color: gray;
  display: grid;
  grid-template-rows: 66px auto;
}
.home-chat-top {
  -webkit-app-region: drag;
  background-color: #f2f2f2;
  display: grid;
  grid-template-rows: 28px auto;
  box-sizing: border-box;
  border-bottom: 1px solid #c0c0c0;
}
.home-chat-top-button {
  display: grid;
  grid-template-columns: 28px 28px 28px;
  justify-content: end;
}
.home-chat-top-other {
  display: grid;
  align-items: center;
  width: fit-content;
}
.home-chat-top-other-user {
  box-sizing: border-box;
  -webkit-app-region: no-drag;
  margin-left: 10px;
  overflow: hidden;
  border-radius: 2px;
  padding: 1px;
  cursor: default;
}
.user-name {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 1px;
  box-sizing: border-box;
  padding: 3px 3px 3px 3px;
  border-radius: 3px;
}
.user-name:hover {
  background-color: #e9e9e9;
}
.home-chat-top-other-button {
  -webkit-app-region: no-drag;
}
.home-chat-local {
  background-color: #f2f2f2;
  display: grid;
  grid-template-rows: 1fr 208px;
}
.home-chat-local-body {
  box-sizing: border-box;
  max-height: calc(100vh - 66px - 208px);
  overflow-y: auto;
  padding: 5px 10px 0 10px;
}
.home-chat-local-body::-webkit-scrollbar {
  display: none;
}
.message {
  margin-bottom: 10px;
}
.user-message {
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  gap: 10px;
}

.friend-message {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 10px;
}
.user-message-text,
.friend-message-text {
  max-width: 70%;
  word-wrap: break-word;
  white-space: pre-wrap;
  padding: 5px;
  border-radius: 5px;
  box-sizing: border-box;
}

.user-message-text {
  background-color: #0099ff;
  color: white;
  text-align: right;
}
.friend-message-text {
  background-color: #ffffff;
  color: #2c2c2c;
  text-align: left;
}
.user-message-headshot {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0; /* 防止头像被压缩 */
}
img {
  width: 100%;
  height: 100%;
}
.user-message-headshot {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  overflow: hidden;
}
.home-chat-local-input {
  display: grid;
  grid-template-rows: auto 50px;
  background-color: #f2f2f2;
  box-sizing: border-box;
  border-top: 1px solid #c0c0c0;
}
.home-chat-local-input-out {
  display: grid;
  width: 100%;
  align-items: center;
  justify-content: end;
  background-color: #f2f2f2;
}
.home-chat-local-input-out-put {
  all: unset;
  margin-right: 20px;
  width: 95px;
  height: 26px;
  background-color: #0099ff;
  overflow: hidden;
  border-radius: 3px;
  line-height: 22px;
  text-align: center;
  font-size: 15px;
  color: #fff;
}
.home-chat-local-input-out-put:hover {
  background-color: #0093f5;
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
