<!--suppress HtmlUnknownAttribute, HtmlDeprecatedAttribute -->
<script setup>
import { onMounted } from 'vue'
onMounted(async () => {
  await loginToken()
})
import {
  LoginUser,
  isArticle,
  article,
  is_login_togo,
  is_email,
  verification,
  email_verified,
  email_captcha,
  captcha,
  is_captcha,
  is_user_token
} from '../../function/loginUser'
import { close } from '../../function/Window/TopBorder'
import { watchEffect } from 'vue'
import { deleteUser, login_togo, loginToken } from '../../axios/login'
import { user } from '../../function/user'
watchEffect(() => {
  console.log(LoginUser.value.user_email)
  is_email.value = LoginUser.value.user_email !== ''
  console.log('邮箱', is_email.value)
})
watchEffect(() => {
  console.log(LoginUser.value, isArticle.value)
  is_login_togo.value = !(
    LoginUser.value.user_email === '' ||
    LoginUser.value.user_captcha === '' ||
    isArticle.value === false
  )
  console.log('登录', is_login_togo.value)
})
</script>

<template>
  <div class="page">
    <div class="page-box">
      <!--头部按钮-->
      <div class="page-box-button">
        <button class="red" @click="close()">
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
      <div v-if="is_user_token === false" class="page-box-not-user">
        <!--用户头像-->
        <div class="user-img">
          <img src="../../assets/headshot/2.jpg" alt="" />
        </div>
        <!--用户input-->
        <div class="user-box">
          <div class="user-input-box">
            <div class="user-input">
              <input v-model="LoginUser.user_email" placeholder="邮箱" maxlength="21" />
            </div>
            <div class="user-input-captcha">
              <input v-model="LoginUser.user_captcha" placeholder="验证码" maxlength="6" />
              <button
                :class="
                  is_email ? 'user-input-captcha-button' : 'user-input-captcha-button-disabled'
                "
                :style="is_email ? { cursor: 'default' } : { cursor: 'not-allowed' }"
                :disabled="is_captcha === true"
                @click="captcha"
              >
                {{ email_captcha }}
              </button>
            </div>
          </div>
          <!--条款确认-->
          <div class="user-article">
            <button class="user-article-button" :class="{ 'no-hover': isArticle }" @click="article">
              <svg
                v-show="isArticle"
                t="1741952186063"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="3403"
                width="200"
                height="200"
              >
                <path
                  d="M938.666667 213.333333c-12.8-12.8-34.133333-12.8-46.933334 0L358.4 742.4 128 516.266667c-12.8-12.8-34.133333-12.8-46.933333 0-12.8 12.8-12.8 34.133333 0 46.933333l256 247.466667c4.266667 4.266667 12.8 8.533333 21.333333 8.533333s17.066667 0 25.6-8.533333L938.666667 256c12.8-12.8 12.8-29.866667 0-42.666667z"
                  p-id="3404"
                ></path>
              </svg>
            </button>
            <div style="color: grey">已同意并阅读条款</div>
          </div>
          <!--登录-->
          <div class="user-login-in">
            <button
              :class="is_login_togo ? 'user-login-in-button' : 'user-login-in-button-disabled'"
              :style="is_login_togo ? { cursor: 'default' } : { cursor: 'not-allowed' }"
              :disabled="is_login_togo === false"
              @click="verification"
            >
              {{ email_verified }}
            </button>
          </div>
        </div>
        <!--其余操作-->
        <a class="user-bottom">更多功能</a>
      </div>
      <div v-else class="page-box-yes-user">
        <!--logo-->
        <div class="page-box-yes-user-logo">test</div>
        <!--用户-->
        <div class="page-box-yes-user-info">
          <!--用户头像-->
          <div class="page-box-yes-user-img">
            <img src="../../assets/headshot/2.jpg" alt="" />
          </div>
          <!--用户名字-->
          <div class="page-box-yes-user-name">
            <div>{{ user.user_name }}</div>
          </div>
        </div>
        <!--用户登录按钮-->
        <div class="page-box-yes-user-button">
          <button class="user-login-in-button" @click="login_togo">登录</button>
        </div>
        <!--退出登录-->
        <div class="page-box-yes-user-login-out">
          <button class="page-box-yes-user-login-out-button" @click="deleteUser">退出登录</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
img {
  width: 100%;
  height: 100%;
  -webkit-user-select: none;
  -webkit-user-drag: none;
}
.icon {
  width: 15px;
  height: 15px;
}
.page {
  box-sizing: border-box;
  width: 100vw;
  height: 100vh;
  display: grid;
  background-color: gray;
  justify-content: center;
  align-items: center;
}
.page-box {
  -webkit-app-region: drag;
  width: 322px;
  height: 446px;
  background-color: lightblue;
  display: grid;
  grid-template-rows: 27px auto;
  overflow: hidden;
}
.page-box-button {
  display: grid;
  justify-content: end;
}
.red {
  all: unset;
  width: 35px;
  height: 100%;
  -webkit-app-region: no-drag;
  display: grid;
  align-items: center;
  justify-content: center;
}
.red:hover {
  background-color: red;
}
.page-box-not-user {
  display: grid;
  grid-template-rows: 130px auto 60px;
  justify-items: center;
  -webkit-user-drag: none;
  -webkit-user-select: none;
}
.user-img {
  box-sizing: border-box;
  margin-top: 30px;
  -webkit-app-region: no-drag;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
}
.user-box {
  width: 270px;
  -webkit-app-region: no-drag;
  display: grid;
  grid-template-rows: 110px auto 80px;
}
.user-input-box {
  box-sizing: border-box;
  padding-top: 10px;
  height: 100%;
  display: grid;
  grid-template-rows: 43px 43px;
  grid-row-gap: 12px;
}
.user-input {
  border-radius: 7px;
  overflow: hidden;
}
.user-input-captcha {
  display: grid;
  grid-template-columns: 150px auto;
  grid-column-gap: 10px;
  border-radius: 7px;
  overflow: hidden;
}
.user-input-captcha-button {
  all: unset;
  box-sizing: border-box;
  background-color: #33a4ef;
  border-radius: 7px;
  text-align: center;
  line-height: 43px;
  color: #ffffff;
}
.user-input-captcha-button-disabled {
  all: unset;
  box-sizing: border-box;
  background-color: #add8ff;
  border-radius: 7px;
  text-align: center;
  line-height: 43px;
  color: #ffffff;
}
input {
  background-color: #fff !important;
  all: unset;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  text-align: center;
  border-radius: 7px;
}
.user-article {
  font-size: 12px;
  display: grid;
  grid-template-columns: 18px auto;
  align-items: center;
  grid-column-gap: 5px;
}
.user-article-button {
  all: unset;
  border-radius: 50%;
  overflow: hidden;
  width: 100%;
  height: 18px;
  border: 1px solid black;
  display: grid;
  align-items: center;
  justify-content: center;
}
.user-article-button:hover {
  background-color: #cfe8f5;
}
.no-hover:hover {
  background-color: inherit; /* 当 isArticle 为 true 时，取消 hover 样式 */
}
.user-login-in {
  box-sizing: border-box;
  padding-top: 13px;
}
.user-login-in-button {
  all: unset;
  box-sizing: border-box;
  width: 100%;
  height: 35px;
  background-color: #33a4ef;
  border-radius: 7px;
  display: grid;
  justify-content: center;
  align-items: center;
  color: #ffffff;
}
.user-login-in-button-disabled {
  all: unset;
  box-sizing: border-box;
  width: 100%;
  height: 35px;
  background-color: #add8ff;
  border-radius: 7px;
  display: grid;
  justify-content: center;
  align-items: center;
  color: #ffffff;
}
.user-login-in-button:hover,
.user-input-captcha-button:hover {
  background-color: #8ac2e6;
}

.user-bottom {
  all: unset;
  -webkit-app-region: no-drag;
  -webkit-user-drag: none;
  -webkit-user-select: none;
  width: 270px;
  display: grid;
  justify-items: center;
  align-items: center;
  font-size: 13px;
  color: grey;
  cursor: pointer;
}
.user-bottom:hover {
  text-decoration: underline;
}
.page-box-yes-user {
  display: grid;
  grid-template-rows: 50px 220px auto 60px;
  justify-items: center;
  -webkit-user-drag: none;
  -webkit-user-select: none;
}
.page-box-yes-user-logo {
  -webkit-user-drag: none;
  -webkit-user-select: none;
  -webkit-app-region: no-drag;
  font-size: 25px;
  display: grid;
  align-items: center;
  box-sizing: border-box;
  margin-top: 5px;
}
.page-box-yes-user-info {
  display: grid;
  justify-items: center;
  grid-template-rows: 160px auto;
  font-size: 18px;
}
.page-box-yes-user-img {
  -webkit-app-region: no-drag;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
  box-sizing: border-box;
  margin-top: 50px;
}
.page-box-yes-user-name {
  -webkit-app-region: no-drag;
  -webkit-user-drag: none;
  -webkit-user-select: none;
  cursor: default;
}
.page-box-yes-user-button {
  -webkit-app-region: no-drag;
  width: 270px;
  height: 35px;
  display: grid;
  align-items: center;
  box-sizing: border-box;
  margin-top: 10px;
}
.page-box-yes-user-login-out {
  display: grid;
  align-items: center;
}
.page-box-yes-user-login-out-button {
  all: unset;
  -webkit-app-region: no-drag;
  color: #33a4ef;
  box-sizing: border-box;
  padding: 5px 5px 5px 5px;
  border-radius: 7px;
}
.page-box-yes-user-login-out-button:hover {
  background-color: #8ac2e6;
}
</style>
