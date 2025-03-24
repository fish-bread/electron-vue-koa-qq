import { selectedUserUid } from './user'

export const sendAudio = () => {
  window.api.openwebRTCWindow(selectedUserUid.value)
  console.log('sendAudio')
}
export const sendVideo = () => {
  window.api.openwebRTCWindow(selectedUserUid.value)
  console.log('sendVideo')
}
export const sendok = () => {
  console.log('sendok')
}
