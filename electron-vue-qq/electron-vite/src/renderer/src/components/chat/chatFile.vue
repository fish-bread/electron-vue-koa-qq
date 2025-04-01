<script setup>
import { exitFile, removeFile, selectedFiles, statusMessageFile } from './chatFile'
import { accent_color } from '../../function/colorPalette'
import { send_file } from '../../axios/sendMessage'
</script>

<template>
  <div class="file-view-page">
    <button @click="exitFile">返回</button>
    <!--预览文件-->
    <div class="file-view-box">
      <div v-for="(file, index) in selectedFiles" :key="index">
        <!--app-->
        <div v-if="file.fileType === 'application'" class="file-view-box-mini">
          <button class="file-view-box-mini-remove" @click="removeFile(index)">×</button>
          <div class="file-view-box-mini-content">
            <div class="file-view-box-mini-name">{{ file.fileName }}</div>
            <div class="file-view-box-mini-size">{{ file.fileSize }}</div>
          </div>
          <div class="file-view-box-mini-svg">
            <svg
              t="1743132944321"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="1456"
              width="200"
              height="200"
            >
              <path d="M740 185V2H88v1021h836V185z" fill="#707070" p-id="1457"></path>
              <path d="M923 185H739V1" fill="#707070" p-id="1458"></path>
            </svg>
          </div>
        </div>
        <!--image-->
        <div v-if="file.fileType === 'image'" class="file-view-box-mini">
          <button class="file-view-box-mini-remove" @click="removeFile(index)">×</button>
          <div class="file-view-box-mini-content">
            <div class="file-view-box-mini-name">{{ file.fileName }}</div>
            <div class="file-view-box-mini-size">{{ file.fileSize }}</div>
          </div>
          <div class="file-view-box-mini-svg">
            <svg
              t="1743132877304"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="1286"
              width="200"
              height="200"
            >
              <path d="M748 183.5V0H96v1024h836V183.5z" fill="#71CE52" p-id="1287"></path>
              <path d="M932 184H748V0" fill="#C1FF99" p-id="1288"></path>
              <path
                d="M314.1 460.9c17.5 9.9 38.9 9.8 56.3-0.4 17.4-10.2 28-28.8 27.9-48.9-0.2-31.1-25.6-56.1-56.7-55.9-31.2 0.1-56.2 25.5-56 56.7 0.1 20 11 38.5 28.5 48.5zM466.5 586.7l-74.9-78.8L280.7 666l470.3-3.1-144.2-228.2z"
                fill="#FFFFFF"
                p-id="1289"
              ></path>
            </svg>
          </div>
        </div>
        <!--video-->
        <div v-if="file.fileType === 'video'" class="file-view-box-mini">
          <button class="file-view-box-mini-remove" @click="removeFile(index)">×</button>
          <div class="file-view-box-mini-content">
            <div class="file-view-box-mini-name">{{ file.fileName }}</div>
            <div class="file-view-box-mini-size">{{ file.fileSize }}</div>
          </div>
          <div class="file-view-box-mini-svg">
            <svg
              t="1743132994145"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="2543"
              width="200"
              height="200"
            >
              <path d="M748 183.5V0H96v1024h836V183.5z" fill="#E657FF" p-id="2544"></path>
              <path d="M932 184H748V0" fill="#F797FF" p-id="2545"></path>
              <path
                d="M635.3 459.6l52.3-30.3c9.2-5.5 17.4-0.9 17.4 8.3v151.3c0 11-7.3 14.7-17.4 8.3l-52.3-30.3c-9.2-5.5-17.4-11.9-17.4-21.1v-66.9c0-8.3 8.3-13.8 17.4-19.3z m-82.5-56.8H356.7c-20.2 0-36.7 16.5-36.7 36.7v157.7c0 20.2 16.5 36.7 36.7 36.7h196.2c20.2 0 36.7-16.5 36.7-36.7V439.5c-0.1-20.2-16.6-36.7-36.8-36.7z m-118.2 88.9c-2.8 13.8-13.8 23.8-25.7 26.6-23.8 4.6-44-16.5-39.4-39.4 2.8-13.8 13.8-23.8 25.7-25.7 23.8-6.4 44 13.8 39.4 38.5z"
                fill="#FFFFFF"
                p-id="2546"
              ></path>
            </svg>
          </div>
        </div>
        <!--audio-->
        <div v-if="file.fileType === 'audio'" class="file-view-box-mini">
          <button class="file-view-box-mini-remove" @click="removeFile(index)">×</button>
          <div class="file-view-box-mini-content">
            <div class="file-view-box-mini-name">{{ file.fileName }}</div>
            <div class="file-view-box-mini-size">{{ file.fileSize }}</div>
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
        <!--pdf-->
        <div v-if="file.fileType === 'pdf'" class="file-view-box-mini">
          <button class="file-view-box-mini-remove" @click="removeFile(index)">×</button>
          <div class="file-view-box-mini-content">
            <div class="file-view-box-mini-name">{{ file.fileName }}</div>
            <div class="file-view-box-mini-size">{{ file.fileSize }}</div>
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
        <!--excel-->
        <div v-if="file.fileType === 'excel'" class="file-view-box-mini">
          <button class="file-view-box-mini-remove" @click="removeFile(index)">×</button>
          <div class="file-view-box-mini-content">
            <div class="file-view-box-mini-name">{{ file.fileName }}</div>
            <div class="file-view-box-mini-size">{{ file.fileSize }}</div>
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
        <!--word-->
        <div v-if="file.fileType === 'word'" class="file-view-box-mini">
          <button class="file-view-box-mini-remove" @click="removeFile(index)">×</button>
          <div class="file-view-box-mini-content">
            <div class="file-view-box-mini-name">{{ file.fileName }}</div>
            <div class="file-view-box-mini-size">{{ file.fileSize }}</div>
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
        <!--html-->
        <div v-if="file.fileType === 'html'" class="file-view-box-mini">
          <button class="file-view-box-mini-remove" @click="removeFile(index)">×</button>
          <div class="file-view-box-mini-content">
            <div class="file-view-box-mini-name">{{ file.fileName }}</div>
            <div class="file-view-box-mini-size">{{ file.fileSize }}</div>
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
    <!--发送按钮-->
    <div style="width: 100%; display: flex; justify-content: space-between">
      <span>{{ statusMessageFile }}</span>
      <button
        class="home-chat-local-input-out-put"
        :style="{ backgroundColor: accent_color }"
        @click="send_file"
      >
        <div style="-webkit-user-select: none; -webkit-user-drag: none">发送</div>
      </button>
    </div>
  </div>
</template>

<style scoped>
span {
  position: relative;
  font-size: 12px;
  color: #666;
  margin-top: 5px;
  text-align: right;
}
.file-view-page {
  position: relative;
  padding: 10px;
  border-top: 1px solid #c0c0c0;
  height: 100%;
  overflow: auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  box-sizing: border-box;
}
button {
  margin-bottom: 3px;
  padding: 8px 16px;
  background-color: v-bind(accent_color);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}
.file-view-box {
  -webkit-user-select: none;
  display: flex;
  gap: 10px;
  overflow-x: auto;
  padding-bottom: 5px;
  width: 100%;
  flex-wrap: wrap;
  height: 120px;
}
.file-view-box::-webkit-scrollbar {
  display: none;
}
.file-view-box-mini {
  position: relative;
  width: 150px;
  height: 60px;
  background-color: rgba(255, 255, 255, 0.6);
  border-radius: 5px;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  gap: 8%;
  box-shadow:
    3px 3px 2px rgba(128, 128, 128, 0.4),
    -3px 3px 2px rgba(128, 128, 128, 0.4);
}
.file-view-box-mini-remove {
  all: unset;
  position: absolute;
  top: 5px;
  right: 5px;
  width: 15px;
  height: 15px;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  display: grid;
  align-items: center;
  justify-content: center;
  line-height: 15px;
  z-index: 10;
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
</style>
