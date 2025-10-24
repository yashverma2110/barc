import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Detect if user is on Mac
export function isMac(): boolean {
  if (typeof navigator === 'undefined') return false
  return /Mac|iPhone|iPad|iPod/.test(navigator.platform) || /Mac/.test(navigator.userAgent)
}

// Get the appropriate modifier key for the current OS
export function getModifierKey(): string {
  return isMac() ? 'Cmd' : 'Ctrl'
}

// Get the appropriate modifier key symbol for the current OS
export function getModifierKeySymbol(): string {
  return isMac() ? '⌘' : 'Ctrl'
}
