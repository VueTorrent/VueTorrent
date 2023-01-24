import {Component, Vue, Watch} from "vue-property-decorator";

@Component
export default class FullScreenModal extends Vue {
  tab!: string|null

  get phoneLayout() {
    return this.$vuetify.breakpoint.xsOnly
  }
  get dialogWidth() {
    return this.phoneLayout ? '100%' : '80%'
  }

  @Watch('dialog')
  onDialogChanged(visible: boolean) {
    if (!visible) this.tab = null
  }
}
