import { app, shell, BrowserWindow, ipcMain, dialog } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import * as fs from 'node:fs'
import { appDownloadsPath, downloadFile } from './downloadfunc'
import * as path from 'node:path'
const Store = require('electron-store')
const store = new Store()
console.log('配置文件路径:', store.path) // 复制这个路径
//变量
let full = false

// 检测并阻止多实例
const gotTheLock = app.requestSingleInstanceLock()

if (!gotTheLock) {
  // 如果获取锁失败，说明已经有实例在运行，直接退出
  app.quit()
} else {
  // 如果获取锁成功，继续启动应用
  app.on('second-instance', () => {
    // 当第二个实例启动时，聚焦到第一个实例的窗口
    const windows = BrowserWindow.getAllWindows()
    if (windows.length > 0) {
      const mainWindow = windows[0]
      if (mainWindow.isMinimized()) mainWindow.restore()
      mainWindow.focus()
    }
  })
}
// 主窗体
function createHomeWindow() {
  const mainWindow = new BrowserWindow({
    width: 961,
    height: 643,
    minWidth: 961,
    minHeight: 643,
    frame: false,
    show: false,
    autoHideMenuBar: true,
    webviewTag: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })
  //准备窗口
  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // 为基于electron-vite cli的渲染器设置热模块替换（HMR）。
  // 在开发环境中加载远程URL，在生产环境中加载本地HTML文件。
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL('http://localhost:5173/#/home')
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'), {
      hash: '#/home'
    })
  }
  // 将 mainWindow 传递给 createSearchWindow
  ipcMain.on('open-search-window', (event) => {
    const window = BrowserWindow.fromWebContents(event.sender)
    if (window) {
      createSearchWindow(mainWindow)
    }
  })
  // 关闭并删除token
  ipcMain.on('open-login-window', (event) => {
    const window = BrowserWindow.fromWebContents(event.sender)
    if (window) {
      window.close()
      store.delete('user')
      store.delete('user_token')
      console.log('token已删除', store.get('user_token'))
      console.log('user已删除', store.get('user'))
      createLoginWindow()
    }
  })
  //打开RTC窗体
  ipcMain.on('open-webRTCWindow', (event, selectedUserUid) => {
    const window = BrowserWindow.fromWebContents(event.sender)
    if (window) {
      createWebRTCWindow(selectedUserUid)
    }
  })
  //打开appset窗口
  ipcMain.on('open-appSet-window', (event) => {
    const window = BrowserWindow.fromWebContents(event.sender)
    if (window) {
      createAppSetWindow()
    }
  })
}
// 创建搜索子窗口
let searchWindow = null
const createSearchWindow = () => {
  if (searchWindow) {
    // 如果 webRTCWindow 已经存在，则将其置顶并显示
    searchWindow.focus()
    return
  }
  searchWindow = new BrowserWindow({
    width: 680,
    height: 719,
    resizable: false, // 禁止调整窗口大小
    modal: false, // 设置为模态窗口
    frame: false, // 无边框窗口
    show: false, // 初始不显示
    autoHideMenuBar: true, // 自动隐藏菜单栏
    webviewTag: true, // 允许使用 webview 标签
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  // 准备窗口
  searchWindow.on('ready-to-show', () => {
    searchWindow.show()
  })

  searchWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // 加载内容
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    searchWindow.loadURL('http://localhost:5173/#/search')
  } else {
    searchWindow.loadFile(join(__dirname, '../renderer/index.html'), {
      hash: '#/search'
    })
  }
  // 监听窗口关闭事件，清除引用
  searchWindow.on('closed', () => {
    searchWindow = null
  })
}
// 登录窗体
function createLoginWindow() {
  const loginWindow = new BrowserWindow({
    width: 322,
    height: 450,
    frame: false,
    show: false,
    maximizable: false,
    autoHideMenuBar: true,
    resizable: false,
    webviewTag: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })
  //准备窗口
  loginWindow.on('ready-to-show', () => {
    loginWindow.show()
  })

  loginWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // 为基于electron-vite cli的渲染器设置热模块替换（HMR）。
  // 在开发环境中加载远程URL，在生产环境中加载本地HTML文件。
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    loginWindow.loadURL(`http://localhost:5173/#/login`)
  } else {
    loginWindow.loadFile(join(__dirname, '../renderer/index.html'), {
      hash: '#/login'
    })
  }
}
//webRTC窗体
let webRTCWindow = null
const createWebRTCWindow = (selectedUserUid) => {
  if (webRTCWindow) {
    // 如果 webRTCWindow 已经存在，则将其置顶并显示
    webRTCWindow.focus()
    return
  }
  webRTCWindow = new BrowserWindow({
    width: 820,
    height: 600,
    frame: false,
    show: false,
    autoHideMenuBar: true,
    resizable: true,
    webviewTag: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })
  //准备窗口
  webRTCWindow.on('ready-to-show', () => {
    webRTCWindow.show()
  })

  webRTCWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // 为基于electron-vite cli的渲染器设置热模块替换（HMR）。
  // 在开发环境中加载远程URL，在生产环境中加载本地HTML文件。
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    webRTCWindow.loadURL(`http://localhost:5173/#/webRTC`)
  } else {
    webRTCWindow.loadFile(join(__dirname, '../renderer/index.html'), {
      hash: '#/webRTC'
    })
  }
  // 监听窗口关闭事件，清除引用
  webRTCWindow.on('closed', () => {
    webRTCWindow = null
  })

  // 将 selectedUserUid 传递给 webRTC 窗体
  webRTCWindow.webContents.on('did-finish-load', () => {
    webRTCWindow.webContents.send('selectedUserUid', selectedUserUid)
  })
}
//应用设置窗体
let appSetWindow = null
const createAppSetWindow = () => {
  if (appSetWindow) {
    // 如果 webRTCWindow 已经存在，则将其置顶并显示
    appSetWindow.focus()
    return
  }
  appSetWindow = new BrowserWindow({
    width: 840,
    height: 780,
    frame: false,
    show: false,
    autoHideMenuBar: true,
    resizable: false,
    webviewTag: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })
  //准备窗口
  appSetWindow.on('ready-to-show', () => {
    appSetWindow.show()
  })

  appSetWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // 为基于electron-vite cli的渲染器设置热模块替换（HMR）。
  // 在开发环境中加载远程URL，在生产环境中加载本地HTML文件。
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    appSetWindow.loadURL(`http://localhost:5173/#/appSet`)
  } else {
    appSetWindow.loadFile(join(__dirname, '../renderer/index.html'), {
      hash: '#/appSet'
    })
  }
  // 监听窗口关闭事件，清除引用
  appSetWindow.on('closed', () => {
    appSetWindow = null
  })
}
//图片查看窗体

//视频查看窗体

// 此方法将在Electron完成时调用。
// 初始化完成且准备好创建浏览器窗口。
//此事件发生后，某些API才能使用。
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // 默认情况下，通过F12在开发环境中打开或关闭开发者工具。
  // 并在生产环境中忽略CommandOrControl + R快捷键。
  // 看 https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC test,预加载脚本
  //缩小,全屏,关闭,固定设置
  ipcMain.on('minimize-window', (event) => {
    const window = BrowserWindow.fromWebContents(event.sender)
    if (window) {
      window.minimize()
    }
  })
  ipcMain.on('setFull-screen', (event) => {
    const window = BrowserWindow.fromWebContents(event.sender)
    if (window) {
      if (full === false) {
        window.setFullScreen(true)
        full = true
      } else {
        window.setFullScreen(false)
        full = false
      }
    }
  })
  ipcMain.on('close-window', (event) => {
    const window = BrowserWindow.fromWebContents(event.sender)
    if (window) {
      window.close()
    }
  })
  let fixed = false
  ipcMain.handle('fixed-window', (event) => {
    const window = BrowserWindow.fromWebContents(event.sender)
    if (window && fixed === false) {
      fixed = true
      window.setAlwaysOnTop(true)
      return true
    } else {
      fixed = false
      window.setAlwaysOnTop(false)
      return false
    }
  })
  //打开主页面
  ipcMain.on('open-home-window', (event) => {
    const window = BrowserWindow.fromWebContents(event.sender)
    if (window) {
      window.close()
      createHomeWindow()
    }
  })
  //持久化用户信息
  ipcMain.on('local-user', (event, user) => {
    const window = BrowserWindow.fromWebContents(event.sender)
    if (window) {
      store.set('user', user)
      console.log('存储用户', store.get('user'))
    }
  })
  //持久化用户token
  ipcMain.on('local-token', (event, userToken) => {
    const window = BrowserWindow.fromWebContents(event.sender)
    if (window) {
      store.set('user_token', userToken)
      console.log('储存token', store.get('user_token'))
    }
  })
  ipcMain.handle('search-user', (event) => {
    const window = BrowserWindow.fromWebContents(event.sender)
    if (window) {
      console.log('读取用户', store.get('user'))
      return store.get('user')
    }
  })
  ipcMain.handle('search-token', (event) => {
    const window = BrowserWindow.fromWebContents(event.sender)
    if (window) {
      console.log('读取token', store.get('user_token'))
      return store.get('user_token')
    }
  })
  ipcMain.handle('delete-user-token', (event) => {
    const window = BrowserWindow.fromWebContents(event.sender)
    if (window) {
      store.delete('user_token')
      store.delete('user')
      console.log('token已删除', store.get('user_token'))
      console.log('user已删除', store.get('user'))
    }
  })
  //发送添加好友消息给homeWindow
  ipcMain.on('update-friend-list', () => {
    // 获取所有窗口
    const windows = BrowserWindow.getAllWindows()
    // 找到 home 窗体并发送消息
    windows.forEach((window) => {
      if (window.webContents.getURL().includes('/home')) {
        window.webContents.send('update-friend-list')
        console.log('发送朋友消息给home')
      }
    })
  })
  //发送样式切换给homeWindow
  ipcMain.on('update-window-style', () => {
    // 获取所有窗口
    const windows = BrowserWindow.getAllWindows()
    // 找到 home 窗体并发送消息
    windows.forEach((window) => {
      if (window.webContents.getURL().includes('/home')) {
        window.webContents.send('update-window-style')
        console.log('发送样式消息给home')
      }
    })
  })
  //储存颜色样式
  ipcMain.handle('local-color-style', (event, color) => {
    const window = BrowserWindow.fromWebContents(event.sender)
    if (window) {
      store.set('color', color)
      console.log('储存颜色', store.get('color'))
      return true
    }
  })
  //查询颜色样式
  ipcMain.handle('search-color-style', (event) => {
    const window = BrowserWindow.fromWebContents(event.sender)
    if (window) {
      console.log('查询颜色', store.get('color'))
      return store.get('color')
    }
  })
  // 保存背景图片
  ipcMain.handle('save-background-image', (event, color, imageData) => {
    const userDataPath = app.getPath('userData')
    const imagePath = join(userDataPath, 'background_image.png')

    try {
      fs.writeFileSync(imagePath, Buffer.from(imageData))
      color.background_image = imagePath
      store.set('color', color)
      console.log('背景图片保存成功', color)
      return true
    } catch (error) {
      console.error('保存背景图片失败:', error)
      return false
    }
  })
  //获取背景图片
  ipcMain.handle('get-background-image', (event) => {
    const window = BrowserWindow.fromWebContents(event.sender)
    if (window) {
      const userDataPath = app.getPath('userData')
      const imagePath = join(userDataPath, 'background_image.png')
      const getColor = store.get('color')
      try {
        if (fs.existsSync(imagePath) && getColor.background_image) {
          return fs.readFileSync(imagePath)
        }
        return null
      } catch (error) {
        console.error('读取背景图片失败:', error)
        return null
      }
    }
  })
  //打开外部浏览器
  ipcMain.on('send-url', (event, url) => {
    const window = BrowserWindow.fromWebContents(event.sender)
    if (window) {
      shell.openExternal(url).then()
    }
  })
  // 监听下载文件事件
  ipcMain.handle('download-file', async (event, fileUrl) => {
    try {
      const fileName = path.basename(fileUrl)
      const filePath = path.join(appDownloadsPath, fileName)

      // 检查文件是否已存在
      if (fs.existsSync(filePath)) {
        // 如果文件已存在，直接返回文件地址
        return {
          success: true,
          path: filePath,
          message: '文件已存在，直接返回'
        }
      } else {
        return await downloadFile(fileUrl, filePath)
      }
    } catch (error) {
      console.error('下载失败:', error)
      return { success: false, error: error.message }
    }
  })
  // 在 ipcMain.handle 部分添加以下代码
  ipcMain.handle('open-file-location', (event, filePath) => {
    try {
      path.dirname(filePath)
      shell.showItemInFolder(path.normalize(filePath))
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    }
  })
  //返回文件下载地址
  ipcMain.handle('get-downloads-path', async (event) => {
    const window = BrowserWindow.fromWebContents(event.sender)
    if (window) {
      if (!store.get('downloads-path')) {
        store.set('downloads-path', appDownloadsPath)
        return appDownloadsPath
      } else {
        return store.get('downloads-path')
      }
    }
  })
  //设置文件下载地址
  ipcMain.handle('set-downloads-path', async (event, newPath) => {
    try {
      // 验证路径是否有效
      if (!fs.existsSync(newPath)) {
        fs.mkdirSync(newPath, { recursive: true })
      }
      store.set('downloads-path', newPath)
      return { success: true, path: store.get('downloads-path') }
    } catch (error) {
      return { success: false, error: error.message }
    }
  })
  //打开选择文件地址的窗体
  ipcMain.handle('open-directory-dialog', async (event) => {
    const window = BrowserWindow.fromWebContents(event.sender)
    const result = await dialog.showOpenDialog(window, {
      properties: ['openDirectory'],
      title: '选择下载目录'
    })

    if (!result.canceled && result.filePaths.length > 0) {
      return result.filePaths[0]
    }
    return null
  })
  //打开窗口
  createLoginWindow()

  app.on('activate', function () {
    // 在macOS上，当应用程序重新创建窗口时，这是很常见的。
    // 当点击程序坞图标且没有其他窗口打开时，应用程序通常会重新创建一个窗口。
    if (BrowserWindow.getAllWindows().length === 0) createHomeWindow()
  })
})

//当所有窗口都关闭时，程序将退出，除了在macOS上。在那里，通常
//对于应用程序及其菜单栏，通常保持激活状态，直到用户主动退出。
//通过按下Command + Q键显式退出。
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

//在这个文件中，你可以包含应用程序特定的主进程代码。
// 你也可以将它们放在单独的文件中，并在这里引入。
