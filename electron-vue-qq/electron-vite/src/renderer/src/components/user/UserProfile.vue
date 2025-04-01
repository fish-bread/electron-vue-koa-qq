<script setup>
import { isUserProfile } from '../../function/UserProfile'
import { user, user_profile } from '../../function/user'
import { onMounted } from 'vue'
import {
  user_edit_profile,
  changeUserHeadshot,
  clickInputImage,
  handleFileUpload
} from '../../axios/user'
onMounted(() => {
  user_profile.value.user_name = user.value.user_name
  user_profile.value.user_headshot = user.value.user_headshot
  user_profile.value.user_personal_signature = user.value.user_personal_signature
  user_profile.value.user_gender = user.value.user_gender
  user_profile.value.user_birthday = user.value.user_birthday
  user_profile.value.user_country = user.value.user_country
  user_profile.value.user_region = user.value.user_region
  console.log('用户资料', user_profile.value)
})
</script>

<template>
  <div class="user-Profile">
    <div class="user-Profile-box">
      <!--头部按钮-->
      <div class="user-Profile-box-top">
        <div class="user-Profile-box-top-text">编辑资料</div>
        <button class="user-Profile-box-top-close-button" @click="isUserProfile = false">
          <svg
            t="1742388636219"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="3405"
            width="200"
            height="200"
          >
            <path
              d="M558.933333 512l320-320c12.8-12.8 12.8-34.133333 0-46.933333s-34.133333-12.8-46.933333 0L512 465.066667 192 149.333333c-12.8-12.8-34.133333-12.8-46.933333 0s-12.8 34.133333 0 46.933334l320 320-320 320c-12.8 12.8-12.8 34.133333 0 46.933333 4.266667 4.266667 12.8 8.533333 21.333333 8.533333s17.066667-4.266667 21.333333-8.533333l320-320 320 320c4.266667 4.266667 12.8 8.533333 21.333334 8.533333s17.066667-4.266667 21.333333-8.533333c12.8-12.8 12.8-34.133333 0-46.933333L558.933333 512z"
              p-id="3406"
            ></path>
          </svg>
        </button>
      </div>
      <!--中间修改-->
      <div class="user-Profile-box-center">
        <!--头像-->
        <div class="user-Profile-box-center-img" @click="clickInputImage">
          <div class="user-Profile-box-center-img-svg">
            <svg
              t="1742523455835"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="4738"
              width="200"
              height="200"
            >
              <path
                d="M512.525979 387.184273c-91.341335 0-165.656901 74.31045-165.656901 165.656901 0 91.341335 74.314543 165.656901 165.656901 165.656901s165.656901-74.314543 165.656901-165.656901C678.18288 461.494723 603.868337 387.184273 512.525979 387.184273L512.525979 387.184273zM512.525979 685.364443c-73.074296 0-132.523269-59.448974-132.523269-132.523269 0-73.075319 59.448974-132.527362 132.523269-132.527362s132.523269 59.452044 132.523269 132.527362C645.049249 625.915469 585.597205 685.364443 512.525979 685.364443L512.525979 685.364443zM512.525979 685.364443"
                fill="#272636"
                p-id="4739"
              ></path>
              <path
                d="M282.389532 381.457852l-60.621682 0c-13.377682 0-24.222681 10.840906-24.222681 24.214495 0 13.377682 10.840906 24.218588 24.222681 24.218588l60.625776 0c13.372565 0 24.218588-10.844999 24.218588-24.218588C306.60812 392.302851 295.766191 381.457852 282.389532 381.457852L282.389532 381.457852zM282.389532 381.457852"
                fill="#272636"
                p-id="4740"
              ></path>
              <path
                d="M828.570006 322.573743 672.27431 322.573743l-24.273846-94.374414c-3.325745-14.913665-16.836457-25.696242-32.299637-25.696242L409.332712 202.503087c-15.261589 0.004093-28.488845 10.331299-32.118512 24.988114l-24.435529 95.085612L196.478883 322.576813c-35.818787 0-64.962547 27.715225-64.962547 61.779042l0 380.038526c0 34.065863 29.143761 61.779042 64.962547 61.779042l632.091122 0c35.82288 0 64.962547-27.714202 64.962547-61.779042L893.532553 384.352785C893.536646 350.292038 864.392886 322.573743 828.570006 322.573743L828.570006 322.573743zM860.404038 764.390287c0 15.793708-14.281261 28.646434-31.829939 28.646434L196.478883 793.036721c-17.551748 0-31.828916-12.851703-31.828916-28.646434L164.649967 384.352785c0-15.793708 14.281261-28.646434 31.828916-28.646434l169.147398 0c7.560186 0 14.159488-5.117554 16.043395-12.441357l27.6702-107.629299 206.325136-0.236384c0.051165 0.248663 0.106424 0.497327 0.169869 0.74599l27.548426 107.123786c1.883907 7.319709 8.487302 12.437264 16.046464 12.437264l169.139212 0c17.552771 0 31.834033 12.851703 31.834033 28.646434L860.403015 764.390287 860.404038 764.390287zM860.404038 764.390287"
                fill="#272636"
                p-id="4741"
              ></path>
            </svg>
          </div>
          <img :src="user_profile.user_headshot" alt="" />
          <input
            ref="changeUserHeadshot"
            type="file"
            style="display: none"
            alt=""
            accept="image/*"
            @change="handleFileUpload"
          />
        </div>
        <!--昵称-->
        <div class="user-Profile-box-center-text">
          <div class="user-Profile-box-center-text-name">昵称</div>
          <input v-model="user_profile.user_name" maxlength="36" />
        </div>
        <!--个签-->
        <div class="user-Profile-box-center-text">
          <div class="user-Profile-box-center-text-name">个签</div>
          <input v-model="user_profile.user_personal_signature" maxlength="76" />
        </div>
        <!--性别-->
        <div class="user-Profile-box-center-text">
          <div class="user-Profile-box-center-text-name">性别</div>
          <input v-model="user_profile.user_gender" maxlength="2" />
        </div>
        <!--生日-->
        <div class="user-Profile-box-center-text">
          <div class="user-Profile-box-center-text-name">生日</div>
          <input v-model="user_profile.user_birthday" type="date" />
        </div>
        <!--国家-->
        <div class="user-Profile-box-center-text">
          <div class="user-Profile-box-center-text-name">国家</div>
          <input v-model="user_profile.user_country" disabled />
        </div>
        <!--地区-->
        <div class="user-Profile-box-center-text">
          <div class="user-Profile-box-center-text-name">地区</div>
          <input v-model="user_profile.user_region" />
        </div>
      </div>
      <!--底部确认-->
      <div class="user-Profile-box-bottom">
        <!--确认-->
        <button class="user-Profile-box-bottom-button blue" @click="user_edit_profile">保存</button>
        <!--取消-->
        <button class="user-Profile-box-bottom-button white" @click="isUserProfile = false">
          取消
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.user-Profile {
  background-color: rgba(60, 60, 60, 0.57);
  position: absolute;
  z-index: 7;
  width: 100%;
  height: 100%;
  display: grid;
  align-items: center;
  justify-content: center;
}
.user-Profile-box {
  width: 480px;
  height: 530px;
  background-color: #f2f2f2;
  border-radius: 7px;
  box-sizing: border-box;
  padding: 5px;
  display: grid;
  grid-template-rows: 24px auto 50px;
  justify-items: center;
}
.user-Profile-box-top {
  box-sizing: border-box;
  border-bottom: 1px solid #ebebeb;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
}
.user-Profile-box-top-close-button {
  all: unset;
  display: grid;
  align-items: center;
  justify-items: center;
  cursor: pointer;
}
.user-Profile-box-top-close-button .icon {
  width: 18px;
  height: 18px;
}
.user-Profile-box-top-text {
  box-sizing: border-box;
  margin-left: 200px;
  font-size: 13px;
  line-height: 24px;
  -webkit-user-select: none;
}
.user-Profile-box-center {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.user-Profile-box-center-img {
  margin-top: 20px;
  box-sizing: border-box;
  width: 80px;
  height: 80px;
  cursor: pointer;
  overflow: hidden;
}
.user-Profile-box-center-img-svg {
  position: absolute;
  z-index: 6;
  width: 80px;
  height: 80px;
  display: grid;
  align-items: center;
  justify-content: center;
  background-color: rgba(44, 44, 44, 0.58);
  border-radius: 50%;
}
.user-Profile-box-center-img-svg .icon {
  width: 40px;
  height: 40px;
}
.user-Profile-box-center-img-svg path {
  fill: white;
}
.user-Profile-box-center-img img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  overflow: hidden;
}
.user-Profile-box-center-text {
  margin-top: 18px;
  height: 38px;
  width: 436px;
  background-color: #ffffff;
  border-radius: 5px;
  box-sizing: border-box;
  padding: 5px 0 5px 5px;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.user-Profile-box-center-text input {
  all: unset;
  font-size: 14px;
  width: 100%;
}
.user-Profile-box-center-text-name {
  -webkit-user-select: none;
  width: 51px;
  font-size: 14px;
}
.user-Profile-box-bottom {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  box-sizing: border-box;
  width: 436px;
}
.user-Profile-box-bottom-button {
  all: unset;
  -webkit-user-select: none;
  box-sizing: border-box;
  width: 75px;
  height: 27px;
  border-radius: 3px;
  display: grid;
  align-items: center;
  justify-content: center;
  font-size: 14px;
}
.blue {
  background-color: #0099ff;
  color: #fff;
}
.blue:hover {
  background-color: #0093f5;
}
.white {
  margin-left: 10px;
  border: 1px solid #cecece;
}
.white:hover {
  background-color: #e9e9e9;
}
</style>
