// 加载图片
export const loadImage = async (imageUrl) => {
  try {
    // 先尝试获取本地缓存路径
    const localPath = await window.api.getLocalImagePath(imageUrl)
    // 如果有本地缓存，使用本地路径
    if (localPath && localPath !== imageUrl) {
      console.log('localPath', localPath)
      // 开发模式下返回特殊的URL，由主进程处理
      if (process.env.NODE_ENV === 'development') {
        return `app-image://${localPath.replace(/\\/g, '/')}`
      }
      return `file://${localPath.replace(/\\/g, '/')}`
    }
    // 没有缓存，返回原始URL（会被主进程拦截并缓存）
    return imageUrl
  } catch (error) {
    console.error('加载图片失败:', error)
    return imageUrl
  }
}
