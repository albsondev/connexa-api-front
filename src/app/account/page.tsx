import React from 'react'
import { getDictionary } from '@/locales/dictionary'
import ClientSessionProvider from '@/components/Form/ClientSessionProvider'

export default async function Page() {
  const dict = await getDictionary()

  return (
    <ClientSessionProvider dict={dict} />
  )
}
