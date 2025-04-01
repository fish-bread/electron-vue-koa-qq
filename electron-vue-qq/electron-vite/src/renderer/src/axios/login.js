import { loginAxios, creatAxios } from './index'
import {
  email_captcha,
  email_verified,
  is_captcha,
  is_email,
  is_user_token,
  LoginUser
} from '../function/loginUser'
import { initialize_user } from '../function/user'
//验证码
export const sendEmailUser = async () => {
  await loginAxios({
    method: 'POST',
    url: '/user_sendEmail',
    data: {
      to: LoginUser.value.user_email
    }
  })
    .then((res) => {
      email_captcha.value = '60秒后可重发'
      is_captcha.value = true

      let seconds = 60
      const interval = setInterval(() => {
        seconds--
        email_captcha.value = `${seconds}秒后可重发`

        if (seconds <= 0) {
          clearInterval(interval)
          email_captcha.value = '发送验证码'
          is_captcha.value = false
          console.log('验证码', is_email.value)
        }
      }, 1000)
      console.log(res)
    })
    .catch((err) => {
      console.log(err)
      email_captcha.value = '请求失败'
      LoginUser.value.user_email = ''
      is_captcha.value = false
    })
}
//邮箱
export const loginEmailUser = async () => {
  await loginAxios({
    method: 'POST',
    url: '/user_login_email',
    data: {
      user_email: LoginUser.value.user_email,
      user_captcha: LoginUser.value.user_captcha
    }
  })
    .then(async (res) => {
      console.log('验证', res.data)
      email_verified.value = '验证成功'
      await window.api.localUser(res.data.user)
      await window.api.localToken(res.data.user_token)
      await window.api.openHomeWindow()
    })
    .catch((err) => {
      console.log(err)
      email_verified.value = '验证失败'
      LoginUser.value.user_captcha = ''
    })
}
//请求tokens是否有效
export const loginToken = async () => {
  await creatAxios({
    method: 'POST',
    url: '/user_login_token'
  })
    .then(async (res) => {
      console.log('有效', res)
      //切换样式
      is_user_token.value = true
      await initialize_user()
    })
    .catch((err) => {
      console.log('无效', err)
      //切换样式
      is_user_token.value = false
    })
}
//登录
export const login_togo = async () => {
  await window.api.openHomeWindow()
}
//退出登录状态
export const deleteUser = async () => {
  await window.api.delete_User_Token().then(() => {
    is_user_token.value = false
  })
}
