import { useCallback, useEffect } from 'react'
import { signOut, useSession } from 'next-auth/react'

export const useAuth = () => {
  const { data: session } = useSession()

  const renewAccessToken = useCallback(async () => {
    try {
      const response = await fetch('/api/refresh-token', { method: 'POST' })
      if (response.ok) {
        console.log('Token renovado com sucesso')
      } else {
        console.warn('Falha ao renovar o token. Redirecionando para o login...')
        signOut()
        if (window.location.pathname !== '/login') {
          window.location.replace('/login')
        }
      }
    } catch (error) {
      console.error('Erro ao tentar renovar o token:', error)
      signOut()
      if (window.location.pathname !== '/login') {
        window.location.replace('/login')
      }
    }
  }, [])

  const checkSession = useCallback(async () => {
    if (!session) {
      console.warn('Sessão não disponível. Redirecionando para o login...')
      signOut()
      if (window.location.pathname !== '/login') {
        window.location.replace('/login')
      }
      return false
    }
    return true
  }, [session])

  useEffect(() => {
    checkSession()
  }, [checkSession])

  return { session, renewAccessToken, checkSession }
}
