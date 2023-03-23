import { v4 as uuidv4 } from 'uuid'
import { mapGetters } from 'vuex'
import { defineComponent } from 'vue'

export default defineComponent({
  computed: {
    ...mapGetters(['getTheme']),
    theme() {
      // @ts-expect-error: TS2339: Property 'getTheme' does not exist on type 'CreateComponentPublicInstance{}, unknown, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {}, {}, {}, false, OptionTypesType{}, {}, {}, {}, {}, {}>, ... 5 more ..., {}>'.
      return this.getTheme()
    },
    isMobile() {
      return this.$vuetify.breakpoint.smAndDown
    }
  },
  methods: {
    createModal(name: string, props?: any) {
      const component = {
        component: name,
        props,
        guid: uuidv4()
      }

      this.$store.commit('ADD_MODAL', component)
    }
  }
})
