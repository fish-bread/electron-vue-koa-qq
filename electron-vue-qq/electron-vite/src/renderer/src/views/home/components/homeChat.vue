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
  wsHeartbeat,
  file_name
} from '../../../axios/sendMessage'
import {
  UserFriendMiniBoxClick,
  MiniUserFriendBoxButton
} from '../../../function/boxclick/userFriendbox'
import UserFriendMiniBox from '../../../components/user/userFriendMiniBox.vue'
import { sendAudio, sendVideo, sendok } from '../../../function/webRTC'
import { chat_bubbles, accent_color } from '../../../function/colorPalette'
import { localInput, chatAudiofonc, ischatAudio } from '../../../components/chat/chataudio'
import ChatAudio from '../../../components/chat/chatAudio.vue'
import {
  chatImageFonc,
  chatImage,
  chooseImage,
  ischatImage
} from '../../../components/chat/chatImage'
import ChatImage from '../../../components/chat/chatImage.vue'
import {
  chatFileFonc,
  chooseFile,
  chatFile,
  ischatFile,
  formatFileSize,
  download_file, open_file_local
} from '../../../components/chat/chatFile'
import ChatFile from '../../../components/chat/chatFile.vue'
import { audioElements, toggleAudio, currentPlayingAudio, audioCanplay, audioDurations } from '../../../function/chat/chatAudio'
import { loadImage } from '../../../function/cacheImage'
// 获取显示的时长
const getDisplayDuration = (index) => {
  // 如果是当前播放的音频，显示剩余时间
  if (currentPlayingAudio.value.index === index) {
    return currentPlayingAudio.value.remaining
  }
  // 否则显示存储的总时长
  return audioDurations.value[index] || '--'
}
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
        // 使用 loadImage 处理用户头像和好友头像
        chatUserHeadshot.value = await loadImage(history[0].user.user_headshot)
        chatUserFriendHeadshot.value = await loadImage(history[0].user_friend.user_friend_headshot)

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
  async () => {
    try {
      if (user_friend_history_one.value && user_friend_history_one.value.user_history) {
        // 查找对应的聊天历史
        const history = [user_friend_history_one.value]
        console.log('添加历史1', history)
        chatHistory.value = history[0].user_history
        chatUserName.value = history[0].user.user_name
        chatUserFriendName.value = history[0].user_friend.user_friend_name
        // 使用 loadImage 处理用户头像和好友头像
        chatUserHeadshot.value = await loadImage(history[0].user.user_headshot)
        chatUserFriendHeadshot.value = await loadImage(history[0].user_friend.user_friend_headshot)

        console.log('图片',chatUserHeadshot.value, chatUserFriendHeadshot.value )
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
const getImageUrls = (userTake) => {
  if (Array.isArray(userTake)) {
    return userTake; // 已经是数组直接返回
  }
  if (typeof userTake === 'string') {
    return userTake.split('|'); // 字符串按分隔符拆分
  }
  return []; // 其他情况返回空数组
};
const activeDownloadIndex = ref(-1);
const toggleDownloadButton = (index) => {
  if (activeDownloadIndex.value === index) {
    activeDownloadIndex.value = -1; // 如果点击的是当前已激活的消息，则隐藏
  } else {
    activeDownloadIndex.value = index; // 否则显示当前消息的下载按钮
  }
}
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
          <button class="home-chat-top-other-button" title="语音通话(无法使用)" @click="sendAudio">
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
          <button class="home-chat-top-other-button" title="视频通话(无法使用)" @click="sendVideo">
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
          <button class="home-chat-top-other-button" title="屏幕共享(无法使用)" @click="sendok">
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
          <!--用户文本消息-->
          <div v-if="message.user_take && message.fileType === 'text'" class="user-message">
            <!--消息-->
            <div class="message-all">
              <!-- 用户名字 -->
              <div class="message-name-user">{{ chatUserName }}</div>
              <!-- 用户消息内容 -->
              <div class="user-message-text" data-menu-type="text" :style="{ backgroundColor: chat_bubbles }">
                {{ message.user_take }}
              </div>
            </div>
            <!-- 用户头像 -->
            <div class="user-message-headshot">
              <img :src="chatUserHeadshot" alt="" />
            </div>
          </div>
          <!--用户音频消息-->
          <div v-if="message.user_take && message.fileType === 'audio'" class="user-message">
            <!--消息-->
            <div class="message-all">
              <!-- 用户名字 -->
              <div class="message-name-user">{{ chatUserName }}</div>
              <!-- 用户消息内容 -->
              <audio
                :ref="(el) => { if (el) audioElements[index] = el }"
                :src="message.user_take"
                style="display: none"
                @canplay="(e) => audioCanplay(e, index)"
              ></audio>
              <div class="user-message-audio" :style="{ backgroundColor: chat_bubbles }">
                <!--音频开始按钮-->
                <div class="user-message-audio-svg" @click="toggleAudio(index)">
                  <svg v-if="currentPlayingAudio.index === index && currentPlayingAudio.isPlaying"t="1743246175906" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8981" width="200" height="200"><path d="M512 0C229.376 0 0 229.376 0 512s229.376 512 512 512 512-229.376 512-512S794.624 0 512 0z m-48.64 716.8H352.256V307.2h111.104v409.6z m204.8 0h-111.104V307.2h111.104v409.6z" p-id="8982" fill="#2c2c2c"></path></svg>
                  <svg  v-else  t="1743246103702" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8535" width="200" height="200"><path d="M511.81250029 62.29999971C263.58125029 62.29999971 62.28125 263.6 62.28125 511.81250029c0 248.21250029 201.30000029 449.49375 449.49375 449.49375 248.21250029 0 449.49375-201.28124971 449.49375-449.49375C961.28749971 263.6 760.00625 62.29999971 511.81250029 62.29999971z m157.29374971 462.86250029l-213.95625029 170.15625a17.15625 17.15625 0 0 1-27.82499942-13.46249971V341.63749971c0-14.36249971 16.57500029-22.29374971 27.82499942-13.46249971l213.84375029 170.15625c8.62499971 6.93749971 8.62499971 19.98749971 0.1125 26.81250029z" fill="#2c2c2c" p-id="8536"></path></svg>
                </div>
                <div class="audio-duration" style="-webkit-user-select: none;">
                  {{ getDisplayDuration(index) }}
                </div>
              </div>
            </div>
            <!-- 用户头像 -->
            <div class="user-message-headshot">
              <img :src="chatUserHeadshot" alt="" />
            </div>
          </div>
          <!--用户图片消息-->
          <div v-if="message.user_take && message.fileType === 'images'" class="user-message">
            <!--消息-->
            <div class="message-all">
              <!-- 用户名字 -->
              <div class="message-name-user">{{ chatUserName }}</div>
              <!-- 用户消息内容 -->
              <img
v-for="(img, index) in getImageUrls(message.user_take)"
                :key="index"
                   :src="img"
                class="user-message-img"
                :style="{ backgroundColor: chat_bubbles }"
                loading="lazy"
              ></img>
            </div>
            <!-- 用户头像 -->
            <div class="user-message-headshot">
              <img :src="chatUserHeadshot" alt="" />
            </div>
          </div>
          <!--用户视频消息-->
          <div v-if="message.user_take && message.fileType === 'video'" class="user-message">
            <!--消息-->
            <div class="message-all">
              <!-- 用户名字 -->
              <div class="message-name-user">{{ chatUserName }}</div>
              <!-- 用户消息内容 -->
              <video
                :src="message.user_take"
                class="user-message-img"
                :style="{ backgroundColor: chat_bubbles }"
                controls
              ></video>
            </div>
            <!-- 用户头像 -->
            <div class="user-message-headshot">
              <img :src="chatUserHeadshot" alt="" />
            </div>
          </div>
          <!--pdf-->
          <div v-if="message.user_take && message.fileType === 'pdf'"  class="user-message">
            <!--消息-->
            <div class="message-all">
              <!-- 用户名字 -->
              <div class="message-name-user">{{ chatUserName }}</div>
              <!-- 用户消息内容 -->
              <div class="file-view-box-mini" @click="toggleDownloadButton(index)" >
                <!--点击下载按钮-->
                <div v-show="activeDownloadIndex === index"  class="download_button" @click.stop="download_file(message.user_take)">
                  <svg t="1743238450807" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4604" width="200" height="200"><path d="M789.333333 618.666667c-12.8-12.8-34.133333-12.8-46.933333 0l-200.533333 200.533333V128c0-17.066667-12.8-34.133333-34.133334-34.133333s-29.866667 17.066667-29.866666 34.133333v691.2l-200.533334-200.533333c-12.8-12.8-34.133333-12.8-46.933333 0s-12.8 34.133333 0 46.933333l256 256c8.533333 8.533333 29.866667 12.8 42.666667 0l256-256c17.066667-17.066667 17.066667-34.133333 4.266666-46.933333z" p-id="4605"></path></svg>
                </div>
                <!--点击打开文件-->
                <div v-show="activeDownloadIndex === index"  class="open_file_button" @click.stop="">
                  <svg t="1743308430768" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3353" width="200" height="200"><path d="M874.666667 221.866667h-345.6l-98.133334-115.2c-8.533333-8.533333-17.066667-12.8-25.6-12.8h-256c-42.666667 0-72.533333 34.133333-72.533333 76.8v682.666666c0 42.666667 29.866667 76.8 76.8 76.8h725.333333c42.666667 0 76.8-29.866667 76.8-76.8V298.666667c-8.533333-42.666667-38.4-76.8-81.066666-76.8z m12.8 631.466666c0 8.533333-4.266667 8.533333-8.533334 8.533334h-725.333333c-8.533333 0-8.533333-4.266667-8.533333-8.533334V170.666667c0-8.533333 4.266667-8.533333 8.533333-8.533334h238.933333l98.133334 115.2c4.266667 8.533333 17.066667 12.8 25.6 12.8h362.666666c8.533333 0 8.533333 4.266667 8.533334 8.533334v554.666666z" p-id="3354"></path></svg>
                </div>
                <!--是否下载-->
                <div class="isDownload">{{ message.isdownload}}</div>
                <!--渲染文件-->
                <div class="file-view-box-mini-content">
                  <div class="file-view-box-mini-name">{{ file_name(message.user_take) }}</div>
                  <div class="file-view-box-mini-size">{{ formatFileSize(message.fileSize) }}</div>
                </div>
                <div class="file-view-box-mini-svg">
                  <svg
                    t="1743133041911"
                    class="icon"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="3057"
                    width="200"
                    height="200"
                  >
                    <path d="M748 183.5V0H96v1024h836V183.5z" fill="#FF5562" p-id="3058"></path>
                    <path d="M932 184H748V0" fill="#FF9292" p-id="3059"></path>
                    <path
                      d="M657.9 606.1c-29.4-1.9-57.4-12.9-79.9-31.3-44.2 9.4-86.3 22.9-128.4 39.6-33.5 57.4-64.8 86.6-91.8 86.6-5.4 0-11.9-1-16.2-4.2-11.3-5.1-18.5-16.1-18.3-28.2 0-9.4 2.1-35.5 104.7-78.2 23.3-41.3 42.4-84.6 57.2-129.4-12.9-25-41-86.6-21.6-117.9 6.5-11.5 19.4-17.7 33.5-16.7 11 0.1 21.4 5.1 28.1 13.6 14 18.8 12.9 58.4-5.4 116.8 17.3 31.3 39.9 59.5 66.9 83.5 22.7-4.2 45.3-7.3 68-7.3 50.7 1 58.3 24 57.2 37.5 0 35.6-35.7 35.6-54 35.6z m-302.2 64.6l3.2-1c15.1-5.2 27-15.6 35.6-29.2-16.2 6.3-29.1 16.6-38.8 30.2z m143.5-312.9H496c-1.1 0-3.3 0-4.3 1-4.3 17.7-1.1 36.5 6.5 53.2 6.2-17.5 6.6-36.5 1-54.2z m7.6 151.2l-1.1 2.1-1.1-1.1c-9.7 24-20.5 48-32.4 70.9l2.1-1v2.1c24-8.4 48.5-15.3 73.4-20.9l-1-1h3.3c-16.2-15.5-30.7-32.6-43.2-51.1z m146.8 55.3c-9.7 0-18.3 0-28 2.1 10.8 5.2 21.6 7.3 32.4 8.3 7.6 1 15.1 0 21.6-2.1-0.1-3-4.4-8.3-26-8.3z"
                      fill="#FFFFFF"
                      p-id="3060"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>
            <!-- 用户头像 -->
            <div class="user-message-headshot">
              <img :src="chatUserHeadshot" alt="" />
            </div>
          </div>
          <!--excel-->
          <div v-if="message.user_take && message.fileType === 'excel'" class="user-message">
            <!--消息-->
            <div class="message-all">
              <!-- 用户名字 -->
              <div class="message-name-user">{{ chatUserName }}</div>
              <!-- 用户消息内容 -->
              <div  class="file-view-box-mini" @click="toggleDownloadButton(index)">
                <!--点击下载按钮-->
                <div v-show="activeDownloadIndex === index"  class="download_button" @click.stop="download_file(message.user_take)">
                  <svg t="1743238450807" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4604" width="200" height="200"><path d="M789.333333 618.666667c-12.8-12.8-34.133333-12.8-46.933333 0l-200.533333 200.533333V128c0-17.066667-12.8-34.133333-34.133334-34.133333s-29.866667 17.066667-29.866666 34.133333v691.2l-200.533334-200.533333c-12.8-12.8-34.133333-12.8-46.933333 0s-12.8 34.133333 0 46.933333l256 256c8.533333 8.533333 29.866667 12.8 42.666667 0l256-256c17.066667-17.066667 17.066667-34.133333 4.266666-46.933333z" p-id="4605"></path></svg>
                </div>
                <!--点击打开文件-->
                <div v-show="activeDownloadIndex === index"  class="open_file_button" @click.stop="">
                  <svg t="1743308430768" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3353" width="200" height="200"><path d="M874.666667 221.866667h-345.6l-98.133334-115.2c-8.533333-8.533333-17.066667-12.8-25.6-12.8h-256c-42.666667 0-72.533333 34.133333-72.533333 76.8v682.666666c0 42.666667 29.866667 76.8 76.8 76.8h725.333333c42.666667 0 76.8-29.866667 76.8-76.8V298.666667c-8.533333-42.666667-38.4-76.8-81.066666-76.8z m12.8 631.466666c0 8.533333-4.266667 8.533333-8.533334 8.533334h-725.333333c-8.533333 0-8.533333-4.266667-8.533333-8.533334V170.666667c0-8.533333 4.266667-8.533333 8.533333-8.533334h238.933333l98.133334 115.2c4.266667 8.533333 17.066667 12.8 25.6 12.8h362.666666c8.533333 0 8.533333 4.266667 8.533334 8.533334v554.666666z" p-id="3354"></path></svg>
                </div>
                <!--是否下载-->
                <div class="isDownload">{{ message.isdownload }}</div>
                <!--渲染文件-->
                <div class="file-view-box-mini-content">
                  <div class="file-view-box-mini-name">{{ file_name(message.user_take) }}</div>
                  <div class="file-view-box-mini-size">{{ formatFileSize(message.fileSize) }}</div>
                </div>
                <div class="file-view-box-mini-svg">
                  <svg
                    t="1743133021478"
                    class="icon"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="2885"
                    width="200"
                    height="200"
                  >
                    <path d="M745 184.3V1H93v1022.5h836V184.3z" fill="#72DCA2" p-id="2886"></path>
                    <path d="M928.8 184h-184V0.8" fill="#A9FFCE" p-id="2887"></path>
                    <path
                      d="M500.8 476.2l76.6-131h67.7L532.5 537.9 445.7 686H378l122.8-209.8z m-0.7 70.3l-6.6-11-112.7-190.3h67.7L525 474.4l8.9 15.2L650.3 686h-67.7l-82.5-139.5z"
                      fill="#FCFCFC"
                      p-id="2888"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>
            <!-- 用户头像 -->
            <div class="user-message-headshot">
              <img :src="chatUserHeadshot" alt="" />
            </div>
          </div>
          <!--word-->
          <div v-if="message.user_take && message.fileType === 'word'" class="user-message">
            <!--消息-->
            <div class="message-all">
              <!-- 用户名字 -->
              <div class="message-name-user">{{ chatUserName }}</div>
              <!-- 用户消息内容 -->
              <div  class="file-view-box-mini"  @click="toggleDownloadButton(index)">
                <!--点击下载按钮-->
                <div v-show="activeDownloadIndex === index"  class="download_button" @click.stop="download_file(message.user_take)">
                  <svg t="1743238450807" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4604" width="200" height="200"><path d="M789.333333 618.666667c-12.8-12.8-34.133333-12.8-46.933333 0l-200.533333 200.533333V128c0-17.066667-12.8-34.133333-34.133334-34.133333s-29.866667 17.066667-29.866666 34.133333v691.2l-200.533334-200.533333c-12.8-12.8-34.133333-12.8-46.933333 0s-12.8 34.133333 0 46.933333l256 256c8.533333 8.533333 29.866667 12.8 42.666667 0l256-256c17.066667-17.066667 17.066667-34.133333 4.266666-46.933333z" p-id="4605"></path></svg>
                </div>
                <!--点击打开文件-->
                <div v-show="activeDownloadIndex === index"  class="open_file_button" @click.stop="">
                  <svg t="1743308430768" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3353" width="200" height="200"><path d="M874.666667 221.866667h-345.6l-98.133334-115.2c-8.533333-8.533333-17.066667-12.8-25.6-12.8h-256c-42.666667 0-72.533333 34.133333-72.533333 76.8v682.666666c0 42.666667 29.866667 76.8 76.8 76.8h725.333333c42.666667 0 76.8-29.866667 76.8-76.8V298.666667c-8.533333-42.666667-38.4-76.8-81.066666-76.8z m12.8 631.466666c0 8.533333-4.266667 8.533333-8.533334 8.533334h-725.333333c-8.533333 0-8.533333-4.266667-8.533333-8.533334V170.666667c0-8.533333 4.266667-8.533333 8.533333-8.533334h238.933333l98.133334 115.2c4.266667 8.533333 17.066667 12.8 25.6 12.8h362.666666c8.533333 0 8.533333 4.266667 8.533334 8.533334v554.666666z" p-id="3354"></path></svg>
                </div>
                <!--是否下载-->
                <div class="isDownload">{{ message.isdownload }}</div>
                <!--渲染文件-->
                <div class="file-view-box-mini-content">
                  <div class="file-view-box-mini-name">{{ file_name(message.user_take) }}</div>
                  <div class="file-view-box-mini-size">{{ formatFileSize(message.fileSize) }}</div>
                </div>
                <div class="file-view-box-mini-svg">
                  <svg
                    t="1743133008598"
                    class="icon"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="2713"
                    width="200"
                    height="200"
                  >
                    <path d="M745 186V3H93v1021h836V186z" fill="#6CA2FF" p-id="2714"></path>
                    <path d="M929 186H745V3" fill="#A2CBFC" p-id="2715"></path>
                    <path
                      d="M490.4 344.2H542l65.2 227.3L651 344.2h66.1L638.5 685H578l-60.5-238.1L454.3 685h-60.5l-78.5-340.8h66.1l43.8 227.3 65.2-227.3z"
                      fill="#FCFCFC"
                      p-id="2716"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>
            <!-- 用户头像 -->
            <div class="user-message-headshot">
              <img :src="chatUserHeadshot" alt="" />
            </div>
          </div>
          <!--html-->
          <div v-if="message.user_take && message.fileType === 'html'" class="user-message">
            <!--消息-->
            <div class="message-all">
              <!-- 用户名字 -->
              <div class="message-name-user">{{ chatUserName }}</div>
              <!-- 用户消息内容 -->
              <div class="file-view-box-mini" @click="toggleDownloadButton(index)">
                <!--点击下载按钮-->
                <div v-show="activeDownloadIndex === index"  class="download_button" @click.stop="download_file(message.user_take)">
                  <svg t="1743238450807" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4604" width="200" height="200"><path d="M789.333333 618.666667c-12.8-12.8-34.133333-12.8-46.933333 0l-200.533333 200.533333V128c0-17.066667-12.8-34.133333-34.133334-34.133333s-29.866667 17.066667-29.866666 34.133333v691.2l-200.533334-200.533333c-12.8-12.8-34.133333-12.8-46.933333 0s-12.8 34.133333 0 46.933333l256 256c8.533333 8.533333 29.866667 12.8 42.666667 0l256-256c17.066667-17.066667 17.066667-34.133333 4.266666-46.933333z" p-id="4605"></path></svg>
                </div>
                <!--点击打开文件-->
                <div v-show="activeDownloadIndex === index"  class="open_file_button" @click.stop="">
                  <svg t="1743308430768" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3353" width="200" height="200"><path d="M874.666667 221.866667h-345.6l-98.133334-115.2c-8.533333-8.533333-17.066667-12.8-25.6-12.8h-256c-42.666667 0-72.533333 34.133333-72.533333 76.8v682.666666c0 42.666667 29.866667 76.8 76.8 76.8h725.333333c42.666667 0 76.8-29.866667 76.8-76.8V298.666667c-8.533333-42.666667-38.4-76.8-81.066666-76.8z m12.8 631.466666c0 8.533333-4.266667 8.533333-8.533334 8.533334h-725.333333c-8.533333 0-8.533333-4.266667-8.533333-8.533334V170.666667c0-8.533333 4.266667-8.533333 8.533333-8.533334h238.933333l98.133334 115.2c4.266667 8.533333 17.066667 12.8 25.6 12.8h362.666666c8.533333 0 8.533333 4.266667 8.533334 8.533334v554.666666z" p-id="3354"></path></svg>
                </div>
                <!--是否下载-->
                <div class="isDownload">{{ message.isdownload }}</div>
                <!--渲染文件-->
                <div class="file-view-box-mini-content">
                  <div class="file-view-box-mini-name">{{ file_name(message.user_take) }}</div>
                  <div class="file-view-box-mini-size">{{ formatFileSize(message.fileSize) }}</div>
                </div>
                <div class="file-view-box-mini-svg">
                  <svg
                    t="1743133149852"
                    class="icon"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="3563"
                    width="200"
                    height="200"
                  >
                    <path d="M748 183.5V0H96v1024h836V183.5z" fill="#383838" p-id="3564"></path>
                    <path d="M932 184H748V0" fill="#6D6D6C" p-id="3565"></path>
                    <path
                      d="M432.7 412l-20-20c-2.9-2.9-7.1-2.9-10 0L291.5 503.3c-1.4 1.4-2.1 3.6-2.1 5s0.7 3.6 2.1 5l111.3 111.3c2.9 2.9 7.1 2.9 10 0l20-20c2.9-2.9 2.9-7.1 0-10L347.1 509l85.6-85.6c2.9-3.6 2.9-8.6 0-11.4z m304.6 91.3L626.7 392c-2.9-2.9-7.1-2.9-10 0l-20 20c-2.9 2.9-2.9 7.1 0 10l85.6 85.6-85.6 85.6c-2.9 2.9-2.9 7.1 0 10l20 20c2.9 2.9 7.1 2.9 10 0L738 511.9c1.4-1.4 2.1-3.6 2.1-5-0.6-0.7-1.3-2.2-2.8-3.6z m-169-156.9c-11.4-3.6-23.5 2.9-27.1 13.6l-92.7 284.6c-3.6 11.4 2.9 23.5 13.6 27.1 10.7 3.6 23.5-2.9 27.1-13.6l92.7-285.4c3.5-10.6-2.2-22.8-13.6-26.3z"
                      fill="#FFFFFF"
                      p-id="3566"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>
            <!-- 用户头像 -->
            <div class="user-message-headshot">
              <img :src="chatUserHeadshot" alt="" />
            </div>
          </div>
          <!--audios-->
          <div v-if="message.user_take && message.fileType === 'audios'" class="user-message">
            <!--消息-->
            <div class="message-all">
              <!-- 用户名字 -->
              <div class="message-name-user">{{ chatUserName }}</div>
              <!-- 用户消息内容 -->
              <div class="file-view-box-mini" @click="toggleDownloadButton(index)">
                <!--点击下载按钮-->
                <div v-show="activeDownloadIndex === index"  class="download_button" @click.stop="download_file(message.user_take,index)">
                  <svg t="1743238450807" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4604" width="200" height="200"><path d="M789.333333 618.666667c-12.8-12.8-34.133333-12.8-46.933333 0l-200.533333 200.533333V128c0-17.066667-12.8-34.133333-34.133334-34.133333s-29.866667 17.066667-29.866666 34.133333v691.2l-200.533334-200.533333c-12.8-12.8-34.133333-12.8-46.933333 0s-12.8 34.133333 0 46.933333l256 256c8.533333 8.533333 29.866667 12.8 42.666667 0l256-256c17.066667-17.066667 17.066667-34.133333 4.266666-46.933333z" p-id="4605"></path></svg>
                </div>
                <!--点击打开文件-->
                <div v-show="activeDownloadIndex === index"  class="open_file_button" @click.stop="open_file_local(index)">
                  <svg t="1743308430768" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3353" width="200" height="200"><path d="M874.666667 221.866667h-345.6l-98.133334-115.2c-8.533333-8.533333-17.066667-12.8-25.6-12.8h-256c-42.666667 0-72.533333 34.133333-72.533333 76.8v682.666666c0 42.666667 29.866667 76.8 76.8 76.8h725.333333c42.666667 0 76.8-29.866667 76.8-76.8V298.666667c-8.533333-42.666667-38.4-76.8-81.066666-76.8z m12.8 631.466666c0 8.533333-4.266667 8.533333-8.533334 8.533334h-725.333333c-8.533333 0-8.533333-4.266667-8.533333-8.533334V170.666667c0-8.533333 4.266667-8.533333 8.533333-8.533334h238.933333l98.133334 115.2c4.266667 8.533333 17.066667 12.8 25.6 12.8h362.666666c8.533333 0 8.533333 4.266667 8.533334 8.533334v554.666666z" p-id="3354"></path></svg>
                </div>
                <!--是否下载-->
                <div class="isDownload">{{ message.isdownload }}</div>
                <!--渲染文件-->
                <div class="file-view-box-mini-content">
                  <div class="file-view-box-mini-name">{{ file_name(message.user_take) }}</div>
                  <div class="file-view-box-mini-size">{{ formatFileSize(message.fileSize) }}</div>
                </div>
                <div class="file-view-box-mini-svg">
                  <svg
                    t="1743133093124"
                    class="icon"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="3393"
                    width="200"
                    height="200"
                  >
                    <path d="M748 183.5V0H96v1024h836V183.5z" fill="#FF6955" p-id="3394"></path>
                    <path d="M932 184H748V0" fill="#FFA694" p-id="3395"></path>
                    <path
                      d="M586.7 302.1c-5.3 7.5-34.2 20.3-58.7 25.6-31 6.4-47 11.7-63 20.3-21.3 12.8-33.1 28.8-31 43.8 1.1 3.2 26.7 40.6 56.6 83.2 31 42.7 56.6 79 57.6 80 1.1 2.1-3.2 2.1-18.1 1.1-47-3.2-89.6 21.3-108.9 59.8-5.3 11.7-6.4 18.1-6.4 32 0 32 17.1 57.6 49.1 72.6 12.8 5.3 17.1 6.4 43.8 6.4 28.8 0 29.9 0 49.1-9.6C608 692.8 629.4 644.7 608 601c-4.3-9.6-31-55.5-59.8-102.5L496 412h8.5c34.2-2.1 57.6-12.8 73.6-31 13.9-16 18.1-32 17.1-57.6-1-23.5-3.2-28.8-8.5-21.3z"
                      fill="#FFFFFF"
                      p-id="3396"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>
            <!-- 用户头像 -->
            <div class="user-message-headshot">
              <img :src="chatUserHeadshot" alt="" />
            </div>
          </div>
          <!--好友文本消息-->
          <div v-if="message.friend_user_take && message.fileType === 'text'" class="friend-message">
            <!-- 好友头像 -->
            <div class="user-message-headshot">
              <img :src="chatUserFriendHeadshot" alt="" />
            </div>
            <!--消息-->
            <div class="message-all">
              <!-- 好友名字 -->
              <div class="message-name-friend-user">{{ chatUserFriendName }}</div>
              <!-- 好友消息内容 -->
              <div class="friend-message-text" data-menu-type="text">{{ message.friend_user_take }}</div>
            </div>
          </div>
          <!--好友音频消息-->
          <div v-if="message.friend_user_take && message.fileType === 'audio'" class="friend-message">
            <!-- 好友头像 -->
            <div class="user-message-headshot">
              <img :src="chatUserFriendHeadshot" alt="" />
            </div>
            <!--消息-->
            <div class="message-all">
              <!-- 好友名字 -->
              <div class="message-name-friend-user">{{ chatUserFriendName }}</div>
              <!-- 好友消息内容 -->
              <audio :ref="(el) => { if (el) audioElements[index] = el }" :src="message.friend_user_take" style="display: none"></audio>
              <div :style="{ backgroundColor: chat_bubbles }" class="friend-message-audio" >
                <!--音频开始按钮-->
                <div class="user-message-audio-svg" @click="toggleAudio(index)">
                  <svg v-if="currentPlayingAudio.index === index && currentPlayingAudio.isPlaying"t="1743246175906" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8981" width="200" height="200"><path d="M512 0C229.376 0 0 229.376 0 512s229.376 512 512 512 512-229.376 512-512S794.624 0 512 0z m-48.64 716.8H352.256V307.2h111.104v409.6z m204.8 0h-111.104V307.2h111.104v409.6z" p-id="8982" fill="#2c2c2c"></path></svg>
                  <svg  v-else  t="1743246103702" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8535" width="200" height="200"><path d="M511.81250029 62.29999971C263.58125029 62.29999971 62.28125 263.6 62.28125 511.81250029c0 248.21250029 201.30000029 449.49375 449.49375 449.49375 248.21250029 0 449.49375-201.28124971 449.49375-449.49375C961.28749971 263.6 760.00625 62.29999971 511.81250029 62.29999971z m157.29374971 462.86250029l-213.95625029 170.15625a17.15625 17.15625 0 0 1-27.82499942-13.46249971V341.63749971c0-14.36249971 16.57500029-22.29374971 27.82499942-13.46249971l213.84375029 170.15625c8.62499971 6.93749971 8.62499971 19.98749971 0.1125 26.81250029z" fill="#2c2c2c" p-id="8536"></path></svg>
                </div>
                <div class="audio-duration" style="-webkit-user-select: none;">
                  {{ getDisplayDuration(index) }}
                </div>
              </div>
            </div>
          </div>
          <!--好友图片消息-->
          <div v-if="message.friend_user_take && message.fileType === 'images'" class="friend-message" >
            <!-- 好友头像 -->
            <div class="user-message-headshot">
              <img :src="chatUserFriendHeadshot" alt="" />
            </div>
            <!--消息-->
            <div class="message-all">
              <!-- 好友名字 -->
              <div class="message-name-friend-user">{{ chatUserFriendName }}</div>
              <!-- 好友消息内容 -->
              <img
v-for="(img, index) in getImageUrls(message.friend_user_take)"
                   :key="index"
                   :src="img"
                   class="friend-message-img"
                   :style="{ backgroundColor: chat_bubbles }"
loading="lazy"
              ></img>
            </div>
          </div>
          <!--好友视频消息-->
          <div v-if="message.friend_user_take && message.fileType === 'video'" class="friend-message" >
            <!-- 好友头像 -->
            <div class="user-message-headshot">
              <img :src="chatUserFriendHeadshot" alt="" />
            </div>
            <!--消息-->
            <div class="message-all">
              <!-- 好友名字 -->
              <div class="message-name-friend-user">{{ chatUserFriendName }}</div>
              <!-- 好友消息内容 -->
              <video
                :src="message.friend_user_take"
                class="friend-message-img"
                :style="{ backgroundColor: chat_bubbles }"
                controls
              ></video>
            </div>
          </div>
          <!--pdf-->
          <div v-if="message.friend_user_take && message.fileType === 'pdf'" class="friend-message" >
            <!-- 好友头像 -->
            <div class="user-message-headshot">
              <img :src="chatUserFriendHeadshot" alt="" />
            </div>
            <!--消息-->
            <div class="message-all">
              <!-- 好友名字 -->
              <div class="message-name-friend-user">{{ chatUserFriendName }}</div>
              <!-- 好友消息内容 -->
              <div class="file-view-box-mini-friend"  @click="toggleDownloadButton(index)" >
                <!--点击下载按钮-->
                <div v-show="activeDownloadIndex === index"  class="download_button_friend" @click.stop="download_file(message.friend_user_take)">
                  <svg t="1743238450807" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4604" width="200" height="200"><path d="M789.333333 618.666667c-12.8-12.8-34.133333-12.8-46.933333 0l-200.533333 200.533333V128c0-17.066667-12.8-34.133333-34.133334-34.133333s-29.866667 17.066667-29.866666 34.133333v691.2l-200.533334-200.533333c-12.8-12.8-34.133333-12.8-46.933333 0s-12.8 34.133333 0 46.933333l256 256c8.533333 8.533333 29.866667 12.8 42.666667 0l256-256c17.066667-17.066667 17.066667-34.133333 4.266666-46.933333z" p-id="4605"></path></svg>
                </div>
                <!--点击打开文件-->
                <div v-show="activeDownloadIndex === index"  class="open_file_friend_button" @click.stop="">
                  <svg t="1743308430768" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3353" width="200" height="200"><path d="M874.666667 221.866667h-345.6l-98.133334-115.2c-8.533333-8.533333-17.066667-12.8-25.6-12.8h-256c-42.666667 0-72.533333 34.133333-72.533333 76.8v682.666666c0 42.666667 29.866667 76.8 76.8 76.8h725.333333c42.666667 0 76.8-29.866667 76.8-76.8V298.666667c-8.533333-42.666667-38.4-76.8-81.066666-76.8z m12.8 631.466666c0 8.533333-4.266667 8.533333-8.533334 8.533334h-725.333333c-8.533333 0-8.533333-4.266667-8.533333-8.533334V170.666667c0-8.533333 4.266667-8.533333 8.533333-8.533334h238.933333l98.133334 115.2c4.266667 8.533333 17.066667 12.8 25.6 12.8h362.666666c8.533333 0 8.533333 4.266667 8.533334 8.533334v554.666666z" p-id="3354"></path></svg>
                </div>
                <!--是否下载-->
                <div class="isDownload">{{ message.isdownload }}</div>
                <!--渲染文件-->
                <div class="file-view-box-mini-content">
                  <div class="file-view-box-mini-name">{{ file_name(message.friend_user_take) }}</div>
                  <div class="file-view-box-mini-size">{{ formatFileSize(message.fileSize) }}</div>
                </div>
                <div class="file-view-box-mini-svg">
                  <svg
                    t="1743133041911"
                    class="icon"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="3057"
                    width="200"
                    height="200"
                  >
                    <path d="M748 183.5V0H96v1024h836V183.5z" fill="#FF5562" p-id="3058"></path>
                    <path d="M932 184H748V0" fill="#FF9292" p-id="3059"></path>
                    <path
                      d="M657.9 606.1c-29.4-1.9-57.4-12.9-79.9-31.3-44.2 9.4-86.3 22.9-128.4 39.6-33.5 57.4-64.8 86.6-91.8 86.6-5.4 0-11.9-1-16.2-4.2-11.3-5.1-18.5-16.1-18.3-28.2 0-9.4 2.1-35.5 104.7-78.2 23.3-41.3 42.4-84.6 57.2-129.4-12.9-25-41-86.6-21.6-117.9 6.5-11.5 19.4-17.7 33.5-16.7 11 0.1 21.4 5.1 28.1 13.6 14 18.8 12.9 58.4-5.4 116.8 17.3 31.3 39.9 59.5 66.9 83.5 22.7-4.2 45.3-7.3 68-7.3 50.7 1 58.3 24 57.2 37.5 0 35.6-35.7 35.6-54 35.6z m-302.2 64.6l3.2-1c15.1-5.2 27-15.6 35.6-29.2-16.2 6.3-29.1 16.6-38.8 30.2z m143.5-312.9H496c-1.1 0-3.3 0-4.3 1-4.3 17.7-1.1 36.5 6.5 53.2 6.2-17.5 6.6-36.5 1-54.2z m7.6 151.2l-1.1 2.1-1.1-1.1c-9.7 24-20.5 48-32.4 70.9l2.1-1v2.1c24-8.4 48.5-15.3 73.4-20.9l-1-1h3.3c-16.2-15.5-30.7-32.6-43.2-51.1z m146.8 55.3c-9.7 0-18.3 0-28 2.1 10.8 5.2 21.6 7.3 32.4 8.3 7.6 1 15.1 0 21.6-2.1-0.1-3-4.4-8.3-26-8.3z"
                      fill="#FFFFFF"
                      p-id="3060"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <!--excel-->
          <div v-if="message.friend_user_take && message.fileType === 'excel'" class="friend-message" >
            <!-- 好友头像 -->
            <div class="user-message-headshot">
              <img :src="chatUserFriendHeadshot" alt="" />
            </div>
            <!--消息-->
            <div class="message-all">
              <!-- 好友名字 -->
              <div class="message-name-friend-user">{{ chatUserFriendName }}</div>
              <!-- 好友消息内容 -->
              <div  class="file-view-box-mini-friend"  @click="toggleDownloadButton(index)" >
                <!--点击下载按钮-->
                <div v-show="activeDownloadIndex === index"  class="download_button_friend" @click.stop="download_file(message.friend_user_take)">
                  <svg t="1743238450807" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4604" width="200" height="200"><path d="M789.333333 618.666667c-12.8-12.8-34.133333-12.8-46.933333 0l-200.533333 200.533333V128c0-17.066667-12.8-34.133333-34.133334-34.133333s-29.866667 17.066667-29.866666 34.133333v691.2l-200.533334-200.533333c-12.8-12.8-34.133333-12.8-46.933333 0s-12.8 34.133333 0 46.933333l256 256c8.533333 8.533333 29.866667 12.8 42.666667 0l256-256c17.066667-17.066667 17.066667-34.133333 4.266666-46.933333z" p-id="4605"></path></svg>
                </div>
                <!--点击打开文件-->
                <div v-show="activeDownloadIndex === index"  class="open_file_friend_button" @click.stop="">
                  <svg t="1743308430768" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3353" width="200" height="200"><path d="M874.666667 221.866667h-345.6l-98.133334-115.2c-8.533333-8.533333-17.066667-12.8-25.6-12.8h-256c-42.666667 0-72.533333 34.133333-72.533333 76.8v682.666666c0 42.666667 29.866667 76.8 76.8 76.8h725.333333c42.666667 0 76.8-29.866667 76.8-76.8V298.666667c-8.533333-42.666667-38.4-76.8-81.066666-76.8z m12.8 631.466666c0 8.533333-4.266667 8.533333-8.533334 8.533334h-725.333333c-8.533333 0-8.533333-4.266667-8.533333-8.533334V170.666667c0-8.533333 4.266667-8.533333 8.533333-8.533334h238.933333l98.133334 115.2c4.266667 8.533333 17.066667 12.8 25.6 12.8h362.666666c8.533333 0 8.533333 4.266667 8.533334 8.533334v554.666666z" p-id="3354"></path></svg>
                </div>
                <!--是否下载-->
                <div class="isDownload">{{ message.isdownload }}</div>
                <!--渲染文件-->
                <div class="file-view-box-mini-content">
                  <div class="file-view-box-mini-name">{{ file_name(message.friend_user_take) }}</div>
                  <div class="file-view-box-mini-size">{{ formatFileSize(message.fileSize) }}</div>
                </div>
                <div class="file-view-box-mini-svg">
                  <svg
                    t="1743133021478"
                    class="icon"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="2885"
                    width="200"
                    height="200"
                  >
                    <path d="M745 184.3V1H93v1022.5h836V184.3z" fill="#72DCA2" p-id="2886"></path>
                    <path d="M928.8 184h-184V0.8" fill="#A9FFCE" p-id="2887"></path>
                    <path
                      d="M500.8 476.2l76.6-131h67.7L532.5 537.9 445.7 686H378l122.8-209.8z m-0.7 70.3l-6.6-11-112.7-190.3h67.7L525 474.4l8.9 15.2L650.3 686h-67.7l-82.5-139.5z"
                      fill="#FCFCFC"
                      p-id="2888"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <!--word-->
          <div v-if="message.friend_user_take && message.fileType === 'word'" class="friend-message" >
            <!-- 好友头像 -->
            <div class="user-message-headshot">
              <img :src="chatUserFriendHeadshot" alt="" />
            </div>
            <!--消息-->
            <div class="message-all">
              <!-- 好友名字 -->
              <div class="message-name-friend-user">{{ chatUserFriendName }}</div>
              <!-- 好友消息内容 -->
              <div  class="file-view-box-mini-friend"  @click="toggleDownloadButton(index)" >
                <!--点击下载按钮-->
                <div v-show="activeDownloadIndex === index"  class="download_button_friend" @click.stop="download_file(message.friend_user_take)">
                  <svg t="1743238450807" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4604" width="200" height="200"><path d="M789.333333 618.666667c-12.8-12.8-34.133333-12.8-46.933333 0l-200.533333 200.533333V128c0-17.066667-12.8-34.133333-34.133334-34.133333s-29.866667 17.066667-29.866666 34.133333v691.2l-200.533334-200.533333c-12.8-12.8-34.133333-12.8-46.933333 0s-12.8 34.133333 0 46.933333l256 256c8.533333 8.533333 29.866667 12.8 42.666667 0l256-256c17.066667-17.066667 17.066667-34.133333 4.266666-46.933333z" p-id="4605"></path></svg>
                </div>
                <!--点击打开文件-->
                <div v-show="activeDownloadIndex === index"  class="open_file_friend_button" @click.stop="">
                  <svg t="1743308430768" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3353" width="200" height="200"><path d="M874.666667 221.866667h-345.6l-98.133334-115.2c-8.533333-8.533333-17.066667-12.8-25.6-12.8h-256c-42.666667 0-72.533333 34.133333-72.533333 76.8v682.666666c0 42.666667 29.866667 76.8 76.8 76.8h725.333333c42.666667 0 76.8-29.866667 76.8-76.8V298.666667c-8.533333-42.666667-38.4-76.8-81.066666-76.8z m12.8 631.466666c0 8.533333-4.266667 8.533333-8.533334 8.533334h-725.333333c-8.533333 0-8.533333-4.266667-8.533333-8.533334V170.666667c0-8.533333 4.266667-8.533333 8.533333-8.533334h238.933333l98.133334 115.2c4.266667 8.533333 17.066667 12.8 25.6 12.8h362.666666c8.533333 0 8.533333 4.266667 8.533334 8.533334v554.666666z" p-id="3354"></path></svg>
                </div>
                <!--是否下载-->
                <div class="isDownload">{{ message.isdownload }}</div>
                <!--渲染文件-->
                <div class="file-view-box-mini-content">
                  <div class="file-view-box-mini-name">{{ file_name(message.friend_user_take) }}</div>
                  <div class="file-view-box-mini-size">{{ formatFileSize(message.fileSize) }}</div>
                </div>
                <div class="file-view-box-mini-svg">
                  <svg
                    t="1743133008598"
                    class="icon"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="2713"
                    width="200"
                    height="200"
                  >
                    <path d="M745 186V3H93v1021h836V186z" fill="#6CA2FF" p-id="2714"></path>
                    <path d="M929 186H745V3" fill="#A2CBFC" p-id="2715"></path>
                    <path
                      d="M490.4 344.2H542l65.2 227.3L651 344.2h66.1L638.5 685H578l-60.5-238.1L454.3 685h-60.5l-78.5-340.8h66.1l43.8 227.3 65.2-227.3z"
                      fill="#FCFCFC"
                      p-id="2716"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <!--html-->
          <div v-if="message.friend_user_take && message.fileType === 'html'" class="friend-message" >
            <!-- 好友头像 -->
            <div class="user-message-headshot">
              <img :src="chatUserFriendHeadshot" alt="" />
            </div>
            <!--消息-->
            <div class="message-all">
              <!-- 好友名字 -->
              <div class="message-name-friend-user">{{ chatUserFriendName }}</div>
              <!-- 好友消息内容 -->
              <div class="file-view-box-mini-friend" @click="toggleDownloadButton(index)">
                <!--点击下载按钮-->
                <div v-show="activeDownloadIndex === index"  class="download_button_friend" @click.stop="download_file(message.friend_user_take)">
                  <svg t="1743238450807" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4604" width="200" height="200"><path d="M789.333333 618.666667c-12.8-12.8-34.133333-12.8-46.933333 0l-200.533333 200.533333V128c0-17.066667-12.8-34.133333-34.133334-34.133333s-29.866667 17.066667-29.866666 34.133333v691.2l-200.533334-200.533333c-12.8-12.8-34.133333-12.8-46.933333 0s-12.8 34.133333 0 46.933333l256 256c8.533333 8.533333 29.866667 12.8 42.666667 0l256-256c17.066667-17.066667 17.066667-34.133333 4.266666-46.933333z" p-id="4605"></path></svg>
                </div>
                <!--点击打开文件-->
                <div v-show="activeDownloadIndex === index"  class="open_file_friend_button" @click.stop="">
                  <svg t="1743308430768" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3353" width="200" height="200"><path d="M874.666667 221.866667h-345.6l-98.133334-115.2c-8.533333-8.533333-17.066667-12.8-25.6-12.8h-256c-42.666667 0-72.533333 34.133333-72.533333 76.8v682.666666c0 42.666667 29.866667 76.8 76.8 76.8h725.333333c42.666667 0 76.8-29.866667 76.8-76.8V298.666667c-8.533333-42.666667-38.4-76.8-81.066666-76.8z m12.8 631.466666c0 8.533333-4.266667 8.533333-8.533334 8.533334h-725.333333c-8.533333 0-8.533333-4.266667-8.533333-8.533334V170.666667c0-8.533333 4.266667-8.533333 8.533333-8.533334h238.933333l98.133334 115.2c4.266667 8.533333 17.066667 12.8 25.6 12.8h362.666666c8.533333 0 8.533333 4.266667 8.533334 8.533334v554.666666z" p-id="3354"></path></svg>
                </div>
                <!--是否下载-->
                <div class="isDownload">{{ message.isdownload }}</div>
                <!--渲染文件-->
                <div class="file-view-box-mini-content">
                  <div class="file-view-box-mini-name">{{ file_name(message.friend_user_take) }}</div>
                  <div class="file-view-box-mini-size">{{ formatFileSize(message.fileSize) }}</div>
                </div>
                <div class="file-view-box-mini-svg">
                  <svg
                    t="1743133149852"
                    class="icon"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="3563"
                    width="200"
                    height="200"
                  >
                    <path d="M748 183.5V0H96v1024h836V183.5z" fill="#383838" p-id="3564"></path>
                    <path d="M932 184H748V0" fill="#6D6D6C" p-id="3565"></path>
                    <path
                      d="M432.7 412l-20-20c-2.9-2.9-7.1-2.9-10 0L291.5 503.3c-1.4 1.4-2.1 3.6-2.1 5s0.7 3.6 2.1 5l111.3 111.3c2.9 2.9 7.1 2.9 10 0l20-20c2.9-2.9 2.9-7.1 0-10L347.1 509l85.6-85.6c2.9-3.6 2.9-8.6 0-11.4z m304.6 91.3L626.7 392c-2.9-2.9-7.1-2.9-10 0l-20 20c-2.9 2.9-2.9 7.1 0 10l85.6 85.6-85.6 85.6c-2.9 2.9-2.9 7.1 0 10l20 20c2.9 2.9 7.1 2.9 10 0L738 511.9c1.4-1.4 2.1-3.6 2.1-5-0.6-0.7-1.3-2.2-2.8-3.6z m-169-156.9c-11.4-3.6-23.5 2.9-27.1 13.6l-92.7 284.6c-3.6 11.4 2.9 23.5 13.6 27.1 10.7 3.6 23.5-2.9 27.1-13.6l92.7-285.4c3.5-10.6-2.2-22.8-13.6-26.3z"
                      fill="#FFFFFF"
                      p-id="3566"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <!--audios-->
          <div v-if="message.friend_user_take && message.fileType === 'audios'" class="friend-message" >
            <!-- 好友头像 -->
            <div class="user-message-headshot">
              <img :src="chatUserFriendHeadshot" alt="" />
            </div>
            <!--消息-->
            <div class="message-all">
              <!-- 好友名字 -->
              <div class="message-name-friend-user">{{ chatUserFriendName }}</div>
              <!-- 好友消息内容 -->
              <div class="file-view-box-mini-friend" @click="toggleDownloadButton(index)">
                <!--点击下载按钮-->
                <div v-show="activeDownloadIndex === index"  class="download_button_friend" @click.stop="download_file(message.friend_user_take)">
                  <svg t="1743238450807" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4604" width="200" height="200"><path d="M789.333333 618.666667c-12.8-12.8-34.133333-12.8-46.933333 0l-200.533333 200.533333V128c0-17.066667-12.8-34.133333-34.133334-34.133333s-29.866667 17.066667-29.866666 34.133333v691.2l-200.533334-200.533333c-12.8-12.8-34.133333-12.8-46.933333 0s-12.8 34.133333 0 46.933333l256 256c8.533333 8.533333 29.866667 12.8 42.666667 0l256-256c17.066667-17.066667 17.066667-34.133333 4.266666-46.933333z" p-id="4605"></path></svg>
                </div>
                <!--点击打开文件-->
                <div v-show="activeDownloadIndex === index"  class="open_file_friend_button" @click.stop="">
                  <svg t="1743308430768" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3353" width="200" height="200"><path d="M874.666667 221.866667h-345.6l-98.133334-115.2c-8.533333-8.533333-17.066667-12.8-25.6-12.8h-256c-42.666667 0-72.533333 34.133333-72.533333 76.8v682.666666c0 42.666667 29.866667 76.8 76.8 76.8h725.333333c42.666667 0 76.8-29.866667 76.8-76.8V298.666667c-8.533333-42.666667-38.4-76.8-81.066666-76.8z m12.8 631.466666c0 8.533333-4.266667 8.533333-8.533334 8.533334h-725.333333c-8.533333 0-8.533333-4.266667-8.533333-8.533334V170.666667c0-8.533333 4.266667-8.533333 8.533333-8.533334h238.933333l98.133334 115.2c4.266667 8.533333 17.066667 12.8 25.6 12.8h362.666666c8.533333 0 8.533333 4.266667 8.533334 8.533334v554.666666z" p-id="3354"></path></svg>
                </div>
                <!--是否下载-->
                <div class="isDownload">{{ message.isdownload }}</div>
                <!--渲染文件-->
                <div class="file-view-box-mini-content">
                  <div class="file-view-box-mini-name">{{ file_name(message.friend_user_take) }}</div>
                  <div class="file-view-box-mini-size">{{ formatFileSize(message.fileSize) }}</div>
                </div>
                <div class="file-view-box-mini-svg">
                  <svg
                    t="1743133093124"
                    class="icon"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="3393"
                    width="200"
                    height="200"
                  >
                    <path d="M748 183.5V0H96v1024h836V183.5z" fill="#FF6955" p-id="3394"></path>
                    <path d="M932 184H748V0" fill="#FFA694" p-id="3395"></path>
                    <path
                      d="M586.7 302.1c-5.3 7.5-34.2 20.3-58.7 25.6-31 6.4-47 11.7-63 20.3-21.3 12.8-33.1 28.8-31 43.8 1.1 3.2 26.7 40.6 56.6 83.2 31 42.7 56.6 79 57.6 80 1.1 2.1-3.2 2.1-18.1 1.1-47-3.2-89.6 21.3-108.9 59.8-5.3 11.7-6.4 18.1-6.4 32 0 32 17.1 57.6 49.1 72.6 12.8 5.3 17.1 6.4 43.8 6.4 28.8 0 29.9 0 49.1-9.6C608 692.8 629.4 644.7 608 601c-4.3-9.6-31-55.5-59.8-102.5L496 412h8.5c34.2-2.1 57.6-12.8 73.6-31 13.9-16 18.1-32 17.1-57.6-1-23.5-3.2-28.8-8.5-21.3z"
                      fill="#FFFFFF"
                      p-id="3396"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--语音盒子-->
      <chat-audio v-show="ischatAudio === true"></chat-audio>
      <!--预览图片-->
      <chat-image v-show="ischatImage === true"></chat-image>
      <!--确认文件-->
      <chat-file v-show="ischatFile === true"></chat-file>
      <!--文本输入框-->
      <div
        v-show="ischatAudio === false && ischatImage === false && ischatFile === false"
        ref="localInput"
        class="home-chat-local-input"
      >
        <div class="home-chat-local-input-top">
          <!--表情-->
          <button class="home-chat-local-input-button">
            <svg
              t="1742956168835"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="4895"
              width="200"
              height="200"
            >
              <path
                d="M872.802928 755.99406 872.864326 755.99406 872.864326 755.624646Z"
                fill="#272536"
                p-id="4896"
              ></path>
              <path
                d="M807.273469 216.727043c-162.808016-162.836669-427.736874-162.836669-590.544891 0-162.836669 162.806993-162.836669 427.736874 0 590.543867 162.808016 162.837692 427.737898 162.837692 590.544891 0C970.110137 644.462894 970.110137 379.534036 807.273469 216.727043M764.893242 764.92036c-139.444912 139.443889-366.370225 139.414213-505.798764 0-139.459239-139.473565-139.459239-366.354875 0-505.827417 139.428539-139.429563 366.354875-139.460262 505.798764 0C904.336108 398.521482 904.336108 625.476471 764.893242 764.92036"
                fill="#231F20"
                p-id="4897"
              ></path>
              <path
                d="M381.724423 468.02137c24.783453 0 44.953841-20.169365 44.953841-44.967144 0-24.828478-20.170388-45.027519-44.953841-45.027519-24.842805 0-45.013193 20.199041-45.013193 45.027519C336.71123 447.852004 356.881618 468.02137 381.724423 468.02137"
                fill="#231F20"
                p-id="4898"
              ></path>
              <path
                d="M640.680243 468.095048c24.812105 0 45.010123-20.213367 45.010123-45.01217 0-24.827455-20.198018-44.99682-45.010123-44.99682-24.785499 0-44.953841 20.169365-44.953841 44.99682C595.726401 447.88168 615.894743 468.095048 640.680243 468.095048"
                fill="#231F20"
                p-id="4899"
              ></path>
              <path
                d="M642.245901 619.058294l-2.453888 0.798179c-40.310078 18.248619-83.548858 27.5341-128.411625 27.5341-46.343491 0-90.173742-9.375531-130.305765-27.799136l-2.425236-0.741897c-1.508353-0.413416-3.548826-1.003863-6.092765-1.003863-14.757099 0-26.734898 11.977799-26.734898 26.675546 0 6.978948 3.282766 13.988596 8.695033 19.253506l-0.325411 1.62501 6.831592 3.076058c47.911196 21.679765 100.021018 33.095769 150.681838 33.095769 51.608402 0 102.180194-11.120268 150.978597-33.361829 8.575306-4.703115 13.928221-13.721513 13.928221-23.511483C676.611593 627.458615 661.027663 613.290941 642.245901 619.058294"
                fill="#231F20"
                p-id="4900"
              ></path>
            </svg>
          </button>
          <!--文件-->
          <button class="home-chat-local-input-button" @click="chatFileFonc">
            <svg
              t="1743058027107"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="3235"
              width="200"
              height="200"
            >
              <path
                d="M874.666667 221.866667h-345.6l-98.133334-115.2c-8.533333-8.533333-17.066667-12.8-25.6-12.8h-256c-42.666667 0-72.533333 34.133333-72.533333 76.8v682.666666c0 42.666667 29.866667 76.8 76.8 76.8h725.333333c42.666667 0 76.8-29.866667 76.8-76.8V298.666667c-8.533333-42.666667-38.4-76.8-81.066666-76.8z m12.8 631.466666c0 8.533333-4.266667 8.533333-8.533334 8.533334h-725.333333c-8.533333 0-8.533333-4.266667-8.533333-8.533334V170.666667c0-8.533333 4.266667-8.533333 8.533333-8.533334h238.933333l98.133334 115.2c4.266667 8.533333 17.066667 12.8 25.6 12.8h362.666666c8.533333 0 8.533333 4.266667 8.533334 8.533334v554.666666z"
                p-id="3236"
              ></path>
            </svg>
            <input ref="chatFile" type="file" style="display: none" multiple @change="chooseFile" />
          </button>
          <!--图片-->
          <button class="home-chat-local-input-button" @click="chatImageFonc">
            <svg
              t="1742955465045"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="3235"
              width="200"
              height="200"
            >
              <path
                d="M874.666667 136.533333h-725.333334c-42.666667 0-72.533333 34.133333-72.533333 76.8v597.333334c0 42.666667 34.133333 76.8 76.8 76.8h725.333333c42.666667 0 76.8-34.133333 76.8-76.8V213.333333c-8.533333-42.666667-38.4-76.8-81.066666-76.8z m-725.333334 68.266667h725.333334c4.266667 0 8.533333 4.266667 8.533333 8.533333v448l-311.466667-238.933333c-12.8-8.533333-34.133333-8.533333-42.666666 4.266667l-106.666667 128L341.333333 486.4c-12.8-8.533333-29.866667-8.533333-42.666666 4.266667l-157.866667 157.866666V213.333333c-4.266667-4.266667 4.266667-8.533333 8.533333-8.533333zM887.466667 810.666667c0 4.266667-4.266667 8.533333-8.533334 8.533333h-725.333333c-4.266667 0-8.533333-4.266667-8.533333-8.533333v-72.533334L324.266667 554.666667l85.333333 68.266666c12.8 12.8 34.133333 8.533333 42.666667-4.266666l106.666666-128 324.266667 247.466666V810.666667z"
                p-id="3236"
              ></path>
              <path
                d="M307.2 418.133333c34.133333 0 64-29.866667 64-64s-25.6-64-64-64-59.733333 25.6-59.733333 59.733334 25.6 68.266667 59.733333 68.266666z m4.266667-68.266666V384v-34.133333c-4.266667 4.266667 0 0 0 0z"
                p-id="3237"
              ></path>
            </svg>
            <input
              ref="chatImage"
              type="file"
              accept="image/*"
              style="display: none"
              multiple
              @change="chooseImage"
            />
          </button>
          <!--语音-->
          <button class="home-chat-local-input-button" @click="chatAudiofonc">
            <svg
              t="1742956244740"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="4198"
              width="200"
              height="200"
            >
              <path
                d="M544 851.946667V906.666667a32 32 0 0 1-64 0v-54.72C294.688 835.733333 149.333333 680.170667 149.333333 490.666667v-21.333334a32 32 0 0 1 64 0v21.333334c0 164.949333 133.717333 298.666667 298.666667 298.666666s298.666667-133.717333 298.666667-298.666666v-21.333334a32 32 0 0 1 64 0v21.333334c0 189.514667-145.354667 345.066667-330.666667 361.28zM298.666667 298.56C298.666667 180.8 394.165333 85.333333 512 85.333333c117.781333 0 213.333333 95.541333 213.333333 213.226667v192.213333C725.333333 608.533333 629.834667 704 512 704c-117.781333 0-213.333333-95.541333-213.333333-213.226667V298.56z m64 0v192.213333C362.666667 573.12 429.557333 640 512 640c82.496 0 149.333333-66.805333 149.333333-149.226667V298.56C661.333333 216.213333 594.442667 149.333333 512 149.333333c-82.496 0-149.333333 66.805333-149.333333 149.226667z"
                fill="#000000"
                p-id="4199"
              ></path>
            </svg>
          </button>
        </div>
        <textarea
          v-model="user_send_message"
          data-menu-type="textarea"
          @keydown.enter="send_message(user_send_message)"
        ></textarea>
        <div class="home-chat-local-input-out">
          <button
            class="home-chat-local-input-out-put"
            :style="{ backgroundColor: accent_color }"
            @click="send_message(user_send_message)"
          >
            <div style="-webkit-user-select: none; -webkit-user-drag: none">发送</div>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.isDownload {
 position: absolute;
  font-size: 12px;
  top: 43px;
  left: 65px;
}
.audio-duration {
  font-size: 14px;
  color: inherit;
  min-width: 30px;
  text-align: center;
  font-family: monospace;
  font-weight: bold;
  display: grid;
  align-items: center;
  justify-items: center;
}
.download_button {
  position: absolute;
  background-color: rgba(255, 255, 255, 0.6);
  width: 18px;
  height: 18px;
  border-radius: 50%;
  display: grid;
  align-items: center;
  justify-content: center;
  justify-items: center;
  top: 45px;
  left: -25px;
  border: 1px solid #2c2c2c;
}
.download_button .icon,.download_button_friend  .icon {
  width: 90%;
  height: 90%;
}
.open_file_button {
  position: absolute;
  background-color: rgba(255, 255, 255, 0.6);
  width: 18px;
  height: 18px;
  border-radius: 50%;
  display: grid;
  align-items: center;
  justify-content: center;
  justify-items: center;
  top: 20px;
  left: -25px;
  border: 1px solid #2c2c2c;
}
.open_file_button .icon,.open_file_button  .icon {
  width: 90%;
  height: 90%;
}
.open_file_friend_button {
  position: absolute;
  background-color: rgba(255, 255, 255, 0.6);
  width: 18px;
  height: 18px;
  border-radius: 50%;
  display: grid;
  align-items: center;
  justify-content: center;
  justify-items: center;
  top: 20px;
  left: 155px;
  border: 1px solid #2c2c2c;
}
.download_button_friend {
  position: absolute;
  background-color: rgba(255, 255, 255, 0.6);
  width: 18px;
  height: 18px;
  border-radius: 50%;
  display: grid;
  align-items: center;
  justify-content: center;
  justify-items: center;
  top: 43px;
  left: 155px;
  border: 1px solid #2c2c2c;
}
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
  display: grid;
  grid-template-rows: 66px auto;
}
.home-chat-top {
  -webkit-app-region: drag;
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
  width: 20px;
  height: 20px;
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
  fill: v-bind(accent_color) !important;
}
.home-chat-local {
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
  position: relative;
  max-width: 70%;
  min-width: fit-content; /* 优先适应内容宽度 */
  padding: 5px;
  border-radius: 5px;
  box-sizing: border-box;
  display: inline-block; /* 改为 inline-block 避免 flex 的换行行为 */
  word-break: break-word; /* 允许长单词换行 */
  white-space: pre-wrap; /* 保留空格和换行，但允许自动换行 */
}
.user-message-img,
.friend-message-img {
  all: unset;
  position: relative;
  display: flex;
  flex-direction: column;
  width: 230px;
  height: auto;
  object-fit: contain;
  box-sizing: border-box;
  padding: 5px;
  border-radius: 5px;
}
.user-message-audio,.friend-message-audio {
  all: unset;
  position: relative;
  display: flex;
  flex-direction: row;
  width: 170px;
  height: auto;
  object-fit: contain;
  box-sizing: border-box;
  padding: 5px;
  border-radius: 5px;
}
.user-message-audio {
  background-color: #0099ff;
  color: white;
  margin-left: auto; /* 将消息推到右侧 */
}
.user-message-audio-svg {
  width: 30px;
  height: 30px;
}
.user-message-audio-svg .icon {
  width: 100%;
  height: 100%;
}
.user-message-audio-svg .icon path{
  fill: white;
}
.friend-message-audio {
  background-color: #ffffff;
  color: #2c2c2c;
  margin-right: auto; /* 将消息推到左侧 */
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
  grid-template-rows: 30px auto 50px;
  box-sizing: border-box;
  border-top: 1px solid #c0c0c0;
}
.home-chat-local-input-top {
  width: 100%;
  line-height: 30px;
  display: flex;
  flex-direction: row;
  box-sizing: border-box;
  padding-left: 10px;
  column-gap: 10px;
}
.home-chat-local-input-button {
  all: unset;
  -webkit-user-select: none;
  width: 30px;
  height: 30px;
  display: grid;
  align-items: center;
  justify-content: center;
}
.home-chat-local-input-button .icon {
  width: 25px;
  height: 25px;
}
.home-chat-local-input-button .icon:hover path {
  fill: v-bind(accent_color) !important;
}
.home-chat-local-input-out {
  display: grid;
  width: 100%;
  align-items: center;
  justify-content: end;
  height: 50px;
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
.file-view-box-mini {
  -webkit-user-select: none;
  position: relative;
  width: 150px;
  height: 60px;
  background-color: rgba(255, 255, 255, 0.6);
  border-radius: 5px;

  display: flex;
  flex-direction: row;
  gap: 8%;
  box-shadow:
    3px 3px 2px rgba(128, 128, 128, 0.4),
    -3px 3px 2px rgba(128, 128, 128, 0.4);
}
.file-view-box-mini-friend {
  -webkit-user-select: none;
  position: relative;
  width: 150px;
  height: 60px;
  background-color: rgba(255, 255, 255, 0.6);
  border-radius: 5px;
  display: flex;
  flex-direction: row;
  gap: 8%;
  box-shadow:
    3px 3px 2px rgba(128, 128, 128, 0.4),
    -3px 3px 2px rgba(128, 128, 128, 0.4);
}
.file-view-box-mini-name {
  text-overflow: ellipsis;
  overflow: hidden;
  width: 100%;
}
.file-view-box-mini-content {
  width: 70%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 13px;
  box-sizing: border-box;
  padding: 0 0 0 3px;
}
.file-view-box-mini-svg {
  width: 22%;
}
.file-view-box-mini-svg .icon {
  width: 100%;
  height: 100%;
}
</style>
