import colors from 'vuetify/util/colors'

export const statusColors = {
  enabled: '#4F738D',
  disabled: '#35495E'
}

export const getVariables = (dark: boolean) => ({
  // Main colors
  accent: '#64CEAA',
  upload: '#00B3FA',
  ratio: '#00B2F8',
  category: '#04669A',
  tag: '#048B9A',
  tracker: '#C97D09',
  'ratio-bad': '#eb2a2a',
  'ratio-almost': '#e78310',
  'ratio-good': '#36bd58',
  'ratio-best': '#2e78d8',

  // Active filters chip colors
  'active-global': statusColors.enabled,
  'active-global-disabled': statusColors.disabled,
  'active-text': statusColors.enabled,
  'active-text-disabled': statusColors.disabled,
  'active-status': statusColors.enabled,
  'active-status-disabled': statusColors.disabled,
  'active-category': '#04669A',
  'active-category-disabled': '#02334d',
  'active-tag': '#048B9A',
  'active-tag-disabled': '#03464f',
  'active-tracker': '#C97D09',
  'active-tracker-disabled': '#6d4504',

  // Torrent state colors
  'torrent-error': dark ? colors.red.darken4 : colors.red.accent1,
  'torrent-missingFiles': dark ? colors.red.darken4 : colors.red.accent1,
  'torrent-uploading': dark ? colors.indigo.darken2 : colors.lightBlue.lighten1,
  'torrent-forcedUP': dark ? colors.indigo.darken4 : colors.lightBlue.lighten2,
  'torrent-pausedUP': dark ? colors.green.darken4 : colors.green.accent4,
  'torrent-queuedUP': dark ? colors.blueGrey.darken1 : colors.blueGrey.lighten3,
  'torrent-stalledUP': dark ? colors.blue.lighten1 : colors.lightBlue.lighten3,
  'torrent-checkingUP': dark ? colors.teal.darken2 : colors.teal.accent3,
  'torrent-allocating': dark ? colors.deepOrange.base : colors.amber.darken1,
  'torrent-downloading': dark ? colors.green.darken2 : colors.lightGreen.base,
  'torrent-forcedDL': dark ? colors.lightGreen.darken4 : colors.green.accent4,
  'torrent-metaDL': dark ? colors.purple.darken2 : colors.purple.lighten2,
  'torrent-forcedMetaDL': dark ? colors.purple.darken4 : colors.purple.lighten4,
  'torrent-pausedDL': dark ? colors.grey.base : colors.grey.base,
  'torrent-queuedDL': dark ? colors.blueGrey.darken3 : colors.blueGrey.lighten2,
  'torrent-stalledDL': dark ? colors.lightGreen.darken1 : colors.green.accent3,
  'torrent-checkingDL': dark ? colors.teal.darken2 : colors.teal.accent3,
  'torrent-checkingResumeData': dark ? colors.teal.darken2 : colors.teal.accent3,
  'torrent-moving': dark ? colors.deepOrange.darken4 : colors.yellow.darken1,
  'torrent-unknown': dark ? colors.grey.darken3 : colors.grey.lighten2
})
