export const THEMES = {
  light: 'light',
  dark: 'dark',
  system: 'system',
}

export function isTheme(theme: unknown): boolean {
  return typeof theme === 'string' && Object.values(THEMES).includes(theme)
}
