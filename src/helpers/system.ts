/**
 * Check if user is on MAC
 */
export function isMac(): boolean {
  return window.navigator.userAgent.toUpperCase().indexOf('MAC') >= 0
}

/**
 * Check Ctrl/Cmd key
 */
export function doesCommand(e: KeyboardEvent): boolean {
  return isMac() ? e.metaKey : e.ctrlKey
}