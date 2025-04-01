import { app } from 'electron'
import { join } from 'path'
import * as fs from 'node:fs'
import * as path from 'node:path'
// 获取应用安装目录下的 downloads 文件夹路径
export function getAppDownloadsPath() {
  // 对于开发环境，使用 app.getAppPath()
  // 对于生产环境，使用 path.dirname(app.getPath('exe'))
  const appPath = app.isPackaged ? join(app.getPath('exe')) : app.getAppPath()
  const downloadsPath = join(appPath, 'downloads')

  // 确保 downloads 文件夹存在
  if (!fs.existsSync(downloadsPath)) {
    fs.mkdirSync(downloadsPath, { recursive: true })
  }

  return downloadsPath
}

// 全局变量存储下载路径
export const appDownloadsPath = getAppDownloadsPath()

// 下载文件辅助函数
export function downloadFile(url, filePath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filePath)

    const protocol = url.startsWith('https') ? require('https') : require('http')

    protocol
      .get(url, (response) => {
        response.pipe(file)

        file.on('finish', () => {
          file.close()
          resolve({
            success: true,
            path: filePath,
            fileName: path.basename(filePath)
          })
        })
      })
      .on('error', (error) => {
        fs.unlink(filePath, () => {}) // 删除部分下载的文件
        reject(error)
      })
  })
}
