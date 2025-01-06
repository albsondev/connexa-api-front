'use client'

import React, { useCallback, useEffect } from 'react'
import { signOut as nextAuthSignOut, useSession } from 'next-auth/react'
import { parseCookies, setCookie } from 'nookies'

function signOut() {
  nextAuthSignOut({ callbackUrl: '/login' })
}

const TokenRefreshHandler = ({ children }: { children: React.ReactNode }) => {
  const { data: session } = useSession()

  // Função para renovar o token
  const renewToken = useCallback(async () => {
    const cookies = parseCookies()
    const currentAccessToken = session?.accessToken || cookies.accessToken
    const currentRefreshToken = session?.refreshToken || cookies.refreshToken

    if (!currentAccessToken || !currentRefreshToken) {
      console.warn('Tokens não encontrados. Pular renovação por enquanto.')
      signOut()
      if (window.location.pathname !== '/login') {
        window.location.replace('/login')
        throw new Error('Erro ao renovar token. Deslogando...')
      }
      return // Evita deslogar imediatamente
    }

    try {
      const response = await fetch('/api/refresh-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${currentAccessToken}`, // Bearer token
        },
        body: JSON.stringify({ refreshToken: currentRefreshToken }), // Envia o refreshToken no body
      })

      if (!response.ok) {
        signOut()
        if (window.location.pathname !== '/login') {
          window.location.replace('/login')
          throw new Error('Erro ao renovar token. Deslogando...')
        }
      }

      const data = await response.json()

      console.log('Token renovado com sucesso:', data)

      // Atualiza os cookies com os novos valores
      const newExpiresAt = Date.now() + data.expiresIn * 1000

      setCookie(null, 'accessToken', data.accessToken, { path: '/' })
      setCookie(null, 'refreshToken', data.refreshToken, { path: '/' })
      setCookie(null, 'tokenExpiresAt', newExpiresAt.toString(), { path: '/' })

      // Atualiza os valores localmente
      if (session) {
        session.accessToken = data.accessToken
        session.refreshToken = data.refreshToken
        session.accessTokenExpires = newExpiresAt
      }
    } catch (err) {
      console.error('Erro ao renovar token:', err)
      console.warn('Pular renovação, mas manter o estado atual.')
    }
  }, [session])

  useEffect(() => {
    const cookies = parseCookies()
    const tokenExpiresAt = parseInt(cookies.tokenExpiresAt || '0', 10)
    const currentTime = Date.now()

    // Se o token já está próximo de expirar, renova imediatamente
    if (tokenExpiresAt - currentTime < 60 * 1000) {
      console.log('Token próximo da expiração, renovando imediatamente...')
      renewToken()
    }

    // Configura um intervalo para verificar o estado do token a cada 30 segundos
    const interval = setInterval(() => {
      const updatedCookies = parseCookies() // Atualiza os cookies no intervalo
      const updatedTokenExpiresAt = parseInt(updatedCookies.tokenExpiresAt || '0', 10)
      const now = Date.now()
      if (updatedTokenExpiresAt - now < 60 * 1000) {
        console.log('Token próximo da expiração, renovando...')
        renewToken()
      }
    }, 30 * 1000) // Verifica a cada 30 segundos

    return () => {
      console.log('Clearing interval.')
      clearInterval(interval)
    }
  }, [renewToken])

  return children
}

export default TokenRefreshHandler
