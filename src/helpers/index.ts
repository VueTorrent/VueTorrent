import { getColorFromName, getRatioColor, getTorrentStateColor, getTorrentStateValue } from './colors'
import comparators, { Comparator } from './comparators'
import { formatDataValue, formatDataUnit, formatData } from './data'
import { formatEta, formatTimeMs, formatTimeSec, formatDuration } from './datetime'
import { toPrecision, formatPercent } from './number'
import { basename } from './path'
import { formatSpeedValue, formatSpeedUnit, formatSpeed } from './speed'
import { isWindows, isMac, doesCommand, openLink, downloadFile } from './system'
import { titleCase, capitalize, extractHostname, getDomainBody, splitByUrl, containsUrl, isValidUrl, codeToFlag } from './text'

export {
  getColorFromName,
  getRatioColor,
  getTorrentStateColor,
  getTorrentStateValue,
  comparators,
  formatDataValue,
  formatDataUnit,
  formatData,
  formatEta,
  formatTimeMs,
  formatTimeSec,
  formatDuration,
  toPrecision,
  formatPercent,
  basename,
  formatSpeedValue,
  formatSpeedUnit,
  formatSpeed,
  isWindows,
  isMac,
  doesCommand,
  openLink,
  downloadFile,
  titleCase,
  capitalize,
  extractHostname,
  getDomainBody,
  splitByUrl,
  containsUrl,
  isValidUrl,
  codeToFlag
}

export type { Comparator }
