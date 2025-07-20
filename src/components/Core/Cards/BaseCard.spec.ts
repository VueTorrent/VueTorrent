import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { h } from 'vue'
import BaseCard from './BaseCard.vue'
import i18n from '@/plugins/i18n'
import vuetify from '@/plugins/vuetify'

describe('components/Core/Cards/BaseCard.vue', () => {
  test('renders the title and icon correctly', () => {
    const wrapper = mount(BaseCard, {
      props: {
        title: 'My Card',
        icon: 'mdi-test-card',
        value: 'Home',
      },
      global: {
        plugins: [createTestingPinia(), i18n, vuetify],
      },
    })

    expect(wrapper.find('[data-testid="card-icon"]').classes('mdi-test-card')).toBe(true)
    expect(wrapper.findComponent({ name: 'v-sheet' }).attributes('title')).toBe('My Card')
  })

  test('applies the correct color class when color prop is provided', () => {
    const wrapper = mount(BaseCard, {
      props: {
        title: 'Colored Card',
        icon: 'mdi-palette',
        value: 'Color',
        color: 'primary',
      },
      global: {
        plugins: [createTestingPinia(), i18n, vuetify],
      },
    })
    expect(wrapper.find('[data-testid="card-content"]').classes('text-primary')).toBe(true)
  })

  test('renders multiple values when value is an array', () => {
    const values = ['One', 'Two', 'Three']
    const wrapper = mount(BaseCard, {
      props: {
        title: 'Array Card',
        icon: 'mdi-array',
        value: values,
      },
      slots: {
        default: (props: any) => h('span', { 'data-testid': 'test-value' }, props.value),
      },
      global: {
        plugins: [createTestingPinia(), i18n, vuetify],
      },
    })

    const content = wrapper.findAll('[data-testid="test-value"]')
    expect(content).toHaveLength(values.length)
    values.forEach((val, i) => {
      expect(content[i].text()).toBe(val)
    })
  })

  test('Component renders pointer cursor when click event supplied', () => {
    const wrapper = mount(BaseCard, {
      props: {
        title: 'Clickable Card',
        icon: 'mdi-clickable',
        value: 'Click me',
        onClick: () => {},
      },
      global: {
        plugins: [createTestingPinia(), i18n, vuetify],
      },
    })

    expect(wrapper.findComponent({ name: 'v-sheet' }).classes('cursor-pointer')).toBe(true)
  })

  test('emits click event when card is clicked', async () => {
    const wrapper = mount(BaseCard, {
      props: {
        title: 'Clickable Card',
        icon: 'mdi-click',
        value: 'Click me',
      },
      global: {
        plugins: [createTestingPinia(), i18n, vuetify],
      },
    })

    await wrapper.findComponent({ name: 'v-sheet' }).trigger('click')

    const clickEvents = wrapper.emitted('click')
    expect(clickEvents).toBeTruthy()
    // @ts-expect-error: TS2532: Object is possibly undefined
    expect(wrapper.emitted('click')[0][0]).toBeInstanceOf(MouseEvent)
  })

  test('applies secondary-lighten-1 color when active is true', () => {
    const wrapper = mount(BaseCard, {
      props: {
        title: 'Active Card',
        icon: 'mdi-active',
        value: 'Active',
        active: true,
      },
      global: {
        plugins: [createTestingPinia(), i18n, vuetify],
      },
    })

    expect(wrapper.findComponent({ name: 'v-sheet' }).props('color')).toBe('secondary-lighten-1')
  })

  test('applies secondary color when active is false', () => {
    const wrapper = mount(BaseCard, {
      props: {
        title: 'Inactive Card',
        icon: 'mdi-inactive',
        value: 'Inactive',
        active: false,
      },
      global: {
        plugins: [createTestingPinia(), i18n, vuetify],
      },
    })

    expect(wrapper.findComponent({ name: 'v-sheet' }).props('color')).toBe('secondary')
  })

  test('uses flex-row class when orientation is row', () => {
    const wrapper = mount(BaseCard, {
      props: {
        title: 'Row Card',
        icon: 'mdi-row',
        value: 'Row',
        orientation: 'row',
      },
      global: {
        plugins: [createTestingPinia(), i18n, vuetify],
      },
    })

    expect(wrapper.find('div.d-flex').classes('flex-row')).toBe(true)
  })

  test('uses flex-column class when orientation is column', () => {
    const wrapper = mount(BaseCard, {
      props: {
        title: 'Column Card',
        icon: 'mdi-column',
        value: 'Column',
        orientation: 'column',
      },
      global: {
        plugins: [createTestingPinia(), i18n, vuetify],
      },
    })

    expect(wrapper.find('div.d-flex').classes('flex-column')).toBe(true)
  })

  test('renders slot content with value prop', () => {
    const wrapper = mount(BaseCard, {
      props: {
        title: 'Slot Card',
        icon: 'mdi-slot',
        value: 'SlotValue',
      },
      slots: {
        default: (props: any) => props.value,
      },
      global: {
        plugins: [createTestingPinia(), i18n, vuetify],
      },
    })

    expect(wrapper.find('[data-testid="card-content"]').text()).toBe('SlotValue')
  })
})
