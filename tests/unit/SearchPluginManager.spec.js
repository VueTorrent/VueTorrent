import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuetify from 'vuetify'
import SearchPluginManager from '@/components/Modals/SearchPluginManager.vue'
import Vuex from 'vuex'
import Vue from 'vue'
import { expect, vi } from 'vitest'

Vue.use(Vuetify)

describe('SearchPluginManager.vue', () => {
  const localVue = createLocalVue()
  localVue.use(Vuex)
  const vuetify = new Vuetify()
  let store
  let wrapper

  beforeEach(() => {
    store = new Vuex.Store({
      actions: {
        FETCH_SETTINGS: vi.fn(),
        FETCH_SEARCH_PLUGINS: vi.fn()
      },
      state: {
        searchPlugins: []
      }
    })
    wrapper  = shallowMount(SearchPluginManager, {
      localVue,
      vuetify,
      store,
      mocks: {
        $t: x => x
      }
    })
  })

  it('should render the SearchPluginManager', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('should test updatePluginList',async ()=>{
    const updatePluginListSpy = vi.spyOn(wrapper.vm,'updatePluginList')
    const dispatchSpy = vi.spyOn(wrapper.vm.$store,'dispatch')
    await wrapper.vm.updatePluginList()
    await wrapper.vm.$nextTick()
    expect(updatePluginListSpy).toHaveBeenCalled()
    expect(dispatchSpy).toHaveBeenCalledWith('FETCH_SEARCH_PLUGINS')
  })

  it('should test closeInstallDialog', async ()=>{
    const closeInstallDialogSpy = vi.spyOn(wrapper.vm,'closeInstallDialog')
    wrapper.vm.installDialog = true
    await wrapper.vm.closeInstallDialog()
    await wrapper.vm.$nextTick()
    expect(closeInstallDialogSpy).toHaveBeenCalled()
    expect(wrapper.vm.installDialog).toEqual(false)
  })

})
