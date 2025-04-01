import { app, Menu, Tray } from 'electron'
import { loginWindow, mainWindow } from './index'
import icon from '../../resources/icon.png?asset'
// 在全局变量部分添加 Tray 变量
let tray = null
export const trayFunc = () => {
  // 创建 Tray 图标
  tray = new Tray(icon) // 使用你的应用图标
  const contextMenu = Menu.buildFromTemplate([
    {
      label: '显示',
      click: () => {
        if (mainWindow) {
          mainWindow.show()
        } else if (loginWindow) {
          loginWindow.show()
        }
      }
    },
    {
      label: '退出',
      click: () => {
        app.isQuitting = true
        app.quit()
      }
    }
  ])
  tray.setToolTip('electron-qq')
  tray.setContextMenu(contextMenu)

  // 点击托盘图标显示窗口
  tray.on('click', () => {
    if (mainWindow) {
      mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show()
    } else if (loginWindow) {
      loginWindow.isVisible() ? loginWindow.hide() : loginWindow.show()
    }
  })
}
