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
  //发送消息给home窗体
  sendWindow: () => ipcRenderer.send('update-friend-list'),
  updateWindow: (callback) => ipcRenderer.on('update-friend-list', callback),
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
  delete_User_Token: () => ipcRenderer.invoke('delete-user-token')
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
