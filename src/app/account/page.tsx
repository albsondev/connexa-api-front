import AccountData from '@/components/Form/AccountData'
import React from 'react'
import { getDictionary } from '@/locales/dictionary'

export default async function Page() {
  const dict = await getDictionary()

  return (
    <div>
      <AccountData dict={dict} />
    </div>
  )
}
