import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Tab',
  props: {
    hash: String,
    isActive: Boolean
  },
  watch: {
    isActive() {
      if (this.isActive) this.activeMethod()
    }
  },
  methods: {
    activeMethod() {
      throw new Error('Method not implemented.')
    }
  }
})
