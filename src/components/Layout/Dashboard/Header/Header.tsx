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
import Image from 'next/image'
import LogoConnexaAPI from '@/../public/assets/brand/logo-connexa-api.png'
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
          {/* Visível apenas em telas médias ou maiores (notebooks, desktops) */}
          <Image className="d-none d-md-flex" src={LogoConnexaAPI} alt="Logo Connexa API" width={100} height={46} />

          {/* Visível apenas em telas pequenas (tablets, celulares) */}
          <Image className="d-flex d-md-none" src={LogoConnexaAPI} alt="Logo Connexa API" width={50} height={40} />
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
