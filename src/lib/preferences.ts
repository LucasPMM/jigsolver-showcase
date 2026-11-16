export type Language = 'pt-BR' | 'en'
export type Theme = 'light' | 'dark'
export const resolveLanguage = (
  query: string | null,
  saved: string | null
): Language => {
  for (const value of [query, saved]) {
    if (value?.toLowerCase().startsWith('pt')) {
      return 'pt-BR'
    }
    if (value?.toLowerCase().startsWith('en')) {
      return 'en'
    }
  }
  return 'en'
}
export const resolveTheme = (value: string | null): Theme =>
  value === 'dark' ? 'dark' : 'light'
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
