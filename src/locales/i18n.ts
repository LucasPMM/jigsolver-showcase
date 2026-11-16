import i18next from 'i18next'
import { readPreference, resolveLanguage } from '../lib/preferences'
import { en, pt } from './content'

export type { Language } from '../lib/preferences'
export { readPreference, savePreference } from '../lib/preferences'
export const initialLanguage = resolveLanguage(
  new URLSearchParams(location.search).get('lang'),
  readPreference('jigsolver-language'),
  navigator.language
)
void i18next.init({
  lng: initialLanguage,
  fallbackLng: 'pt-BR',
  resources: { 'pt-BR': { translation: pt }, en: { translation: en } },
  interpolation: { escapeValue: false },
  initImmediate: false
})
export default i18next
