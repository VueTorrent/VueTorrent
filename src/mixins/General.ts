import { v4 as uuidv4 } from 'uuid'
import { mapGetters } from 'vuex'
import {Component, Vue} from "vue-property-decorator";

@Component({
  computed: mapGetters(['getTheme'])
})
export default class General extends Vue {
  getTheme!: () => string

  get theme() {
    return this.getTheme()
  }
  get isMobile() {
    return this.$vuetify.breakpoint.smAndDown
  }

  createModal(name: string, props: any) {
    const component = {
      component: name,
      props,
      guid: uuidv4()
    }

    this.$store.commit('ADD_MODAL', component)
  }
}
