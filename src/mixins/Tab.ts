import {Component, Prop, Vue, Watch} from "vue-property-decorator";

@Component
export default class Tab extends Vue {
  @Prop() hash!: string
  @Prop() isActive!: boolean

  activeMethod!: () => void

  @Watch('isActive')
  isActiveChanged(active: boolean) {
    if (active) this.activeMethod()
  }
}
