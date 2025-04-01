import fs from 'node:fs'
import path from 'node:path'
import { app, net, session } from 'electron'
import crypto from 'node:crypto'
const Store = require('electron-store')

// 初始化本地数据库存储
const imageCacheStore = new Store({
  name: 'image-cache',
  defaults: {
    images: {}
  }
})

// 获取文件MIME类型
export function getMimeType(pathname) {
  const ext = path.extname(pathname).toLowerCase()
  const mimeTypes = {
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.gif': 'image/gif',
    '.webp': 'image/webp',
    '.svg': 'image/svg+xml'
  }
  return mimeTypes[ext] || 'application/octet-stream'
}
let cachePath = null
// 存储请求拦截状态，避免重复拦截
const interceptedRequests = new Set()
export function interceptImageRequests(filter) {
  session.defaultSession.webRequest.onCompleted(filter, async (details) => {
    const url = details.url

    // 避免重复拦截同一请求
    if (interceptedRequests.has(url)) {
      interceptedRequests.delete(url) // 处理完成后移除
      return
    }

    const targetRoutes = [
      'http://localhost:3000/userHeadshot/',
      'http://localhost:3000/user_image/'
    ]

    const shouldIntercept = targetRoutes.some((route) => url.startsWith(route))

    if ((shouldIntercept && details.resourceType === 'image') || details.resourceType === 'other') {
      // or other for video
      interceptedRequests.add(url) // 添加到拦截请求集合

      try {
        console.log('拦截特定路由请求:', url)
        const localPath = await handleImageDownload(url)

        // 使用 redirectUrl 替换图片地址为本地文件路径 (仅限渲染进程)
        if (details.frameId !== 0) {
          // 判断是否为渲染进程
          session.defaultSession.webRequest.onBeforeRequest(
            { urls: [url] },
            (details, callback) => {
              callback({
                redirectURL: `file://${localPath}`
              })
            }
          )
        }
      } catch (error) {
        console.error('请求拦截失败:', error)
        // 这里无法直接返回错误，onCompleted 事件没有 callback
      }
    } else {
      console.log('放行其他请求', url)
    }
  })
}
// 处理图片下载和缓存
export async function handleImageDownload(imageUrl) {
  const parsedUrl = new URL(imageUrl)

  try {
    // 检查本地数据库是否已有缓存
    const cachedImage = imageCacheStore.get(`images.${imageUrl}`)

    // 如果数据库有记录但文件不存在，清理无效缓存
    if (cachedImage && !fs.existsSync(cachedImage.localPath)) {
      console.log('发现无效缓存记录，正在清理...')
      imageCacheStore.delete(`images.${imageUrl}`)
    }

    // 如果缓存文件存在，直接返回路径
    if (cachedImage?.localPath && fs.existsSync(cachedImage.localPath)) {
      return cachedImage.localPath
    }

    // 获取缓存目录路径
    const cacheDir = path.join(app.getPath('userData'), 'image_cache')

    // 确保缓存目录存在
    if (!fs.existsSync(cacheDir)) {
      fs.mkdirSync(cacheDir, { recursive: true })
    }

    // 生成唯一的缓存文件名
    const hash = crypto.createHash('md5').update(imageUrl).digest('hex')
    const ext = path.extname(parsedUrl.pathname) || '.jpg'
    cachePath = path.join(cacheDir, `${hash}${ext}`)

    // 下载图片并保存到缓存
    const response = await net.fetch(imageUrl)
    const buffer = await response.arrayBuffer()
    fs.writeFileSync(cachePath, Buffer.from(buffer))

    // 保存到本地数据库
    imageCacheStore.set(`images.${imageUrl}`, {
      url: imageUrl,
      localPath: cachePath,
      mimeType: getMimeType(parsedUrl.pathname),
      cachedAt: new Date().toISOString()
    })
    console.log('图片路径', cachePath)
    return cachePath
  } catch (error) {
    console.error('图片处理失败:', error)
    // 清理可能存在的部分下载文件
    if (cachePath && fs.existsSync(cachePath)) {
      fs.unlinkSync(cachePath)
    }
    throw error
  }
}

// 获取图片本地缓存路径（带自动清理功能）
export function getLocalImagePath(imageUrl) {
  try {
    const cachedImage = imageCacheStore.get(`images.${imageUrl}`)

    // 检查缓存文件是否存在
    if (cachedImage) {
      if (fs.existsSync(cachedImage.localPath)) {
        return cachedImage.localPath
      } else {
        // 文件不存在，清理无效记录
        console.log(`清理无效缓存记录: ${imageUrl}`)
        imageCacheStore.delete(`images.${imageUrl}`)
      }
    }
    return null
  } catch (error) {
    console.error('获取本地图片路径出错:', error)
    return null
  }
}

// 清除图片缓存（增强版）
export function clearImageCache() {
  try {
    const cacheDir = path.join(app.getPath('userData'), 'image_cache')

    // 删除缓存目录
    if (fs.existsSync(cacheDir)) {
      fs.rmSync(cacheDir, { recursive: true })
    }

    // 清空数据库记录
    imageCacheStore.set('images', {})

    console.log('图片缓存已清除')
    return true
  } catch (error) {
    console.error('清除缓存失败:', error)
    return false
  }
}

// 定期清理无效缓存
export function cleanInvalidCache() {
  const images = imageCacheStore.get('images')
  let cleanedCount = 0

  for (const [url, cacheInfo] of Object.entries(images)) {
    if (!fs.existsSync(cacheInfo.localPath)) {
      imageCacheStore.delete(`images.${url}`)
      cleanedCount++
    }
  }

  console.log(`清理了 ${cleanedCount} 条无效缓存记录`)
  return cleanedCount
}

// 应用启动时自动清理无效缓存
/*cleanInvalidCache()
// 每周执行一次清理
setInterval(cleanInvalidCache, 7 * 24 * 60 * 60 * 1000)
 */
