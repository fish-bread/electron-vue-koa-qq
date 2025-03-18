import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer,自定义api
const api = {
  minimize: () => ipcRenderer.send('minimize-window'),
  setFullScreen: () => ipcRenderer.send('setFull-screen'),
  close: () => ipcRenderer.send('close-window'),
  openHomeWindow: () => ipcRenderer.send('open-home-window'),
  openSearchWindow: () => ipcRenderer.send('open-search-window'),
  //存储用户和token
  localUser: (userName, userEmail, userUid, userHeadshot, userFriendUid) =>
    ipcRenderer.send('local-user', userName, userEmail, userUid, userHeadshot, userFriendUid),
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
