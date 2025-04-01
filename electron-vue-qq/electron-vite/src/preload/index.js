import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer,自定义api
const api = {
  minimize: () => ipcRenderer.send('minimize-window'),
  setFullScreen: () => ipcRenderer.send('setFull-screen'),
  close: () => ipcRenderer.send('close-window'),
  fixed: () => ipcRenderer.invoke('fixed-window'),
  //打开窗体
  openHomeWindow: () => ipcRenderer.send('open-home-window'),
  openSearchWindow: () => ipcRenderer.send('open-search-window'),
  openLoginWindow: () => ipcRenderer.send('open-login-window'),
  //发送保存好友消息给home窗体
  sendWindow: () => ipcRenderer.send('update-friend-list'),
  updateWindow: (callback) => ipcRenderer.on('update-friend-list', callback),
  //发送保存样式给home窗体
  sendStyle: () => ipcRenderer.send('update-window-style'),
  updateStyle: (callback) => ipcRenderer.on('update-window-style', callback),
  //打开RTC窗体并接收 selectedUserUid
  openwebRTCWindow: (selectedUserUid) => ipcRenderer.send('open-webRTCWindow', selectedUserUid),
  receiveSelectedUserUid: (callback) => ipcRenderer.on('selectedUserUid', callback),
  //打开设置窗体
  openAppSetWindow: () => ipcRenderer.send('open-appSet-window'),
  //存储用户和token
  localUser: (user) => ipcRenderer.send('local-user', user),
  localToken: (userToken) => ipcRenderer.send('local-token', userToken),
  //查询用户和token与删除
  searchUser: () => ipcRenderer.invoke('search-user'),
  searchToken: () => ipcRenderer.invoke('search-token'),
  delete_User_Token: () => ipcRenderer.invoke('delete-user-token'),
  //储存颜色样式
  localColorStyle: (color) => ipcRenderer.invoke('local-color-style', color),
  searchColorStyle: () => ipcRenderer.invoke('search-color-style'),
  //保存并获取背景图片
  saveBackgroundImage: (color, arrayBuffer) =>
    ipcRenderer.invoke('save-background-image', color, arrayBuffer),
  getBackgroundImage: () => ipcRenderer.invoke('get-background-image'),
  //传递网络链接
  sendUrl: (url) => ipcRenderer.send('send-url', url),
  //下载文件
  downloadFile: (url) => ipcRenderer.invoke('download-file', url),
  openFileLocation: (FilePath) => ipcRenderer.invoke('open-file-location', FilePath),
  //修改文件路径
  getDownloadsPath: () => ipcRenderer.invoke('get-downloads-path'),
  setDownloadsPath: (newPath) => ipcRenderer.invoke('set-downloads-path', newPath),
  openDirectoryDialog: () => ipcRenderer.invoke('open-directory-dialog'),
  // 获取图片本地路径及//清除图片缓存
  getLocalImagePath: (imageUrl) => ipcRenderer.invoke('get-local-image-path', imageUrl),
  clearImageCache: () => ipcRenderer.invoke('clear-image-cache')
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  window.electron = electronAPI
  window.api = api
}
