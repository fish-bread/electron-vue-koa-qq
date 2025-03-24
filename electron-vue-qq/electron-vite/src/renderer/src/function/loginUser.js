import { ref } from 'vue'
import { loginEmailUser, sendEmailUser } from '../axios/login'
export const LoginUser = ref({
  user_email: '',
  user_captcha: ''
})
//样式验证
export const isArticle = ref(false)
export const is_login_togo = ref(false)
export const is_email = ref(false)
export const is_captcha = ref(false)
//按钮提示词
export const email_verified = ref('登录或验证')
export const email_captcha = ref('发送验证码')
//用户token是否有效
export const is_user_token = ref()
export const verification = async () => {
  console.log('登录', email_verified.value)
  email_verified.value = '验证中'
  is_login_togo.value = false
  await loginEmailUser()
}
export const captcha = async () => {
  console.log('captcha', is_email.value)
  await sendEmailUser()
}
export const article = () => {
  isArticle.value = isArticle.value === false
}
