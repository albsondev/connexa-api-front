'use client'

import Cookies from 'js-cookie'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Dropdown, DropdownItem, DropdownMenu, DropdownToggle, NavLink,
} from 'react-bootstrap'
import FlagWithIcon from './FlagWithIcon'

export default function HeaderLocale({ currentLocale }: { currentLocale: string }) {
  const [locale, setLocale] = useState(currentLocale)
  const router = useRouter()

  const changeLocale = (loc: string) => {
    Cookies.set('locale', loc)
    setLocale(loc)
    router.refresh()
  }

  return (
    <Dropdown>
      <DropdownToggle className="px-2 mx-1 px-sm-3 mx-sm-0" as={NavLink} bsPrefix="hide-caret" id="dropdown-locale">
        <FlagWithIcon code={currentLocale} alt={currentLocale} iconSize="2x" />
      </DropdownToggle>
      <DropdownMenu className="pt-0" align="end">
        <DropdownItem active={locale === 'br'} onClick={() => changeLocale('br')}>
          Português
        </DropdownItem>
        <DropdownItem active={locale === 'en'} onClick={() => changeLocale('en')}>
          English
        </DropdownItem>
        <DropdownItem active={locale === 'sp'} onClick={() => changeLocale('sp')}>
          Español
        </DropdownItem>
        <DropdownItem active={locale === 'jp'} onClick={() => changeLocale('jp')}>
          日本語
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}
