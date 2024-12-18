import '@/styles/globals.scss'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import DictionaryProvider from '@/locales/DictionaryProvider'
import { getDictionary } from '@/locales/dictionary'
import getTheme from '@/themes/theme'
import ProgressBar from '@/components/ProgressBar/ProgressBar'
import SessionProviderWrapper from '@/components/SessionProviderWrapper'

config.autoAddCss = false

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const dictionary = await getDictionary()

  return (
    <html lang="pt" data-bs-theme={getTheme()}>
      <body>
        <ProgressBar />
        <DictionaryProvider dictionary={dictionary}>
          <SessionProviderWrapper>
            {children}
          </SessionProviderWrapper>
        </DictionaryProvider>
      </body>
    </html>
  )
}
