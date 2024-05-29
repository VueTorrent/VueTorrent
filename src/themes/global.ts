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
  'torrent-error': '#F83E70',
  'torrent-missingFiles': '#F83E70',
  'torrent-uploading': '#4E79E6',
  'torrent-forcedUP': '#4E79E6',
  'torrent-pausedUP': '#16573E',
  'torrent-queuedUP': '#2E5EAA',
  'torrent-stalledUP': '#4ECDE6',
  'torrent-checkingUP': '#FF7043',
  'torrent-allocating': '#E5A241',
  'torrent-downloading': '#5BB974',
  'torrent-forcedDL': '#5BB974',
  'torrent-metaDL': '#7E57C2',
  'torrent-forcedMetaDL': '#7E57C2',
  'torrent-pausedDL': '#9CA3AF',
  'torrent-queuedDL': '#2E5EAA',
  'torrent-stalledDL': '#4ADE80',
  'torrent-checkingDL': '#FF7043',
  'torrent-checkingResumeData': '#FF7043',
  'torrent-moving': '#FFAA2C',
  'torrent-unknown': dark ? colors.shades.black : colors.shades.white
})
