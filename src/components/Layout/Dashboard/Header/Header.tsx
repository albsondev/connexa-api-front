import Link from 'next/link'
import { Container, NavLink } from 'react-bootstrap'
import HeaderSidebarToggler from '@/components/Layout/Dashboard/Header/HeaderSidebarToggler'
import HeaderFeaturedNav from '@/components/Layout/Dashboard/Header/HeaderFeaturedNav'
import HeaderFlagNav from '@/components/Layout/Dashboard/Header/HeaderFlagNav'
import Breadcrumb from '@/components/Layout/Dashboard/Breadcrumb/Breadcrumb'
import './Header.scss'
import { getDictionary } from '@/locales/dictionary'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { PropsWithChildren } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPowerOff } from '@fortawesome/free-solid-svg-icons'
import HeaderLogout from './HeaderLogout'

type ItemWithIconProps = {
  icon: IconDefinition;
} & PropsWithChildren

const ItemWithIcon = (props: ItemWithIconProps) => {
  const { icon, children } = props

  return (
    <>
      <FontAwesomeIcon className="me-2" icon={icon} fixedWidth />
      {children}
    </>
  )
}

export default async function Header() {
  const dict = await getDictionary()
  return (
    <header className="header sticky-top mb-4 py-2 px-sm-2 border-bottom">
      <Container fluid className="header-navbar d-flex align-items-center px-0">
        <HeaderSidebarToggler />
        <Link href="/" className="header-brand d-md-none">
          <svg width="80" height="46">
            <title>CoreUI Logo</title>
            <use xlinkHref="/assets/brand/coreui.svg#full" />
          </svg>
        </Link>
        <div className="header-nav d-none d-md-flex">
          <HeaderFeaturedNav />
        </div>
        <div className="header-nav ms-auto">
          <HeaderFlagNav />
        </div>
        <div>
          <HeaderLogout>
            <Link href="/" passHref legacyBehavior>
              <NavLink className="p-2">
                <ItemWithIcon icon={faPowerOff}>{dict.profile.logout}</ItemWithIcon>
              </NavLink>
            </Link>
          </HeaderLogout>
        </div>
      </Container>
      <div className="header-divider border-top my-2 mx-sm-n2" />
      <Container fluid>
        <Breadcrumb />
      </Container>
    </header>
  )
}