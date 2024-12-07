import {
  faAddressCard, faFileLines, faStar,
} from '@fortawesome/free-regular-svg-icons'
import {
  faCog,
  faGauge,
  faLaptop,
  faRightToBracket,
} from '@fortawesome/free-solid-svg-icons'
import React, { PropsWithChildren } from 'react'
import SidebarNavGroup from '@/components/Layout/Dashboard/Sidebar/SidebarNavGroup'
import SidebarNavItem from '@/components/Layout/Dashboard/Sidebar/SidebarNavItem'
import { getDictionary } from '@/locales/dictionary'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/app/api/auth/option'

const SidebarNavTitle = (props: PropsWithChildren) => {
  const { children } = props

  return (
    <li className="nav-title px-3 py-2 mt-3 text-uppercase fw-bold">{children}</li>
  )
}

const SidebarNavInfoUser = (props: PropsWithChildren) => {
  const { children } = props

  return (
    <li className="nav-title nav-title-info-user mt-2 lh-1 py-2 text-center">{children}</li>
  )
}

export default async function SidebarNav() {
  const dict = await getDictionary()
  const session = await getServerSession(authOptions) // Obtém a sessão do NextAuth
  const userEmail = session?.user?.email ?? 'Usuário Desconhecido' // Obtem o e-mail do usuário logado

  return (
    <ul className="list-unstyled">
      <SidebarNavInfoUser>{userEmail}</SidebarNavInfoUser>
      {' '}
      {/* Exibe o e-mail do usuário */}
      <SidebarNavTitle>{dict.sidebar.items.dashboardTitle}</SidebarNavTitle>
      <SidebarNavItem icon={faGauge} href="/">{dict.sidebar.items.dashboard}</SidebarNavItem>
      <SidebarNavItem icon={faLaptop} href="/instances">{dict.sidebar.items.webInstances}</SidebarNavItem>
      <SidebarNavItem icon={faCog} href="/account">{dict.sidebar.items.accountData}</SidebarNavItem>

      <SidebarNavTitle>{dict.sidebar.items.help}</SidebarNavTitle>

      <SidebarNavGroup toggleIcon={faStar} toggleText={dict.sidebar.items.pages}>
        <SidebarNavItem icon={faRightToBracket} href="login">{dict.sidebar.items.login}</SidebarNavItem>
        <SidebarNavItem icon={faAddressCard} href="register">{dict.sidebar.items.register}</SidebarNavItem>
      </SidebarNavGroup>

      <SidebarNavItem icon={faFileLines} href="#">{dict.sidebar.items.docs}</SidebarNavItem>
    </ul>
  )
}
