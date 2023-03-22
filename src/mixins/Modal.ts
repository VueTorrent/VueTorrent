import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Modal',
  props: {
    guid: String
  },
  data: () => ({
    hndlDialog: true
  }),
  beforeDestroy() {
    this.deleteModal()
  },
  computed: {
    dialog: {
      get() {
        return this.hndlDialog
      },
      set(val: boolean) {
        this.hndlDialog = val
        if (!val) this.deleteModal()
      }
    }
  },
  methods: {
    deleteModal() {
      setTimeout(() => {
        this.$store.commit('DELETE_MODAL', this.guid)
      }, 300)
    }
  }
})
