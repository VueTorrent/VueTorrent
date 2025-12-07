import { mount } from '@vue/test-utils'
import AutofillableField from './AutofillableField.vue'

describe('AutofillableField.vue', () => {
  const global = {
    stubs: {
      'v-icon': {
        template: '<span class="v-icon"><slot /></span>',
      },
    },
  }

  it('renders title and input value', () => {
    const wrapper = mount(AutofillableField, {
      props: { title: 'Field Title', modelValue: 'abc' },
      global,
    })
    expect(wrapper.text()).toContain('Field Title')
    expect(wrapper.find('input').element.value).toBe('abc')
  })

  it('emits submit event on enter key', async () => {
    const wrapper = mount(AutofillableField, {
      props: { title: 'Field', modelValue: '' },
      global,
    })
    await wrapper.find('input').trigger('keydown.enter')
    expect(wrapper.emitted('submit')).toBeTruthy()
  })

  it('renders prepend and append icons when props are provided', () => {
    const wrapper = mount(AutofillableField, {
      props: {
        title: 'Field',
        modelValue: '',
        prependIcon: 'mdi-home',
        appendIcon: 'mdi-check',
        prependIconInner: 'mdi-magnify',
        appendIconInner: 'mdi-close',
      },
      global,
    })
    expect(wrapper.findAll('.v-icon').length).toBe(4)
  })

  it('emits correct events when icons are clicked', async () => {
    const wrapper = mount(AutofillableField, {
      props: {
        title: 'Field',
        modelValue: '',
        prependIcon: 'mdi-home',
        appendIcon: 'mdi-check',
        prependIconInner: 'mdi-magnify',
        appendIconInner: 'mdi-close',
      },
      global,
    })
    const icons = wrapper.findAll('.v-icon')
    await icons[0].trigger('click')
    await icons[1].trigger('click')
    await icons[2].trigger('click')
    await icons[3].trigger('click')
    expect(wrapper.emitted('click:prepend')).toBeTruthy()
    expect(wrapper.emitted('click:prependInner')).toBeTruthy()
    expect(wrapper.emitted('click:appendInner')).toBeTruthy()
    expect(wrapper.emitted('click:append')).toBeTruthy()
  })

  it('applies disabled class and disables input when disabled prop is true', () => {
    const wrapper = mount(AutofillableField, {
      props: { title: 'Field', modelValue: '', disabled: true },
      global,
    })
    expect(wrapper.find('input').attributes('disabled')).toBeDefined()
    expect(wrapper.classes()).toContain('autofill-container--disabled')
  })

  it('does not emit icon click events when disabled', async () => {
    const wrapper = mount(AutofillableField, {
      props: {
        title: 'Field',
        modelValue: '',
        prependIcon: 'mdi-home',
        appendIcon: 'mdi-check',
        prependIconInner: 'mdi-magnify',
        appendIconInner: 'mdi-close',
        disabled: true,
      },
      global,
    })
    const icons = wrapper.findAll('.v-icon')
    await icons[0].trigger('click')
    await icons[1].trigger('click')
    await icons[2].trigger('click')
    await icons[3].trigger('click')
    expect(wrapper.emitted('click:prepend')).toBeFalsy()
    expect(wrapper.emitted('click:prependInner')).toBeFalsy()
    expect(wrapper.emitted('click:appendInner')).toBeFalsy()
    expect(wrapper.emitted('click:append')).toBeFalsy()
  })

  it('does not emit submit event when disabled and enter is pressed', async () => {
    const wrapper = mount(AutofillableField, {
      props: { title: 'Field', modelValue: '', disabled: true },
      global,
    })
    await wrapper.find('input').trigger('keydown.enter')
    expect(wrapper.emitted('submit')).toBeFalsy()
  })
})
