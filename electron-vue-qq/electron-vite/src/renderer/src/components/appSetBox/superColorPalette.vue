<script setup>
import {
  accent_color,
  background_image,
  buttonImg,
  chat_background,
  chat_bubbles,
  chooseColor,
  colorButton,
  confirmColor,
  findMatchingButtonIndex,
  handleDefaultColor,
  handleImageUpload,
  ImgInput,
  selectedButtonIndex,
  userColorStyle
} from '../../function/colorPalette'
import { onMounted } from 'vue'
import {
  istoneColor,
  tone_background_image,
  tone_chat_background,
  tone_accent_color,
  tone_chat_bubbles,
  confirmToneColor
} from './toneColor'

onMounted(async () => {
  //加载样式
  await userColorStyle()
  //获取按钮位置
  const matchingIndex = findMatchingButtonIndex()
  if (matchingIndex !== -1) {
    selectedButtonIndex.value = matchingIndex
  } else {
    selectedButtonIndex.value = -1
  }
})
</script>

<template>
  <div v-show="istoneColor === false" class="super-color-palette">
    <!--头部预览-->
    <div class="super-color-palette-views">
      <!--预览-->
      <div
        class="super-color-palette-views-box"
        :style="{
          backgroundColor: chat_background,
          backgroundImage: background_image ? `url(${background_image})` : 'none',
          backgroundSize: 'cover'
        }"
      >
        <div class="super-color-palette-views-box-Sidebar">
          <div class="super-color-palette-views-box-Sidebar-button"></div>
          <div class="super-color-palette-views-box-Sidebar-button"></div>
          <div class="super-color-palette-views-box-Sidebar-button"></div>
        </div>
        <div class="super-color-palette-views-box-friendUser">
          <!--未选择样式-->
          <div class="super-color-palette-views-box-friendUser-click">
            <div class="super-color-palette-views-box-friendUser-img un-click-in"></div>
            <div class="super-color-palette-views-box-friendUser-title un-click-in"></div>
          </div>
          <!--选择样式-->
          <div
            class="super-color-palette-views-box-friendUser-click click"
            :style="{ backgroundColor: accent_color }"
          >
            <div class="super-color-palette-views-box-friendUser-img click-in"></div>
            <div class="super-color-palette-views-box-friendUser-title click-in"></div>
          </div>
        </div>
        <div class="super-color-palette-views-box-Chat">
          <!--用户发言-->
          <div class="super-color-palette-views-box-Chat-take user">
            <div
              class="super-color-palette-views-box-Chat-take-title user-take"
              :style="{ backgroundColor: chat_bubbles }"
            ></div>
            <div
              class="super-color-palette-views-box-Chat-take-img user-take"
              :style="{ backgroundColor: chat_bubbles }"
            ></div>
          </div>
          <!--对面发言-->
          <div class="super-color-palette-views-box-Chat-take friend">
            <div class="super-color-palette-views-box-Chat-take-img friend-take"></div>
            <div class="super-color-palette-views-box-Chat-take-title friend-take"></div>
          </div>
          <!--用户发言-->
          <div class="super-color-palette-views-box-Chat-take user">
            <div
              class="super-color-palette-views-box-Chat-take-title user-take"
              :style="{ backgroundColor: chat_bubbles }"
            ></div>
            <div
              class="super-color-palette-views-box-Chat-take-img user-take"
              :style="{ backgroundColor: chat_bubbles }"
            ></div>
          </div>
        </div>
      </div>
      <!--小功能-->
      <div class="super-color-palette-views-right-button-all">
        <!--恢复默认-->
        <button class="super-color-palette-views-right-button" @click="handleDefaultColor">
          <svg
            t="1742865223302"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="4419"
            width="200"
            height="200"
          >
            <path
              d="M523.377778 37.347556c-260.380444 0-471.466667 211.057778-471.466667 471.466666 0 260.380444 211.086222 471.438222 471.466667 471.438222s471.466667-211.057778 471.466666-471.466666c0-131.413333-54.101333-254.293333-147.797333-342.784A469.873778 469.873778 0 0 0 523.377778 37.319111z m0 68.266666a401.635556 401.635556 0 0 1 276.792889 110.023111 401.891556 401.891556 0 0 1 126.407111 293.148445c0 222.72-180.508444 403.2-403.2 403.2-222.691556 0-403.2-180.508444-403.2-403.171556 0-222.72 180.508444-403.228444 403.2-403.228444z"
              fill="#333333"
              p-id="4420"
            ></path>
            <path
              d="M193.109333 178.517333a34.133333 34.133333 0 0 1 45.511111-2.474666l2.759112 2.474666 612.266666 612.266667a34.133333 34.133333 0 0 1-45.511111 50.773333l-2.759111-2.474666L193.109333 226.816a34.133333 34.133333 0 0 1 0-48.298667z"
              fill="#333333"
              p-id="4421"
            ></path>
          </svg>
          <div>恢复默认</div>
        </button>
        <!--随心调-->
        <button class="super-color-palette-views-right-button" @click="istoneColor = true">
          <svg
            t="1742865548533"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="5732"
            width="200"
            height="200"
          >
            <path
              d="M314.88 626.133333l96.213333 94.933334a130.346667 130.346667 0 0 1-108.16 54.826666 104.32 104.32 0 0 1-73.386666-27.52 102.4 102.4 0 0 0 42.666666-26.88 110.933333 110.933333 0 0 0 25.386667-64v-2.346666a59.52 59.52 0 0 1 7.893333-26.88 31.146667 31.146667 0 0 1 10.026667-2.56m14.08-64c-64 0-85.333333 27.733333-95.146667 85.333333v2.773333c-2.986667 18.773333-5.12 25.386667-8.533333 29.013334a39.68 39.68 0 0 1-8.746667 7.04 33.493333 33.493333 0 0 1-18.133333 5.12 29.866667 29.866667 0 0 1-8.746667-1.066667h-1.92a29.013333 29.013333 0 0 0-10.24-1.92A27.946667 27.946667 0 0 0 149.333333 717.013333c8.96 81.28 78.72 122.88 153.386667 122.88A189.226667 189.226667 0 0 0 481.28 725.333333a27.946667 27.946667 0 0 0-6.4-30.293333l-126.293333-125.653333a28.16 28.16 0 0 0-19.626667-8.106667l0.64 0.426667zM808.32 234.666667H810.666667c0 10.453333-9.386667 49.066667-97.493334 158.72-15.36 18.986667-31.146667 37.76-47.146666 56.106666-31.146667 35.84-147.626667 157.44-147.626667 157.44l-80.853333-81.493333s117.12-114.346667 154.24-147.413333c19.84-17.493333 40.32-34.56 60.586666-50.986667 100.053333-80.426667 140.8-92.373333 155.946667-92.373333m0-64c-47.146667 0-111.786667 38.826667-196.053333 106.666666-21.333333 17.066667-42.666667 34.773333-62.72 52.906667-38.677333 34.133333-76.373333 69.269333-113.066667 105.386667-14.72 14.72-29.653333 29.653333-44.16 44.586666l-3.413333 3.626667a60.8 60.8 0 0 0 0 85.333333l85.333333 86.4c11.306667 11.306667 26.666667 17.706667 42.666667 17.706667a60.586667 60.586667 0 0 0 42.666666-17.706667l3.2-3.2 9.813334-9.813333 34.773333-35.413333c35.84-37.12 71.893333-76.16 105.386667-114.773334 16.64-18.986667 32.853333-38.4 48.64-58.026666 102.186667-126.08 142.72-208 89.173333-249.813334a66.56 66.56 0 0 0-42.666667-13.866666h0.426667z"
              p-id="5733"
            ></path>
          </svg>
          <div>随心调</div>
        </button>
        <!--上传图片-->
        <button class="super-color-palette-views-right-button" @click="buttonImg">
          <svg
            t="1742865580964"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="8172"
            width="200"
            height="200"
          >
            <path
              d="M938.666667 553.92V768c0 64.8-52.533333 117.333333-117.333334 117.333333H202.666667c-64.8 0-117.333333-52.533333-117.333334-117.333333V256c0-64.8 52.533333-117.333333 117.333334-117.333333h618.666666c64.8 0 117.333333 52.533333 117.333334 117.333333v297.92z m-64-74.624V256a53.333333 53.333333 0 0 0-53.333334-53.333333H202.666667a53.333333 53.333333 0 0 0-53.333334 53.333333v344.48A290.090667 290.090667 0 0 1 192 597.333333a286.88 286.88 0 0 1 183.296 65.845334C427.029333 528.384 556.906667 437.333333 704 437.333333c65.706667 0 126.997333 16.778667 170.666667 41.962667z m0 82.24c-5.333333-8.32-21.130667-21.653333-43.648-32.917333C796.768 511.488 753.045333 501.333333 704 501.333333c-121.770667 0-229.130667 76.266667-270.432 188.693334-2.730667 7.445333-7.402667 20.32-13.994667 38.581333-7.68 21.301333-34.453333 28.106667-51.370666 13.056-16.437333-14.634667-28.554667-25.066667-36.138667-31.146667A222.890667 222.890667 0 0 0 192 661.333333c-14.464 0-28.725333 1.365333-42.666667 4.053334V768a53.333333 53.333333 0 0 0 53.333334 53.333333h618.666666a53.333333 53.333333 0 0 0 53.333334-53.333333V561.525333zM320 480a96 96 0 1 1 0-192 96 96 0 0 1 0 192z m0-64a32 32 0 1 0 0-64 32 32 0 0 0 0 64z"
              fill="#000000"
              p-id="8173"
            ></path>
          </svg>
          <div>上传图片</div>
        </button>
        <input
          ref="ImgInput"
          type="file"
          style="display: none"
          accept="image/*"
          @change="handleImageUpload"
        />
      </div>
    </div>
    <!--颜色切换-->
    <div class="super-color-palette-choose">
      <button
        v-for="(color, index) in colorButton"
        :key="index"
        class="super-color-palette-choose-button"
        :style="{
          border: `3px solid ${selectedButtonIndex === index ? '#2b292b' : 'transparent'}`,
          backgroundColor: color.accent_color
        }"
        @click="chooseColor(color, index)"
      >
        {{ color.name }}
      </button>
    </div>
    <!--确定更改按钮-->
    <div class="super-color-palette-confirm">
      <button
        class="super-color-palette-confirm-button"
        :style="{ backgroundColor: chat_bubbles }"
        @click="confirmColor"
      >
        确认修改
      </button>
    </div>
  </div>
  <div v-show="istoneColor === true" class="super-color-style">
    <button
      class="super-color-palette-confirm-button"
      :style="{ backgroundColor: tone_accent_color }"
      @click="istoneColor = false"
    >
      返回
    </button>
    <!--预览-->
    <div
      class="super-color-palette-views-box"
      :style="{
        backgroundColor: tone_chat_background,
        backgroundImage: tone_background_image ? `url(${tone_background_image})` : 'none',
        backgroundSize: 'cover'
      }"
    >
      <div class="super-color-palette-views-box-Sidebar">
        <div class="super-color-palette-views-box-Sidebar-button"></div>
        <div class="super-color-palette-views-box-Sidebar-button"></div>
        <div class="super-color-palette-views-box-Sidebar-button"></div>
      </div>
      <div class="super-color-palette-views-box-friendUser">
        <!--未选择样式-->
        <div class="super-color-palette-views-box-friendUser-click">
          <div class="super-color-palette-views-box-friendUser-img un-click-in"></div>
          <div class="super-color-palette-views-box-friendUser-title un-click-in"></div>
        </div>
        <!--选择样式-->
        <div
          class="super-color-palette-views-box-friendUser-click click"
          :style="{ backgroundColor: tone_accent_color }"
        >
          <div class="super-color-palette-views-box-friendUser-img click-in"></div>
          <div class="super-color-palette-views-box-friendUser-title click-in"></div>
        </div>
      </div>
      <div class="super-color-palette-views-box-Chat">
        <!--用户发言-->
        <div class="super-color-palette-views-box-Chat-take user">
          <div
            class="super-color-palette-views-box-Chat-take-title user-take"
            :style="{ backgroundColor: tone_chat_bubbles }"
          ></div>
          <div
            class="super-color-palette-views-box-Chat-take-img user-take"
            :style="{ backgroundColor: tone_chat_bubbles }"
          ></div>
        </div>
        <!--对面发言-->
        <div class="super-color-palette-views-box-Chat-take friend">
          <div class="super-color-palette-views-box-Chat-take-img friend-take"></div>
          <div class="super-color-palette-views-box-Chat-take-title friend-take"></div>
        </div>
        <!--用户发言-->
        <div class="super-color-palette-views-box-Chat-take user">
          <div
            class="super-color-palette-views-box-Chat-take-title user-take"
            :style="{ backgroundColor: tone_chat_bubbles }"
          ></div>
          <div
            class="super-color-palette-views-box-Chat-take-img user-take"
            :style="{ backgroundColor: tone_chat_bubbles }"
          ></div>
        </div>
      </div>
    </div>
    <!--选择盒子-->
    <div class="super-color-palette-choose">
      <!--主题色-->
      <div class="super-color-style-box">
        <div>主题色</div>
        <input v-model="tone_accent_color" type="color" />
      </div>
      <!--对话颜色-->
      <div class="super-color-style-box">
        <div>对话色</div>
        <input v-model="tone_chat_bubbles" type="color" />
      </div>
      <!--背景色-->
      <div class="super-color-style-box">
        <div>背景色</div>
        <input v-model="tone_chat_background" type="color" />
      </div>
      <!--确定按钮-->
      <!--确定更改按钮-->
      <div class="super-color-palette-confirm">
        <button
          class="super-color-palette-confirm-button"
          :style="{ backgroundColor: tone_accent_color }"
          @click="confirmToneColor"
        >
          确认修改
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.super-color-style {
  display: flex;
  box-sizing: border-box;
  padding: 0 15px 0 15px;
  flex-direction: column;
  gap: 10px;
}
.back {
  width: 50px;
}
.super-color-palette {
  display: grid;
  grid-template-rows: 234px auto 60px;
  box-sizing: border-box;
  padding: 0 15px 0 15px;
}
.super-color-palette-views {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.super-color-palette-views-box {
  box-sizing: border-box;
  border-radius: 7px;
  background-color: #f2f2f2;
  width: 292px;
  height: 200px;
  display: grid;
  grid-template-columns: 28px 100px auto;
  overflow: hidden;
}
.super-color-palette-views-right-button-all {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  margin-left: 20px;
  margin-top: 100px;
}
.super-color-palette-views-right-button {
  all: unset;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: #ffffff;
  border-radius: 3px;
  font-size: 13px;
  margin-bottom: 20px;
  overflow: hidden;
  padding: 0 3px 0 3px;
}
.super-color-palette-views-right-button:hover {
  background-color: #dcdee0;
}
.super-color-palette-views-right-button .icon {
  width: 25px;
  height: 25px;
}
.super-color-palette-views-box-Sidebar {
  background-color: rgba(225, 225, 225, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
}
.super-color-palette-views-box-Sidebar-button {
  box-sizing: border-box;
  background-color: #c2c2c2;
  width: 15px;
  height: 15px;
  border-radius: 5px;
  margin-top: 12px;
}
.super-color-palette-views-box-friendUser {
  background-color: rgba(225, 225, 225, 0.3);
  box-sizing: border-box;
  padding-top: 10px;
}
.super-color-palette-views-box-friendUser-click {
  height: 31px;
  display: grid;
  grid-template-columns: 20px auto;
  align-items: center;
  box-sizing: border-box;
  grid-column-gap: 5px;
  padding-left: 5px;
  padding-right: 5px;
}
.click {
  background-color: #0099ff;
}
.un-click-in {
  background-color: #cccccc;
}
.click-in {
  background-color: #ffffff;
}
.super-color-palette-views-box-friendUser-img {
  height: 20px;
  border-radius: 50%;
}
.super-color-palette-views-box-friendUser-title {
  width: 100%;
  height: 7px;
  border-radius: 2px;
  box-sizing: border-box;
  margin-bottom: 7px;
}
.super-color-palette-views-box-Chat {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding-top: 19px;
}
.super-color-palette-views-box-Chat-take {
  height: 15px;
  margin-bottom: 5px;
  box-sizing: border-box;
}
.user {
  display: grid;
  margin-left: auto;
  grid-template-columns: auto 15px;
  grid-column-gap: 5px;
  padding-right: 9px;
}
.friend {
  display: grid;
  margin-right: auto;
  grid-template-columns: 15px auto;
  grid-column-gap: 5px;
  padding-left: 9px;
}
.super-color-palette-views-box-Chat-take-img {
  width: 15px;
  height: 15px;
  border-radius: 50%;
}
.super-color-palette-views-box-Chat-take-title {
  height: 15px;
  width: 50px;
  border-radius: 5px;
}
.user-take {
  background-color: #0099ff;
}
.friend-take {
  background-color: #ffffff;
}
.super-color-palette-choose {
  background-color: #fff;
  border-radius: 7px;
  box-sizing: border-box;
  padding: 10px;
  display: flex;
  flex-direction: row;
  row-gap: 5px;
  column-gap: 10px;
  flex-flow: wrap;
  align-content: flex-start;
  overflow: auto;
  height: 418px;
}
.super-color-palette-choose::-webkit-scrollbar {
  display: none;
}
.super-color-palette-choose-button {
  all: unset;
  -webkit-user-select: none;
  width: 110px;
  height: 70px;
  border-radius: 7px;
  display: grid;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  color: white;
  box-sizing: border-box;
  border: 3px solid;
}
.super-color-palette-confirm {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.super-color-palette-confirm-button {
  all: unset;
  -webkit-user-select: none;
  width: 70px;
  height: 30px;
  border-radius: 5px;
  box-sizing: border-box;
  color: white;
  font-size: 13px;
  display: grid;
  align-items: center;
  justify-content: center;
}
</style>
