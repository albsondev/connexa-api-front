import i18next from 'i18next'
import jaTranslation from 'zod-i18n-map/locales/ja/zod.json'
import enTranslation from 'zod-i18n-map/locales/en/zod.json'
import spTranslation from 'zod-i18n-map/locales/es/zod.json'
import brTranslation from 'zod-i18n-map/locales/pt/zod.json'
import { makeZodI18nMap } from 'zod-i18n-map'
import { z } from 'zod'
import { getLocale } from '@/locales/dictionary'

const br = i18next.createInstance()
br.init({
  lng: 'br',
  resources: {
    br: { zod: brTranslation },
  },
})

const ja = i18next.createInstance()
ja.init({
  lng: 'jp',
  resources: {
    ja: { zod: jaTranslation },
  },
})

const en = i18next.createInstance()
en.init({
  lng: 'en',
  resources: {
    en: { zod: enTranslation },
  },
})

const sp = i18next.createInstance()
sp.init({
  lng: 'es',
  resources: {
    sp: { zod: spTranslation },
  },
})

const zodMap = {
  en: makeZodI18nMap({ t: en.t }),
  jp: makeZodI18nMap({ t: ja.t }),
  sp: makeZodI18nMap({ t: sp.t }),
  br: makeZodI18nMap({ t: br.t }),
}

z.setErrorMap((err, ctx) => zodMap[getLocale()](err, ctx))

export { z }
