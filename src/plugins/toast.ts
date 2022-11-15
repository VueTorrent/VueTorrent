import Toast, { POSITION } from 'vue-toastification'
import 'vue-toastification/dist/index.css'

export const toast = Toast
export const config = {
  maxToasts: 5,
  timeout: 2000,
  position: POSITION.BOTTOM_RIGHT
}
