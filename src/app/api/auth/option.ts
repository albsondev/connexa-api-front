import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import axios from 'axios'
import { setCookie } from 'nookies'

// Função para renovar o token de acesso
async function refreshAccessToken(refreshToken: string) {
  try {
    const response = await axios.post('/api/refresh-token', { refreshToken })
    const { data } = response

    if (!data.accessToken || !data.refreshToken || !data.expiresIn) {
      throw new Error('Resposta inválida ao renovar o token.')
    }

    const newExpiresAt = Date.now() + data.expiresIn * 1000

    // Armazenando nos cookies
    setCookie(null, 'accessToken', data.accessToken, { path: '/' })
    setCookie(null, 'refreshToken', data.refreshToken, { path: '/' })
    setCookie(null, 'tokenExpiresAt', newExpiresAt.toString(), { path: '/' })

    console.log('Token renovado, novo expires at:', new Date(newExpiresAt).toLocaleTimeString())

    return {
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
      accessTokenExpires: newExpiresAt,
    }
  } catch (error) {
    console.error('Erro ao renovar o token:', error)
    return null
  }
}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 24 * 7, // 7 dias
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials) {
          throw new Error('Credenciais não fornecidas.')
        }

        const { email, password } = credentials

        try {
          const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user/login`, { email, password })
          const { data } = response

          if (!data.token || !data.refresh_token || !data.tenant_id) {
            throw new Error('Falha na autenticação.')
          }

          const newExpiresAt = Date.now() + 270 * 1000 // 4 min 30 sec

          // Armazenando nos cookies
          setCookie(null, 'accessToken', data.token, { path: '/' })
          setCookie(null, 'refreshToken', data.refresh_token, { path: '/' })
          setCookie(null, 'tokenExpiresAt', newExpiresAt.toString(), { path: '/' })

          console.log('Login bem-sucedido, token expires at:', new Date(newExpiresAt).toLocaleTimeString())

          return {
            id: data.tenant_id,
            token: data.token,
            refresh_token: data.refresh_token,
            tenant_id: data.tenant_id,
            name: data.name,
            email,
            accessTokenExpires: newExpiresAt,
            accessToken: data.token,
            refreshToken: data.refresh_token,
          }
        } catch (error) {
          console.error('Erro durante a autenticação:', error)
          throw new Error('Falha na autenticação.')
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // Cria um novo token com as propriedades desejadas
        console.log('Novo token criado:', user)
        return {
          ...token,
          accessToken: user.token,
          refreshToken: user.refresh_token,
          accessTokenExpires: (user as any).accessTokenExpires,
          tenant_id: user.tenant_id,
        }
      }

      // Verifica se o token ainda é válido
      if (token.accessTokenExpires && Date.now() < token.accessTokenExpires) {
        return token
      }

      console.log('Access token expirado, renovando...')
      const refreshedToken = await refreshAccessToken(token.refreshToken || '')

      if (!refreshedToken) {
        return { ...token, error: 'RefreshAccessTokenError' }
      }

      return {
        ...token,
        accessToken: refreshedToken.accessToken,
        refreshToken: refreshedToken.refreshToken,
        accessTokenExpires: refreshedToken.accessTokenExpires,
        tenant_id: token.tenant_id,
      }
    },
    async session({ session, token }) {
      return {
        ...session,
        accessToken: token.accessToken,
        refreshToken: token.refreshToken,
        accessTokenExpires: token.accessTokenExpires,
        tenant_id: token.tenant_id,
      }
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
}
