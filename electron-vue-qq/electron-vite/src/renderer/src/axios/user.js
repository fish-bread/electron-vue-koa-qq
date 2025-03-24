import { creatAxios, fileAxios } from './index'
import { user_profile, user, initialize_user } from '../function/user'
import { isUserHeadshot, isUserProfile } from '../function/UserProfile'
import { ref } from 'vue'
export const changeUserHeadshot = ref()
//更改用户资料
export const user_edit_profile = async () => {
  console.log('user_profile对象', user_profile.value)
  await creatAxios({
    method: 'post',
    url: '/user_edit_profile',
    data: {
      userUid: user.value.user_uid,
      userName: user_profile.value.user_name,
      userHeadshot: user_profile.value.user_headshot,
      userPersonalSignature: user_profile.value.user_personal_signature,
      userGender: user_profile.value.user_gender,
      userBirthday: user_profile.value.user_birthday,
      userCountry: user_profile.value.user_country,
      userRegion: user_profile.value.user_region
    }
  })
    .then(async (res) => {
      console.log('返回', res.data.message)
      console.log('是否成功', res.data.user)
      await window.api.localUser(res.data.user)
      await initialize_user()
      isUserProfile.value = false
    })
    .catch((err) => {
      console.log(err)
    })
}
//头像处理
// 用于存储预览图片的 URL
export const previewImageUrl = ref('')
export const clickInputImage = async () => {
  changeUserHeadshot.value.click()
}
export const handleFileUpload = async (event) => {
  const file = event.target.files[0]

  if (file) {
    // 验证文件类型
    if (!file.type.startsWith('image/')) {
      console.log('只能上传图片文件！')
      return
    }

    // 验证文件大小（可选）
    const maxSize = 2 * 1024 * 1024 // 2MB
    if (file.size > maxSize) {
      console.log('文件大小不能超过 2MB！')
      return
    }

    // 读取文件并更新头像
    const reader = new FileReader()
    reader.onload = (e) => {
      console.log('图片文件解析完成！')
      previewImageUrl.value = e.target.result // 将图片数据赋值给预览 URL
      isUserHeadshot.value = true
    }
    reader.readAsDataURL(file)
  }
}
//上传图片
export const sendImg = async (file) => {
  const formData = new FormData()
  formData.append('Headshot', file) // 确保字段名和后端一致
  formData.append('userUid', user.value.user_uid)
  await fileAxios({
    url: `/user/changeUserHeadshot`,
    method: 'post',
    data: formData
  })
    .then(async (res) => {
      console.log('成功', res)
      //重新渲染user
      await window.api.localUser(res.data.user)
      await initialize_user()
      isUserHeadshot.value = false
    })
    .catch((err) => {
      console.log('错误', err)
    })
}
