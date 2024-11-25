import Link from 'next/link'
import { Nav, NavItem, NavLink } from 'react-bootstrap'
import { getDictionary } from '@/locales/dictionary'

export default async function HeaderFeaturedNav() {
  const dict = await getDictionary()
  return (
    <Nav>
      <NavItem>
        <Link href="/" passHref legacyBehavior>
          <NavLink className="p-2">{dict.featured_nav.dashboard}</NavLink>
        </Link>
      </NavItem>
      <small className="d-none d-sm-block text-secondary mt-2 pt-1 lh-normal text-small">{dict.featured_nav.title}</small>
    </Nav>
  )
}
