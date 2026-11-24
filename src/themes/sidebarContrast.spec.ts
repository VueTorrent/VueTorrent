import { readability } from '@ctrl/tinycolor'
import { describe, expect, test } from 'vitest'
import themes from '.'
import vuetify from '@/plugins/vuetify'

describe('sidebar statistic colours', () => {
  test.each(Object.keys(themes))('%s keeps normal-sized values readable on inactive and selected cards', name => {
    const colors = vuetify.theme.computedThemes.value[name].colors
    const background = colors.secondary
    const selectedBackground = colors['secondary-lighten-1']

    for (const colour of ['sidebar-download', 'sidebar-upload', 'sidebar-warning']) {
      expect(readability(colors[colour], background)).toBeGreaterThanOrEqual(4.5)
    }

    expect(readability('#FFFFFF', selectedBackground)).toBeGreaterThanOrEqual(4.5)
  })
})
