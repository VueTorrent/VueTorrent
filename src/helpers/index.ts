import { getColorFromName } from './colors'
import { formatDataValue, formatDataUnit, formatData } from './data'
import { formatEta } from './datetime'
import { toPrecision, formatPercent } from './number'
import { formatSpeedValue, formatSpeedUnit, formatSpeed } from './speed'
import { isWindows, isMac, doesCommand } from './system'
import { titleCase, capitalize, extractHostname, getDomainBody, splitByUrl, stringContainsUrl, codeToFlag } from './text'

export {
  getColorFromName,
  formatDataValue,
  formatDataUnit,
  formatData,
  formatEta,
  toPrecision,
  formatPercent,
  formatSpeedValue,
  formatSpeedUnit,
  formatSpeed,
  isWindows,
  isMac,
  doesCommand,
  titleCase,
  capitalize,
  extractHostname,
  getDomainBody,
  splitByUrl,
  stringContainsUrl,
  codeToFlag
}
