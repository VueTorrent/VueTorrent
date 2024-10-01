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
  'torrent-allocating': dark ? colors.deepOrange.base : colors.amber.darken1,
  'torrent-checking_disk': dark ? colors.teal.darken2 : colors.teal.accent3,
  'torrent-checking_resume_data': dark ? colors.teal.darken2 : colors.teal.accent3,
  'torrent-dl_forced': dark ? colors.lightGreen.darken4 : colors.green.accent4,
  'torrent-dl_stopped': dark ? colors.grey.base : colors.grey.base,
  'torrent-dl_queued': dark ? colors.blueGrey.darken3 : colors.blueGrey.lighten2,
  'torrent-dl_stalled': dark ? colors.lightGreen.darken1 : colors.green.accent3,
  'torrent-downloading': dark ? colors.green.darken2 : colors.lightGreen.base,
  'torrent-error': dark ? colors.red.darken4 : colors.red.accent1,
  'torrent-forced_meta_download': dark ? colors.purple.darken4 : colors.purple.lighten4,
  'torrent-meta_download': dark ? colors.purple.darken2 : colors.purple.lighten2,
  'torrent-missing_files': dark ? colors.red.darken4 : colors.red.accent1,
  'torrent-moving': dark ? colors.deepOrange.darken4 : colors.yellow.darken1,
  'torrent-ul_forced': dark ? colors.indigo.darken4 : colors.lightBlue.lighten2,
  'torrent-ul_stopped': dark ? colors.green.darken4 : colors.green.accent4,
  'torrent-ul_queued': dark ? colors.blueGrey.darken1 : colors.blueGrey.lighten3,
  'torrent-ul_stalled': dark ? colors.blue.lighten1 : colors.lightBlue.lighten3,
  'torrent-unknown': dark ? colors.grey.darken3 : colors.grey.lighten2,
  'torrent-uploading': dark ? colors.indigo.darken2 : colors.lightBlue.lighten1
})
