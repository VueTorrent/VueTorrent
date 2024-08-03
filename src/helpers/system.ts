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
export function doesCommand(e: { metaKey: boolean; ctrlKey: boolean }): boolean {
  return isMac ? e.metaKey : e.ctrlKey
}

export function openLink(link: string) {
  window.open(link, '_blank', 'noreferrer')
}
