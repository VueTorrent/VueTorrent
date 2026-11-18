import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { nextTick } from 'vue'
import SnackbarNotification from './SnackbarNotification.vue'
import vuetify from '@/plugins/vuetify'
import { useSnackbarStore } from '@/stores'

describe('SnackbarNotification.vue', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    document.body.innerHTML = ''
    Object.defineProperty(window, 'visualViewport', {
      configurable: true,
      value: {
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        width: 1024,
        height: 768,
        offsetLeft: 0,
        offsetTop: 0,
        scale: 1,
      },
    })
  })

  it('renders the message and runs the undo action', async () => {
    const pinia = createPinia()
    setActivePinia(pinia)

    const wrapper = mount(SnackbarNotification, {
      attachTo: document.body,
      global: { plugins: [pinia, vuetify] },
    })
    const snackbarStore = useSnackbarStore()
    const action = vi.fn().mockResolvedValue(undefined)

    snackbarStore.show({ message: 'Tag updated', actionText: 'Undo', action })
    await nextTick()

    expect(document.body.textContent).toContain('Tag updated')
    expect(document.body.textContent).toContain('Undo')

    const undoButton = Array.from(document.body.querySelectorAll('button')).find(button => button.textContent?.trim() === 'Undo')
    expect(undoButton).toBeDefined()

    undoButton!.click()
    await nextTick()

    expect(action).toHaveBeenCalledOnce()
    expect(snackbarStore.visible).toBe(false)
    wrapper.unmount()
  })
})
