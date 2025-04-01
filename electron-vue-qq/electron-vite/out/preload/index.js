"use strict";
const electron = require("electron");
const preload = require("@electron-toolkit/preload");
const api = {
  minimize: () => electron.ipcRenderer.send("minimize-window"),
  setFullScreen: () => electron.ipcRenderer.send("setFull-screen"),
  close: () => electron.ipcRenderer.send("close-window"),
  fixed: () => electron.ipcRenderer.invoke("fixed-window"),
  //打开窗体
  openHomeWindow: () => electron.ipcRenderer.send("open-home-window"),
  openSearchWindow: () => electron.ipcRenderer.send("open-search-window"),
  openLoginWindow: () => electron.ipcRenderer.send("open-login-window"),
  //发送保存好友消息给home窗体
  sendWindow: () => electron.ipcRenderer.send("update-friend-list"),
  updateWindow: (callback) => electron.ipcRenderer.on("update-friend-list", callback),
  //发送保存样式给home窗体
  sendStyle: () => electron.ipcRenderer.send("update-window-style"),
  updateStyle: (callback) => electron.ipcRenderer.on("update-window-style", callback),
  //打开RTC窗体并接收 selectedUserUid
  openwebRTCWindow: (selectedUserUid) => electron.ipcRenderer.send("open-webRTCWindow", selectedUserUid),
  receiveSelectedUserUid: (callback) => electron.ipcRenderer.on("selectedUserUid", callback),
  //打开设置窗体
  openAppSetWindow: () => electron.ipcRenderer.send("open-appSet-window"),
  //存储用户和token
  localUser: (user) => electron.ipcRenderer.send("local-user", user),
  localToken: (userToken) => electron.ipcRenderer.send("local-token", userToken),
  //查询用户和token与删除
  searchUser: () => electron.ipcRenderer.invoke("search-user"),
  searchToken: () => electron.ipcRenderer.invoke("search-token"),
  delete_User_Token: () => electron.ipcRenderer.invoke("delete-user-token"),
  //储存颜色样式
  localColorStyle: (color) => electron.ipcRenderer.invoke("local-color-style", color),
  searchColorStyle: () => electron.ipcRenderer.invoke("search-color-style"),
  //保存并获取背景图片
  saveBackgroundImage: (color, arrayBuffer) => electron.ipcRenderer.invoke("save-background-image", color, arrayBuffer),
  getBackgroundImage: () => electron.ipcRenderer.invoke("get-background-image"),
  //传递网络链接
  sendUrl: (url) => electron.ipcRenderer.send("send-url", url),
  //下载文件
  downloadFile: (url) => electron.ipcRenderer.invoke("download-file", url),
  openFileLocation: (FilePath) => electron.ipcRenderer.invoke("open-file-location", FilePath),
  //修改文件路径
  getDownloadsPath: () => electron.ipcRenderer.invoke("get-downloads-path"),
  setDownloadsPath: (newPath) => electron.ipcRenderer.invoke("set-downloads-path", newPath),
  openDirectoryDialog: () => electron.ipcRenderer.invoke("open-directory-dialog"),
  // 获取图片本地路径及//清除图片缓存
  getLocalImagePath: (imageUrl) => electron.ipcRenderer.invoke("get-local-image-path", imageUrl),
  clearImageCache: () => electron.ipcRenderer.invoke("clear-image-cache")
};
if (process.contextIsolated) {
  try {
    electron.contextBridge.exposeInMainWorld("electron", preload.electronAPI);
    electron.contextBridge.exposeInMainWorld("api", api);
  } catch (error) {
    console.error(error);
  }
} else {
  window.electron = preload.electronAPI;
  window.api = api;
}
