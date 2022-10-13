import { shallowMount } from '@vue/test-utils'
import General from '../../src/components/Settings/Tabs/VueTorrent/General.vue'

let wrapper

describe('General', () => {
    beforeEach(() => {
        wrapper = shallowMount(General,{ mocks: { $t: () => {} , $store: {
            getters:{getAppVersion:jest.fn()},
            state: { webuiSettings: {
                showCurrentSpeed:100,
                showSpeedGraph:true,
                showSessionStat:true,
                showAlltimeStat:true,
                showTrackerFilter:true,
                rightDrawer:10, 
                paginationSize:10, 
                title:'test',
                lang:'English'} }
                }
            } })
    })

    it('render correctly', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })

    it('tests showCurrentSpeed',()=>{
        expect(wrapper.vm.showCurrentSpeed).toEqual(100)
    })

    it('tests showSpeedGraph',()=>{
        expect(wrapper.vm.showSpeedGraph).toEqual(true)
    })

    it('tests showSessionStat',()=>{
        expect(wrapper.vm.showSessionStat).toEqual(true)
    })

    it('tests showAlltimeStat',()=>{
        expect(wrapper.vm.showAlltimeStat).toEqual(true)
    })

    it('tests showTrackerFilter',()=>{
        expect(wrapper.vm.showTrackerFilter).toEqual(true)
    })

    it('tests rightDrawer',()=>{
        expect(wrapper.vm.rightDrawer).toEqual(10)
    })

    it('tests paginationSize',()=>{
        expect(wrapper.vm.paginationSize).toEqual(10)
    })

    it('tests title',()=>{
        expect(wrapper.vm.title).toEqual('test')
    })

    it('tests lang',()=>{
        expect(wrapper.vm.lang).toEqual('English')
    })
})
