import { ThemeDefinition } from 'vuetify'
import DarkRedesigned from './dark/redesigned'
import DarkLegacy from './dark/legacy'
import DarkOled from './dark/oled'
import LightRedesigned from './light/redesigned'
import LightLegacy from './light/legacy'

const themes = [DarkLegacy, DarkRedesigned, DarkOled, LightLegacy, LightRedesigned]

export default themes.reduce(
  (obj, theme) => {
    obj[theme.id] = theme.theme
    return obj
  },
  {} as Record<string, ThemeDefinition>
)

export { themes, DarkLegacy, DarkRedesigned, DarkOled, LightLegacy, LightRedesigned }
