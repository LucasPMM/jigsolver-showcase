export type Language = 'pt-BR' | 'en'
export type Theme = 'light' | 'dark' | 'system'
export const resolveLanguage = (
  query: string | null,
  saved: string | null,
  browser: string
): Language => {
  return (query || saved || browser).toLowerCase().startsWith('en')
    ? 'en'
    : 'pt-BR'
}
export const resolveTheme = (value: string | null): Theme => {
  return value === 'light' || value === 'dark' ? value : 'system'
}
export const readPreference = (key: string) => {
  try {
    return localStorage.getItem(key)
  } catch {
    return null
  }
}
export const savePreference = (key: string, value: string) => {
  try {
    localStorage.setItem(key, value)
  } catch {
    /* Keep session state when storage is blocked. */
  }
}
