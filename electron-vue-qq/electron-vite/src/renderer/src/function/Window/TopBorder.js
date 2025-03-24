export const shrink = () => {
  window.api.minimize()
}
export const setFullScreen = () => {
  window.api.setFullScreen()
}
export const close = () => {
  window.api.close()
}
export const fixed = async () => {
  await window.api
    .fixed()
    .then(() => {})
    .catch(console.error)
}
