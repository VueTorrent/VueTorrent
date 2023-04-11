import Toast, { POSITION } from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import type { PluginOptions } from 'vue-toastification/src/types'

const config: PluginOptions = {
  maxToasts: 5,
  timeout: 2000,
  position: POSITION.BOTTOM_RIGHT
}

export { Toast, config }
