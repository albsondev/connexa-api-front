import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import axios from 'axios'
import { setCookie } from 'nookies'

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
            accessTokenExpires: Date.now() + 270 * 1000,
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
      const newExpiresAt = Date.now() + 270 * 1000 // 4 min 30 sec
      if (user) {
        return {
          ...token,
          accessToken: user.token,
          refreshToken: user.refresh_token,
          accessTokenExpires: (user as any).accessTokenExpires,
          tenant_id: user.tenant_id,
          localStorage: {
            accessToken: user.accessToken,
            refreshToken: user.refreshToken,
            quandoEhQueExpira: newExpiresAt,
          },
        }
      }

      return {
        ...token,
        accessToken: token.accessToken,
        refreshToken: token.refreshToken,
        accessTokenExpires: token.accessTokenExpires,
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
