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

      // Atualiza os valores localmente
      if (session) {
        session.accessToken = data.accessToken
        session.refreshToken = data.refreshToken
        session.accessTokenExpires = newExpiresAt
        setCookie(null, 'nextRefreshToken', newExpiresAt.toString(), { path: '/' })
        setCookie(null, 'remainingTime', (newExpiresAt - Date.now()).toString(), { path: '/' })
        setCookie(null, 'accessToken', data.accessToken, { path: '/' })
        setCookie(null, 'refreshToken', data.refreshToken, { path: '/' })
      }
    } catch (err) {
      console.error('Erro ao renovar token:', err)
      console.warn('Pular renovação, mas manter o estado atual.')
    }
  }, [session])

  useEffect(() => {
    setCookie(null, 'nextRefreshToken', (Date.now() + 270 * 1000).toString(), { path: '/' })
    // primeira coisa, é verificar se existe token de acesso no cookie, se existir, ele precisa ser verificado se está expirado
    const cookies = parseCookies()
    const currentExpiresAt = cookies.nextRefreshToken ? parseInt(cookies.nextRefreshToken, 10) : null

    // calcular o tempo restante do token
    const remainingTime = currentExpiresAt ? currentExpiresAt - Date.now() : null
    console.log('Tempo restante:', remainingTime)
    setCookie(null, 'remainingTime', remainingTime ? remainingTime.toString() : '', { path: '/' })

    const interval = setInterval(() => {
      if (remainingTime && remainingTime < 270 * 1000) {
        // token expirado, renovar
        console.warn('Token expirado, renovando...')
        renewToken()
      }
    }, 270 * 1000)
    // Add an empty dependency array
    return () => clearInterval(interval)
  }, [renewToken])

  return children
}

export default TokenRefreshHandler
