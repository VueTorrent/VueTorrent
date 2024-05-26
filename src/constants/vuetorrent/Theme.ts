type Theme = LightTheme | DarkTheme

enum LightTheme {
  DEFAULT = 'light-default',
  ALT = 'light-alt'
}

enum DarkTheme {
  DEFAULT = 'dark-default',
  ALT = 'dark-alt'
}

export {
  LightTheme,
  DarkTheme
}

export type { Theme }