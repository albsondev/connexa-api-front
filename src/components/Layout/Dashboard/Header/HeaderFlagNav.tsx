import {
  Nav,
  NavItem,
} from 'react-bootstrap'
import React from 'react'
import HeaderLocale from '@/components/Layout/Dashboard/Header/HeaderLocale'
import { getLocale } from '@/locales/dictionary'

export default async function HeaderFlagNav() {
  return (
    <Nav>
      <NavItem className="d-none d-sm-block">
        <HeaderLocale currentLocale={getLocale()} />
      </NavItem>
    </Nav>
  )
}
