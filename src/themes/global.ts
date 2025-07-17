import { amber, blue, blueGrey, deepOrange, green, grey, indigo, lightBlue, lightGreen, purple, red, teal, yellow } from 'vuetify/util/colors'

export const statusColors = {
  enabled: '#4F738D',
  disabled: '#35495E',
}

export function getVariables(dark: boolean) {
  return {
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
    'torrent-allocating': dark ? deepOrange.base : amber.darken1,
    'torrent-checking_disk': dark ? teal.darken2 : teal.accent3,
    'torrent-checking_resume_data': dark ? teal.darken2 : teal.accent3,
    'torrent-dl_forced': dark ? lightGreen.darken4 : green.accent4,
    'torrent-dl_stopped': dark ? grey.base : grey.base,
    'torrent-dl_queued': dark ? blueGrey.darken3 : blueGrey.lighten2,
    'torrent-dl_stalled': dark ? lightGreen.darken1 : green.accent3,
    'torrent-downloading': dark ? green.darken2 : lightGreen.base,
    'torrent-error': dark ? red.darken4 : red.accent1,
    'torrent-forced_meta_download': dark ? purple.darken4 : purple.lighten4,
    'torrent-meta_download': dark ? purple.darken2 : purple.lighten2,
    'torrent-missing_files': dark ? red.darken4 : red.accent1,
    'torrent-moving': dark ? deepOrange.darken4 : yellow.darken1,
    'torrent-ul_forced': dark ? indigo.darken4 : lightBlue.lighten2,
    'torrent-ul_stopped': dark ? green.darken4 : green.accent4,
    'torrent-ul_queued': dark ? blueGrey.darken1 : blueGrey.lighten3,
    'torrent-ul_stalled': dark ? blue.lighten1 : lightBlue.lighten3,
    'torrent-unknown': dark ? grey.darken3 : grey.lighten2,
    'torrent-uploading': dark ? indigo.darken2 : lightBlue.lighten1,
  }
}
