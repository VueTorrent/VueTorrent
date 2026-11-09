import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it } from 'vitest'
import { reactive } from 'vue'
import { VCombobox } from 'vuetify/components'
import AddTorrentParamsForm from './AddTorrentParamsForm.vue'
import i18n from '@/plugins/i18n'
import vuetify from '@/plugins/vuetify'
import { useCategoryStore } from '@/stores'
import { AddTorrentParams } from '@/types/qbit/models'

const DEFAULT_SAVE_PATH = '/downloads'
const TV_SAVE_PATH = '/media/tv'
const MUSIC_SAVE_PATH = '/media/music'
const TYPED_SAVE_PATH = '/downloads/special'

describe('AddTorrentParamsForm.vue', () => {
  let pinia: ReturnType<typeof createTestingPinia>

  beforeEach(() => {
    pinia = createTestingPinia({
      stubActions: false,
      initialState: {
        preferences: { preferences: { save_path: DEFAULT_SAVE_PATH } },
      },
    })
    useCategoryStore().syncFromMaindata(true, [
      ['TV', { name: 'TV', savePath: TV_SAVE_PATH }],
      ['Music', { name: 'Music', savePath: MUSIC_SAVE_PATH }],
    ])
  })

  function mountForm(initial: AddTorrentParams = {}) {
    const form = reactive<AddTorrentParams>({ save_path: DEFAULT_SAVE_PATH, use_auto_tmm: false, ...initial })
    const wrapper = mount(AddTorrentParamsForm, {
      props: { modelValue: form },
      global: { plugins: [pinia, i18n, vuetify] },
    })
    const categoryField = wrapper.findAllComponents(VCombobox).find(c => c.props('autocomplete') === 'categories')!
    const savePathInput = wrapper.findComponent({ ref: 'savePathField' }).find('input:not([type="hidden"])')
    return { form, categoryField, savePathInput }
  }

  it('keeps a typed save path when the category changes with ATM off', async () => {
    const { form, categoryField, savePathInput } = mountForm({ category: 'TV', save_path: TV_SAVE_PATH })
    await savePathInput.setValue(TYPED_SAVE_PATH)
    expect(form.save_path).toBe(TYPED_SAVE_PATH)

    await categoryField.setValue('Music')
    expect(form.category).toBe('Music')
    expect(form.save_path).toBe(TYPED_SAVE_PATH)
  })

  it('keeps a typed save path when the category is cleared with ATM off', async () => {
    const { form, categoryField, savePathInput } = mountForm({ category: 'TV', save_path: TV_SAVE_PATH })
    await savePathInput.setValue(TYPED_SAVE_PATH)

    await categoryField.setValue(null)
    expect(form.category).toBeUndefined()
    expect(form.save_path).toBe(TYPED_SAVE_PATH)
  })

  it('fills in the category save path when nothing was typed', async () => {
    const { form, categoryField } = mountForm()

    await categoryField.setValue('TV')
    expect(form.save_path).toBe(TV_SAVE_PATH)

    await categoryField.setValue('Music')
    expect(form.save_path).toBe(MUSIC_SAVE_PATH)
  })

  it('follows the category save path with ATM on, even after typing', async () => {
    const { form, categoryField, savePathInput } = mountForm()
    await savePathInput.setValue(TYPED_SAVE_PATH)
    form.use_auto_tmm = true

    await categoryField.setValue('Music')
    expect(form.save_path).toBe(MUSIC_SAVE_PATH)
  })

  it('fills in the category save path again after the typed path is cleared', async () => {
    const { form, categoryField, savePathInput } = mountForm()
    await savePathInput.setValue(TYPED_SAVE_PATH)
    await savePathInput.setValue('')

    await categoryField.setValue('Music')
    expect(form.save_path).toBe(MUSIC_SAVE_PATH)
  })
})
