import { Menu, MenuItem } from 'electron'
/**
 * 创建简单右键菜单（仅复制）
 * @returns {Menu} 返回仅含复制功能的菜单
 */
export function createSimpleContextMenu() {
  const menu = new Menu()

  menu.append(
    new MenuItem({
      label: '复制',
      role: 'copy',
      accelerator: 'CmdOrCtrl+C'
    })
  )

  return menu
}
/**
 * 创建完整右键菜单（复制和粘贴）
 * @returns {Menu} 返回含复制和粘贴功能的菜单
 */
export function createFullContextMenu() {
  const menu = new Menu()

  menu.append(
    new MenuItem({
      label: '复制',
      role: 'copy',
      accelerator: 'CmdOrCtrl+C'
    })
  )

  menu.append(
    new MenuItem({
      label: '粘贴',
      role: 'paste',
      accelerator: 'CmdOrCtrl+V'
    })
  )

  return menu
}
