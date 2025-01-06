'use client'

import React from 'react'
import { SessionProvider } from 'next-auth/react'
import TokenRefreshHandler from './TokenRefreshHandler'

const SessionProviderWrapper = ({ children }: { children: React.ReactNode }) => (
  <SessionProvider>
    <TokenRefreshHandler>{children}</TokenRefreshHandler>
  </SessionProvider>
)

export default SessionProviderWrapper
