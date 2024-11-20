import {
  faAddressCard, faBell, faFileLines, faStar,
} from '@fortawesome/free-regular-svg-icons'
import {
  faChartPie,
  faGauge,
  faRightToBracket,
} from '@fortawesome/free-solid-svg-icons'
import React, { PropsWithChildren } from 'react'
import SidebarNavGroup from '@/components/Layout/Dashboard/Sidebar/SidebarNavGroup'
import SidebarNavItem from '@/components/Layout/Dashboard/Sidebar/SidebarNavItem'
import { getDictionary } from '@/locales/dictionary'

const SidebarNavTitle = (props: PropsWithChildren) => {
  const { children } = props

  return (
    <li className="nav-title px-3 py-2 mt-3 text-uppercase fw-bold">{children}</li>
  )
}

export default async function SidebarNav() {
  const dict = await getDictionary()
  return (
    <ul className="list-unstyled">
      <SidebarNavTitle>{dict.sidebar.items.dashboardTitle}</SidebarNavTitle>
      <SidebarNavItem icon={faGauge} href="#">{dict.sidebar.items.dashboard}</SidebarNavItem>
      <SidebarNavTitle>{dict.sidebar.items.components}</SidebarNavTitle>

      <SidebarNavItem icon={faChartPie} href="#">{dict.sidebar.items.charts}</SidebarNavItem>
      <SidebarNavItem icon={faBell} href="#">{dict.sidebar.items.notifications}</SidebarNavItem>

      <SidebarNavTitle>{dict.sidebar.items.help}</SidebarNavTitle>

      <SidebarNavGroup toggleIcon={faStar} toggleText={dict.sidebar.items.pages}>
        <SidebarNavItem icon={faRightToBracket} href="login">{dict.sidebar.items.login}</SidebarNavItem>
        <SidebarNavItem icon={faAddressCard} href="register">{dict.sidebar.items.register}</SidebarNavItem>
      </SidebarNavGroup>

      <SidebarNavItem icon={faFileLines} href="#">{dict.sidebar.items.docs}</SidebarNavItem>
    </ul>
  )
}
