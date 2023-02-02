import { mapGetters } from 'vuex'
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
  computed: mapGetters(['getModalState'])
})
export default class Modal extends Vue {
  //data
  hndlDialog = true

  //props
  @Prop() guid!: string

  // mapGetters
  getModalState!: () => any

  // computed
  get dialog() {
    return this.hndlDialog
  }
  set dialog(val) {
    this.hndlDialog = val
    if (!val) this.deleteModal()
  }

  // methods
  deleteModal() {
    //this.hndlDialog = false
    setTimeout(() => {
      this.$store.commit('DELETE_MODAL', this.guid)
    }, 300)
  }

  beforeDestroy() {
    this.deleteModal()
  }
}
