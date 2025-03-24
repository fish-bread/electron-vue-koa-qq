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
import { ref, watch, onUnmounted, watchEffect, onMounted, nextTick } from 'vue'
import {
  heartbeatIntervalId,
  initWebSocket,
  userSearchHistory,
  ws,
  wsHeartbeat
} from '../../../axios/sendMessage'
import {
  UserFriendMiniBoxClick,
  MiniUserFriendBoxButton
} from '../../../function/boxclick/userFriendbox'
import UserFriendMiniBox from '../../../components/user/userFriendMiniBox.vue'
import { sendAudio, sendVideo, sendok } from '../../../function/webRTC'
// 当前选中的用户名
const selectedUserName = ref('')
// 当前选中的用户的聊天历史
const chatHistory = ref([])
const chatUserHeadshot = ref()
const chatUserFriendHeadshot = ref()
const chatUserName = ref()
const chatUserFriendName = ref()
// 绑定 .home-chat-local-body 的 DOM 元素
const chatBodyRef = ref(null)
// 监听 selectedUserUid 的变化
watch(
  selectedUserUid,
  async (newUid) => {
    try {
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
        chatUserName.value = history[0].user.user_name
        chatUserFriendName.value = history[0].user_friend.user_friend_name
        chatUserHeadshot.value = history[0].user.user_headshot
        chatUserFriendHeadshot.value = history[0].user_friend.user_friend_headshot
        console.log(chatHistory.value)
      } else {
        chatHistory.value = [] // 如果没有找到历史记录，清空历史
      }
    } catch (error) {
      console.log(error)
    }
  },
  { immediate: true }
) // immediate: true 表示立即执行一次
// 使用 watchEffect 监听 user_friend_history_one.value 的变化
watchEffect(
  () => {
    try {
      if (user_friend_history_one.value && user_friend_history_one.value.user_history) {
        // 查找对应的聊天历史
        const history = [user_friend_history_one.value]
        console.log('添加历史1', history)
        chatHistory.value = history[0].user_history
        chatUserName.value = history[0].user.user_name
        chatUserFriendName.value = history[0].user_friend.user_friend_name
        chatUserHeadshot.value = history[0].user.user_headshot
        chatUserFriendHeadshot.value = history[0].user_friend.user_friend_headshot
        console.log('聊天历史2', chatHistory.value)
      } else {
        chatHistory.value = [] // 如果没有历史记录，清空 chatHistory
      }
    } catch (error) {
      console.log(error)
    }
  },
  { deep: true }
)
watch(
  chatHistory,
  () => {
    try {
      nextTick(() => {
        console.log('执行')
        scrollToBottom()
      })
    } catch (error) {
      console.log(error)
    }
  },
  { deep: true, immediate: true }
)
// 滚动到底部的函数
const scrollToBottom = () => {
  if (chatBodyRef.value) {
    chatBodyRef.value.scrollTop = chatBodyRef.value.scrollHeight
  }
}

onMounted(() => {
  //ws请求
  initWebSocket()
  wsHeartbeat()
})
onUnmounted(() => {
  ws.close()
  console.log('WebSocket 连接已主动关闭')
  clearInterval(heartbeatIntervalId)
  console.log('ws心跳计时器已清除')
})
</script>

<template>
  <div class="home-chat">
    <div
      class="home-chat-top"
      :style="{
        'border-bottom': selectedUserUid !== null ? '1px solid #c0c0c0' : 'none'
      }"
    >
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
      <div class="home-chat-top-other">
        <!--单个用户-->
        <div v-show="selectedUserUid !== null" class="home-chat-top-other-user-name">
          <div class="home-chat-top-other-user">
            <div
              ref="MiniUserFriendBoxButton"
              class="user-name"
              @click.stop="UserFriendMiniBoxClick"
            >
              {{ selectedUserName }}
            </div>
          </div>
          <!--朋友mini盒子-->
          <user-friend-mini-box></user-friend-mini-box>
        </div>
        <!--右侧按钮-->
        <div v-show="selectedUserUid !== null" class="home-chat-top-other-button-all">
          <!--音频-->
          <button class="home-chat-top-other-button" title="语音通话" @click="sendAudio">
            <svg
              t="1742707680389"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="3403"
              width="200"
              height="200"
            >
              <path
                d="M866.133333 605.866667L768 554.666667c-21.333333-12.8-46.933333-12.8-68.266667 0l-89.6 42.666666c-21.333333-4.266667-68.266667-21.333333-110.933333-64s-59.733333-89.6-64-110.933333l46.933333-89.6c12.8-21.333333 8.533333-46.933333 0-68.266667L426.666667 170.666667c-12.8-25.6-38.4-38.4-64-38.4H256c-38.4 0-72.533333 17.066667-93.866667 46.933333-21.333333 29.866667-25.6 64-17.066666 98.133333 38.4 119.466667 110.933333 285.866667 217.6 392.533334 106.666667 106.666667 273.066667 179.2 392.533333 217.6 12.8 4.266667 25.6 4.266667 34.133333 4.266666 21.333333 0 42.666667-8.533333 64-21.333333 29.866667-21.333333 46.933333-55.466667 46.933334-93.866667v-106.666666c4.266667-25.6-12.8-51.2-34.133334-64z m-25.6 174.933333c0 17.066667-8.533333 29.866667-21.333333 42.666667-8.533333 4.266667-21.333333 12.8-42.666667 4.266666-93.866667-29.866667-264.533333-98.133333-366.933333-204.8-102.4-102.4-170.666667-273.066667-204.8-366.933333-8.533333-21.333333 0-34.133333 4.266667-42.666667 8.533333-12.8 25.6-21.333333 42.666666-21.333333h106.666667c4.266667 0 8.533333 0 8.533333 4.266667l51.2 93.866666V298.666667l-42.666666 106.666666c-4.266667 8.533333-4.266667 12.8-4.266667 21.333334 0 4.266667 17.066667 85.333333 85.333333 153.6s149.333333 85.333333 153.6 85.333333c8.533333 0 12.8 0 21.333334-4.266667l102.4-51.2h8.533333l93.866667 51.2c4.266667 0 4.266667 4.266667 4.266666 8.533334v110.933333z"
                p-id="3404"
              ></path>
            </svg>
          </button>
          <!--视频-->
          <button class="home-chat-top-other-button" title="视频通话" @click="sendVideo">
            <svg
              t="1742708500672"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="10143"
              width="200"
              height="200"
            >
              <path
                d="M602.224 891h-480.96C54.392 891 0 836.64 0 769.736v-515.44c0-66.872 54.392-121.304 121.264-121.304h480.96c66.864 0 121.296 54.424 121.296 121.304v88.312l253.032-146.104a31.76 31.76 0 0 1 31.632 0A31.632 31.632 0 0 1 1024 223.904v576.232a31.704 31.704 0 0 1-15.816 27.424 31.76 31.76 0 0 1-31.632 0L723.52 681.464v88.272c0 66.904-54.424 121.264-121.296 121.264z m-480.96-694.744c-32 0-58.008 26.04-58.008 58.04v515.44c0 32 26.008 58.008 58.008 58.008h480.96c32 0 58.04-26.008 58.04-58.008V626.664c0-11.304 6.024-21.752 15.816-27.432a31.744 31.744 0 0 1 31.624 0l253.04 146.104V278.688l-253.04 146.104a31.744 31.744 0 0 1-31.624 0 31.632 31.632 0 0 1-15.816-27.4V254.296c0-32-26.04-58.04-58.04-58.04h-480.96z"
                fill="#2c2c2c"
                p-id="10144"
              ></path>
            </svg>
          </button>
          <!--屏幕共享-->
          <button class="home-chat-top-other-button" title="屏幕共享" @click="sendok">
            <svg
              t="1742708552223"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="11282"
              width="200"
              height="200"
            >
              <path
                d="M889.6 127.488H141.696c-38.656 0-70.08 31.488-70.08 70.144v467.392c0 38.656 31.488 70.144 70.08 70.144h342.976v99.456H368.384c-18.688 0-33.792 13.888-33.792 30.976s15.104 30.976 33.792 30.976h294.592c18.688 0 33.792-13.888 33.792-30.976s-15.104-30.976-33.792-30.976H546.688v-99.456H889.6c38.656 0 70.144-31.424 70.144-70.144V197.568c0-38.592-31.424-70.08-70.144-70.08z m4.864 526.592a22.272 22.272 0 0 1-22.272 22.336H159.168a22.272 22.272 0 0 1-22.272-22.336V208.512c0-12.352 10.048-22.272 22.272-22.272h713.024c12.288 0 22.272 9.92 22.272 22.272V654.08zM566.976 313.984c-13.184-10.624-23.936-2.88-23.936 15.872v49.984h-2.176c-77.056 0-208.128 89.024-209.216 168.192 0 6.336 5.12 8.128 10.048 0 24.896-44.416 129.536-67.456 182.848-67.456h18.496v52.736c0 15.744 11.648 26.496 24.896 15.872l121.856-97.792c13.184-10.56 13.184-27.904 0-38.528l-122.816-98.88z"
                fill="#2c2c2c"
                p-id="11283"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
    <!--聊天历史-->
    <div v-show="selectedUserUid !== null" class="home-chat-local">
      <div ref="chatBodyRef" class="home-chat-local-body">
        <div v-for="(message, index) in chatHistory" :key="index" class="message">
          <div v-if="message.user_take" class="user-message">
            <!--消息-->
            <div class="message-all">
              <!-- 用户名字 -->
              <div class="message-name-user">{{ chatUserName }}</div>
              <!-- 用户消息内容 -->
              <div class="user-message-text">
                {{ message.user_take }}
              </div>
            </div>
            <!-- 用户头像 -->
            <div class="user-message-headshot">
              <img :src="chatUserHeadshot" alt="" />
            </div>
          </div>
          <div v-if="message.friend_user_take" class="friend-message">
            <!-- 好友头像 -->
            <div class="user-message-headshot">
              <img :src="chatUserFriendHeadshot" alt="" />
            </div>
            <!--消息-->
            <div class="message-all">
              <!-- 好友名字 -->
              <div class="message-name-friend-user">{{ chatUserFriendName }}</div>
              <!-- 好友消息内容 -->
              <div class="friend-message-text">{{ message.friend_user_take }}</div>
            </div>
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
            <div style="-webkit-user-select: none; -webkit-user-drag: none">发送</div>
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
.home-chat {
  position: relative;
  background-color: #f2f2f2;
  display: grid;
  grid-template-rows: 66px auto;
}
.home-chat-top {
  -webkit-app-region: drag;
  background-color: #f2f2f2;
  display: grid;
  grid-template-rows: 28px auto;
  box-sizing: border-box;
}
.home-chat-top-button {
  display: grid;
  grid-template-columns: 28px 28px 28px;
  justify-content: end;
}
.home-chat-top-button .icon {
  width: 18px;
  height: 18px;
}
.home-chat-top-other {
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
}
.home-chat-top-other-user-name {
  position: relative;
  display: grid;
  align-items: center;
  width: fit-content;
}
.home-chat-top-other-user {
  position: relative;
  box-sizing: border-box;
  -webkit-app-region: no-drag;
  margin-left: 10px;
  overflow: hidden;
  border-radius: 2px;
  padding: 1px;
  cursor: default;
}
.user-name {
  -webkit-user-select: none;
  -webkit-user-drag: none;
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
.home-chat-top-other-button-all {
  -webkit-app-region: no-drag;
  width: 248px;
  padding-right: 10px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
}
.home-chat-top-other-button {
  all: unset;
  display: grid;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  margin-right: 15px;
}
.home-chat-top-other-button .icon {
  width: 25px;
  height: 25px;
}
.home-chat-top-other-button .icon:hover path {
  fill: #0093f5 !important;
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
.message-all {
  display: flex; /* 使用 flex 布局 */
  flex-direction: column; /* 垂直排列子元素 */
  max-width: 80%; /* 限制盒子的最大宽度 */
  word-wrap: break-word; /* 允许长单词或 URL 换行 */
  white-space: normal; /* 保留空白符，但允许自动换行 */
  overflow-wrap: break-word; /* 更现代的换行方式，兼容性更好 */
}
.message-name-user {
  -webkit-user-select: none;
  -webkit-user-drag: none;
  font-size: 12px;
  text-align: right; /* 文本右对齐 */
  color: #666;
  margin-bottom: 4px; /* 与消息内容的间距 */
}
.message-name-friend-user {
  -webkit-user-select: none;
  -webkit-user-drag: none;
  font-size: 12px;
  text-align: left; /* 文本左对齐 */
  color: #666;
  margin-bottom: 4px; /* 与消息内容的间距 */
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
  padding: 5px;
  border-radius: 5px;
  box-sizing: border-box;
  display: flex;
}
.user-message-text {
  background-color: #0099ff;
  color: white;
  margin-left: auto; /* 将消息推到右侧 */
}
.friend-message-text {
  background-color: #ffffff;
  color: #2c2c2c;
  margin-right: auto; /* 将消息推到左侧 */
}
.user-message-headshot {
  -webkit-user-select: none;
  -webkit-user-drag: none;
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
