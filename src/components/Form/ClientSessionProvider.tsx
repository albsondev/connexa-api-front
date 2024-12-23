'use client'

import React from 'react'
import { SessionProvider } from 'next-auth/react'
import AccountData from '@/components/Form/AccountData'

interface ClientSessionProviderProps {
  dict: any;
  children?: React.ReactNode;
}

const ClientSessionProvider: React.FC<ClientSessionProviderProps> = ({ dict, children }) => (
  <SessionProvider>
    <AccountData dict={dict} />
    {children}
  </SessionProvider>
)

export default ClientSessionProvider
