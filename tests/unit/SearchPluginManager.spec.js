import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuetify from 'vuetify'
import SearchPluginManager from '@/components/Modals/SearchPluginManager.vue'
import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuetify)

describe('SearchPluginManager.vue', () => {
  const localVue = createLocalVue()
  localVue.use(Vuex)
  const vuetify = new Vuetify()
  let store

  beforeEach(() => {
    store = new Vuex.Store({
      actions: {
        FETCH_SETTINGS: ()=>{},
        FETCH_SEARCH_PLUGINS: ()=>{}
      },
      state: {
        searchPlugins: []
      }
    })
  })

  it('should render the SearchPluginManager', () => {
    const wrapper = shallowMount(SearchPluginManager, {
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
