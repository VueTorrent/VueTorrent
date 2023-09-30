import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuetify from 'vuetify'
import PluginManager from '@/components/Modals/SearchModal/PluginManager.vue'
import Vuex from 'vuex'

describe('PluginManager.vue', () => {
  const localVue = createLocalVue()
  localVue.use(Vuex)
  const vuetify = new Vuetify()
  let store

  beforeEach(() => {
    store = new Vuex.Store({
      actions: {
        FETCH_SETTINGS: jest.fn()
      },
      state: {
        searchPlugins: []
      }
    })
  })

  it('should render the PluginManager', () => {
    const wrapper = shallowMount(PluginManager, {
      localVue,
      vuetify,
      store,
      mocks: {
        $t: () => {}
      }
    })
    expect(wrapper.exists()).toBe(true)
  })
})
