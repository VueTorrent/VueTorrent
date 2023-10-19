/**
 * Check if user is on Windows
 */
export const isWindows = window.navigator.userAgent.toLowerCase().includes('windows')

/**
 * Check if user is on MAC
 */
export const isMac = window.navigator.userAgent.toLowerCase().includes('mac')

/**
 * Check Ctrl/Cmd key
 */
export function doesCommand(e: KeyboardEvent | MouseEvent | TouchEvent): boolean {
  return isMac ? e.metaKey : e.ctrlKey
}
