import { getColorFromName, getRatioColor, getTorrentStateColor, getTorrentStateValue } from './colors'
import comparators, { Comparator, isObjectEqual } from './comparators'
import { formatDataValue, formatDataUnit, formatData } from './data'
import { QBIT_MAX_ETA, INFINITY_SYMBOL, formatEta, formatTimeMs, formatTimeSec, formatDuration } from './datetime'
import { arrayRemove } from './misc'
import { toPrecision, formatPercent } from './number'
import { basename, splitExt, getFileIcon, getExtType, getTypeIcon } from './path'
import { formatSpeedValue, formatSpeedUnit, formatSpeed } from './speed'
import { isWindows, isMac, doesCommand, openLink, downloadFile } from './system'
import { titleCase, capitalize, extractHostname, getDomainBody, splitByUrl, containsUrl, isValidUri, codeToFlag, normalize } from './text'

export {
  getColorFromName,
  getRatioColor,
  getTorrentStateColor,
  getTorrentStateValue,
  comparators,
  isObjectEqual,
  formatDataValue,
  formatDataUnit,
  formatData,
  QBIT_MAX_ETA,
  INFINITY_SYMBOL,
  formatEta,
  formatTimeMs,
  formatTimeSec,
  formatDuration,
  arrayRemove,
  toPrecision,
  formatPercent,
  basename,
  splitExt,
  getFileIcon,
  getExtType,
  getTypeIcon,
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
  isValidUri,
  codeToFlag,
  normalize
}

export type { Comparator }
