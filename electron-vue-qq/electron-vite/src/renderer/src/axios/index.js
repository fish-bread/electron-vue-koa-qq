import axios from 'axios'
import { user_token } from '../function/user'
//一般请求
export const creatAxios = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 5000,
  headers: {
    'content-type': 'application/json'
  }
})
//登录请求
export const loginAxios = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 5000,
  headers: {
    'content-type': 'application/json'
  }
})
//请求拦截器
creatAxios.interceptors.request.use(async (config) => {
  user_token.value = await window.api.searchToken()
  console.log('请求token', user_token.value)
  config.headers['Authorization'] = `Bearer ${user_token.value}`
  return config
})
//响应拦截器
creatAxios.interceptors.response.use(async (response) => {
  const status = response.status
  console.log('token代码', status)
  if (status === 200) {
    console.log('token有效')
  } else if (status === 401) {
    console.log('token无效')
    await window.api.sendLoginWindow()
  } else {
    console.log('其他报错')
  }
  return response
})
