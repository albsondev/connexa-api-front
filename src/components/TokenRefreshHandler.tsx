'use client'

import React, { useCallback, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { parseCookies, setCookie } from 'nookies'

function signOut() {
  window.sessionStorage.clear()
  window.localStorage.removeItem('next-auth.session-token')
  window.localStorage.removeItem('next-auth.callback-url')
  window.localStorage.removeItem('next-auth.csrf-token')
  window.localStorage.removeItem('next-auth.csrf-token-expiration')
  setCookie(null, 'accessToken', '', { path: '/' })
  setCookie(null, 'refreshToken', '', { path: '/' })
  setCookie(null, 'tokenExpiresAt', '', { path: '/' })
  setCookie(null, 'next-auth.csrf-token', '', { path: '/' })

  if (window.location.pathname === '/login') {
    return
  }

  setTimeout(() => {
    const headerLogout = document.querySelector('.header-logout') as HTMLElement
    if (headerLogout) {
      headerLogout.click()
    }
  }, 1000)
}

const TokenRefreshHandler = ({ children }: { children: React.ReactNode }) => {
  const { data: session } = useSession()

  const renewToken = useCallback(async () => {
    const cookies = parseCookies()
    const currentAccessToken = session?.accessToken || cookies.accessToken
    const currentRefreshToken = session?.refreshToken || cookies.refreshToken

    if (!currentAccessToken || !currentRefreshToken) {
      console.warn('Tokens não encontrados. Pular renovação por enquanto.')
      signOut()
      return false
    }

    try {
      const response = await fetch('/api/refresh-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${currentAccessToken}`,
        },
        body: JSON.stringify({ refreshToken: currentRefreshToken }),
      })

      if (!response.ok) {
        signOut()
        throw new Error('Erro ao renovar token. Deslogando...')
      }

      const data = await response.json()

      // Atualiza os cookies com os novos valores
      const newExpiresAt = Date.now() + 270 * 1000

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
      renewToken()
    }

    // Configura um intervalo para verificar o estado do token a cada 30 segundos
    const interval = setInterval(() => {
      const updatedCookies = parseCookies()
      const updatedTokenExpiresAt = parseInt(updatedCookies.tokenExpiresAt || '0', 10)
      const now = Date.now()
      if (updatedTokenExpiresAt - now < 60 * 1000) {
        renewToken()
      }
    }, 30 * 1000) // Verifica a cada 30 segundos

    return () => {
      clearInterval(interval)
    }
  }, [renewToken])

  return children
}

export default TokenRefreshHandler
