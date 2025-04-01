import { ref } from 'vue'
import { user_friend_history_one } from '../../function/user'
export const ischatFile = ref(false)
export const chatFile = ref()
// 存储已选择的文件列表
export const selectedFiles = ref([])
export const statusMessageFile = ref('文件准备就绪')
//选择文件
export const chatFileFonc = () => {
  chatFile.value.click()
}
//确认文件
export const chooseFile = (event) => {
  ischatFile.value = true
  const files = event.target.files
  for (let i = 0; i < files.length; i++) {
    const file = files[i]
    const extension = file.name.split('.').pop().toLowerCase()

    if (file.type.startsWith('image/')) {
      console.log(`文件 ${file.name} 是图片类型！`)
      selectedFiles.value.push({
        fileType: 'image',
        file: file,
        fileSize: formatFileSize(file.size),
        fileName: file.name
      })
      console.log('name', file.name)
    } else if (file.type.startsWith('video/')) {
      console.log(`文件 ${file.name} 是视频类型！`)
      selectedFiles.value.push({
        fileType: 'video',
        file: file,
        fileSize: formatFileSize(file.size),
        fileName: file.name
      })
    } else if (file.type.startsWith('audio/')) {
      console.log(`文件 ${file.name} 是音频类型！`)
      selectedFiles.value.push({
        fileType: 'audio',
        file: file,
        fileSize: formatFileSize(file.size),
        fileName: file.name
      })
    } else if (file.type === 'application/pdf') {
      console.log(`文件 ${file.name} 是pdf类型！`)
      selectedFiles.value.push({
        fileType: 'pdf',
        file: file,
        fileSize: formatFileSize(file.size),
        fileName: file.name
      })
    } else if (
      file.type.startsWith('application/') &&
      (['xls', 'xlsx', 'csv'].includes(extension) ||
        file.type === 'application/vnd.ms-excel' ||
        file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
    ) {
      console.log(`文件 ${file.name} 是excel类型！`)
      selectedFiles.value.push({
        fileType: 'excel',
        file: file,
        fileSize: formatFileSize(file.size),
        fileName: file.name
      })
    } else if (file.type.startsWith('text/html')) {
      console.log(`文件 ${file.name} 是html类型！`)
      selectedFiles.value.push({
        fileType: 'html',
        file: file,
        fileSize: formatFileSize(file.size),
        fileName: file.name
      })
    } else if (
      file.type.startsWith('application/') &&
      (['doc', 'docx'].includes(extension) ||
        file.type === 'application/msword' ||
        file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')
    ) {
      console.log(`文件 ${file.name} 是word类型！`)
      selectedFiles.value.push({
        fileType: 'word',
        file: file,
        fileSize: formatFileSize(file.size),
        fileName: file.name
      })
    } else {
      console.log(`文件 ${file.name} 是其他类型！`)
      selectedFiles.value.push({
        fileType: 'application',
        file: file,
        fileSize: formatFileSize(file.size),
        fileName: file.name
      })
    }
  }
}
// 转换字节为适当单位
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes'

  const k = 1024
  const units = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))

  // 如果大于GB且超过1024MB，转换为GB显示
  if (i >= 3 && bytes >= 1024 * 1024 * 1024) {
    return (bytes / (1024 * 1024 * 1024)).toFixed(2) + ' GB'
  }
  // 如果大于MB且超过1024KB，转换为MB显示
  else if (i >= 2 && bytes >= 1024 * 1024) {
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB'
  }
  // 其他情况正常转换
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + units[i]
}
//退出函数
export const exitFile = () => {
  ischatFile.value = false
}
//删除文件
export const removeFile = (index) => {
  if (index >= 0 && index < selectedFiles.value.length) {
    selectedFiles.value.splice(index, 1)
    console.log('文件数', selectedFiles.value.length)
  }
}
//下载文件
export const download_file = async (url, index) => {
  if (!url) return

  // 在 Electron 环境中使用主进程下载
  if (window.electron) {
    // Electron 环境中使用主进程下载
    user_friend_history_one.value.user_history[index].isdownload = '正在下载'
    await window.api
      .downloadFile(url)
      .then(async (result) => {
        if (result.success) {
          console.log('文件下载成功:', result.path)
          // 可以在这里添加下载成功后的通知
          user_friend_history_one.value.user_history[index].filePath = result.path
          user_friend_history_one.value.user_history[index].isdownload = '下载完成'
        } else {
          console.error('文件下载失败:', result.error)
          // 可以在这里添加下载失败后的通知
        }
      })
      .catch((error) => {
        console.error('下载过程中出错:', error)
      })
  } else {
    // 非 Electron 环境下的备用方案
    const a = document.createElement('a')
    a.href = url
    a.download = url.split('/').pop() // 使用 URL 最后部分作为文件名
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }
}
//打开文件地址
export const open_file_local = async (index) => {
  // 下载成功后自动打开文件所在位置
  await window.api
    .openFileLocation(user_friend_history_one.value.user_history[index].filePath)
    .then((res) => {
      console.log('是否打开', res.success)
      if (res.success === false) {
        user_friend_history_one.value.user_history[index].isdownload = '未下载文件'
      }
    })
}
