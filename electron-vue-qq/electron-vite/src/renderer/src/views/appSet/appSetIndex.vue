<script setup>
import { close, setFullScreen, shrink } from '../../function/Window/TopBorder'
import { moreBoxButtonText } from '../../function/boxclick/clickOut'
</script>

<template>
  <div class="app-set-box">
    <!--左侧-->
    <div class="app-set-box-left">
      <!--调色盘按钮-->
      <button class="app-set-box-left-button">
        <div class="app-set-box-left-button-svg">
          <svg
            t="1742370691609"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="3237"
            width="200"
            height="200"
          >
            <path
              d="M921.6 320l-140.8-209.066667c-4.266667-8.533333-17.066667-12.8-25.6-12.8H640c-17.066667 0-34.133333 12.8-34.133333 34.133334 0 51.2-42.666667 93.866667-93.866667 93.866666-51.2 0-93.866667-42.666667-93.866667-93.866666 0-17.066667-12.8-34.133333-34.133333-34.133334H268.8c-12.8-4.266667-21.333333 4.266667-29.866667 12.8L102.4 320c-8.533333 12.8-8.533333 29.866667 4.266667 42.666667l110.933333 93.866666V896c0 17.066667 12.8 34.133333 34.133333 34.133333h524.8c17.066667 0 34.133333-12.8 34.133334-34.133333V456.533333l110.933333-93.866666c8.533333-12.8 8.533333-29.866667 0-42.666667z m-170.666667 98.133333c-8.533333 4.266667-12.8 17.066667-12.8 25.6v422.4H281.6v-422.4c0-8.533333-4.266667-17.066667-12.8-25.6L170.666667 332.8l115.2-170.666667h72.533333c12.8 72.533333 81.066667 128 157.866667 128 76.8 0 140.8-55.466667 157.866666-128h72.533334l115.2 170.666667-110.933334 85.333333z"
              p-id="3238"
            ></path>
          </svg>
        </div>
        <div>{{ moreBoxButtonText[0].name }}</div>
      </button>
    </div>
    <!--右侧-->
    <div class="app-set-box-right">
      <!--右侧顶部-->
      <div class="app-set-box-right-top">
        <div class="app-set-box-right-top-button-all">
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
        <div class="app-set-box-right-top-title">
          <div class="top-title">超级调色盘</div>
        </div>
      </div>
      <!--右侧界面-->
    </div>
  </div>
</template>

<style scoped>
.app-set-box-left-button-svg {
  display: grid;
  align-items: center;
}
.app-set-box-left-button-svg .icon {
  width: 20px;
  height: 20px;
}
.app-set-box-left-button {
  all: unset;
  -webkit-app-region: no-drag;
  -webkit-user-select: none;
  width: 180px;
  height: 35px;
  line-height: 25px;
  cursor: default;
  box-sizing: border-box;
  padding-left: 5px;
  display: grid;
  grid-template-columns: 20px auto;
  grid-column-gap: 5px;
  border-radius: 7px;
  align-items: center;
  font-size: 14px;
}
.app-set-box-left-button:hover {
  background-color: #dcdee0;
}
.app-set-box {
  display: grid;
  grid-template-columns: 200px auto;
  height: 100vh;
  width: 100%;
}
.app-set-box-left {
  -webkit-app-region: drag;
  width: 200px;
  background-color: #cdcdcd;
  display: flex;
  flex-direction: row;
  box-sizing: border-box;
  padding-top: 30px;
  justify-content: center;
}
.app-set-box-right {
  background-color: lightpink;
  display: grid;
  grid-template-rows: 68px auto;
}
.app-set-box-right-top {
  -webkit-app-region: drag;
  display: grid;
  grid-template-rows: 30px auto;
  background-color: #f2f2f2;
  box-sizing: border-box;
  border-bottom: 1px solid #ebebeb;
}
.app-set-box-right-top-button-all {
  display: grid;
  grid-template-columns: 28px 28px 28px;
  justify-content: end;
}
.app-set-box-right-top-button-all .icon {
  width: 18px;
  height: 18px;
}
.app-set-box-right-top-title {
  font-size: 19px;
  display: grid;
  align-items: center;
}
.top-title {
  -webkit-user-select: none;
  display: grid;
  align-items: center;
  box-sizing: border-box;
  margin-left: 30px;
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
