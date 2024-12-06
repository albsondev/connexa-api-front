'use client'

import React, { useEffect, useState } from 'react'
import classNames from 'classnames'
import { useSidebar } from '@/components/Layout/Dashboard/SidebarProvider'
import LogoConnexaAPI from '@/../public/assets/brand/logo-connexa-api.png'
import Image from 'next/image'

export default function Sidebar({ children }: { children: React.ReactNode }) {
  const [isNarrow, setIsNarrow] = useState(false)

  const { showSidebarState: [isShowSidebar] } = useSidebar()

  useEffect(() => {
    if (localStorage.getItem('isNarrow')) {
      setIsNarrow(localStorage.getItem('isNarrow') === 'true')
    }
  }, [setIsNarrow])

  return (
    <div
      className={classNames('sidebar d-flex flex-column position-fixed h-100 border-end', {
        'sidebar-narrow': isNarrow,
        show: isShowSidebar,
      })}
      id="sidebar"
    >
      {/* Visível apenas em telas médias ou maiores (notebooks, desktops) */}
      <div className="sidebar-brand d-none d-md-flex align-items-center justify-content-center">
        <Image className="p-2" src={LogoConnexaAPI} alt="Logo Connexa API" width={80} height={70} />
      </div>

      {/* Visível apenas em telas pequenas (tablets, celulares) */}
      <div className="sidebar-brand d-flex d-md-none align-items-center justify-content-center">
        <Image className="p-1" src={LogoConnexaAPI} alt="Logo Connexa API" width={70} height={55} />
      </div>

      <div className="sidebar-nav flex-fill border-top">
        {children}
      </div>
    </div>
  )
}
