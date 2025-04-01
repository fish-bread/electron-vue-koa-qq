import { ref } from 'vue'

export const chatImage = ref()
export const ischatImage = ref(false)
// 存储已选择图片的总大小
export const totalImageSize = ref(0)
// 存储已选择的图片列表
export const selectedImages = ref([])
export const statusMessageImage = ref('图片准备就绪')

//点击图片
export const chatImageFonc = () => {
  chatImage.value.click()
}

//选择图片
export const chooseImage = (event) => {
  ischatImage.value = true
  const files = event.target.files

  if (files && files.length > 0) {
    // 检查当前已选图片数量
    const remainingSlots = 9 - selectedImages.value.length
    if (remainingSlots <= 0) {
      console.log('已达到最大图片数量限制(9张)，请先删除部分图片')
      event.target.value = '' // 重置input
      return
    }
    // 只处理能添加的图片数量
    const filesToProcess = Math.min(files.length, remainingSlots)
    for (let i = 0; i < filesToProcess; i++) {
      const file = files[i]

      // 验证文件类型
      if (!file.type.startsWith('image/')) {
        console.log(`文件 ${file.name} 不是图片类型！`)
        continue
      }

      // 验证单文件大小（可选）
      const maxSingleSize = 10 * 1024 * 1024 // 10MB
      if (file.size > maxSingleSize) {
        console.log(`文件 ${file.name} 大小超过10MB限制！`)
        continue
      }

      // 验证总大小
      const maxTotalSize = 100 * 1024 * 1024 // 100MB
      if (totalImageSize.value + file.size > maxTotalSize) {
        console.log('总图片大小已超过100MB限制！')
        return
      }

      // 添加到已选择图片列表
      selectedImages.value.push(file)
      totalImageSize.value += file.size
      console.log(
        `已添加图片: ${file.name}, 当前总大小: ${(totalImageSize.value / 1024 / 1024).toFixed(2)}MB`
      )
    }
    // 显示实际添加的图片数量
    if (filesToProcess < files.length) {
      console.log(`只能添加${filesToProcess}张图片，已达到最大限制`)
    }
  }
  // 最后再重置input的值
  event.target.value = ''
}

// 删除已选择的图片
export const removeImage = (index) => {
  if (index >= 0 && index < selectedImages.value.length) {
    totalImageSize.value -= selectedImages.value[index].size
    selectedImages.value.splice(index, 1)
  }
}

// 清空已选择的图片
export const clearImages = () => {
  selectedImages.value = []
  totalImageSize.value = 0
}
