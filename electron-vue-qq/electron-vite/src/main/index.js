import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
const Store = require('electron-store')
const store = new Store()
console.log('配置文件路径:', store.path) // 复制这个路径
//变量
let full = false

// 检测并阻止多实例
/*const gotTheLock = app.requestSingleInstanceLock()

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
}*/
function createHomeWindow() {
  // 主窗体
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
}
// 创建子窗口 searchWindow
const createSearchWindow = () => {
  const searchWindow = new BrowserWindow({
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
}
function createLoginWindow() {
  // 登录窗体
  const loginWindow = new BrowserWindow({
    width: 322,
    height: 450,
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
  //缩小,全屏,关闭设置
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
  //打开主页面
  ipcMain.on('open-home-window', (event) => {
    const window = BrowserWindow.fromWebContents(event.sender)
    if (window) {
      window.close()
      createHomeWindow()
    }
  })
  //持久化用户信息
  ipcMain.on('local-user', (event, userName, userEmail, userUid, userHeadshot, userFriendUid) => {
    const window = BrowserWindow.fromWebContents(event.sender)
    if (window) {
      store.set('user', {
        user_name: userName,
        user_email: userEmail,
        user_uid: userUid,
        user_headshot: userHeadshot,
        user_friend_uid: userFriendUid
      })
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
