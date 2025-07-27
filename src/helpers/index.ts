import { getColorFromName, getRatioColor, getTorrentStateColor, getTorrentStateValue } from './colors'
import comparators, { Comparator, isObjectEqual } from './comparators'
import { formatData, formatDataUnit, formatDataValue } from './data'
import { formatDuration, formatEta, formatTimeMs, formatTimeSec } from './datetime'
import { arrayRemove } from './misc'
import { formatPercent, toPrecision, safeDiv } from './number'
import { basename, getExtType, getFileIcon, getTypeIcon, splitExt } from './path'
import { formatSpeed, formatSpeedUnit, formatSpeedValue } from './speed'
import { doesCommand, downloadFile, isMac, isWindows, openLink } from './system'
import { capitalize, codeToFlag, containsUrl, extractHostname, getDomainBody, isValidUri, normalize, splitByUrl, titleCase } from './text'

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
  formatEta,
  formatTimeMs,
  formatTimeSec,
  formatDuration,
  arrayRemove,
  toPrecision,
  formatPercent,
  safeDiv,
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
  normalize,
}

export type { Comparator }
