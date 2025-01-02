import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import axios from 'axios'

interface CustomUser {
  token: string;
  refresh_token: string;
  expires_in: number;
  name: string;
  email: string;
  tenant_id: string;
}

async function refreshAccessToken(refreshToken: string) {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
      { refresh_token: refreshToken },
      { headers: { 'Content-Type': 'application/json' } },
    )

    const { data } = response

    return {
      accessToken: data.access_token,
      refreshToken: data.refresh_token ?? refreshToken,
      accessTokenExpires: Date.now() + (data.expires_in as number) * 1000,
      user: data.user,
    }
  } catch (error) {
    console.error('Erro ao renovar o token:', error)
    return null
  }
}

declare module 'next-auth' {
  interface User {
    token: string;
    refresh_token: string;
    expires_in: number;
    tenant_id: string;
  }
}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const customUser = user as unknown as CustomUser
        return {
          ...token,
          accessToken: customUser.token,
          refreshToken: customUser.refresh_token,
          accessTokenExpires: Date.now() + customUser.expires_in * 1000,
          user: {
            name: customUser.name,
            email: customUser.email,
            tenant_id: customUser.tenant_id,
          },
        }
      }

      if (Date.now() < (token.accessTokenExpires as number)) {
        return token
      }

      const refreshedToken = await refreshAccessToken(token.refreshToken as string)

      if (!refreshedToken) {
        return {
          ...token,
          error: 'RefreshAccessTokenError',
        }
      }

      return {
        ...token,
        ...refreshedToken,
      }
    },

    async session({ session, token }) {
      return {
        ...session,
        user: token.user ?? session.user,
        accessToken: token.accessToken,
        error: token.error,
        tenant_id: token.tenant_id,
      }
    },
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: { type: 'email', label: 'Email', placeholder: 'Digite seu email' },
        password: { type: 'password', label: 'Senha', placeholder: 'Digite sua senha' },
      },
      async authorize(credentials) {
        if (!credentials) return null

        const { email, password } = credentials

        try {
          const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user/login`, {
            email,
            password,
          })

          const { data } = response

          if (!data.token) {
            console.error('Token não encontrado no retorno da API')
            return null
          }

          return {
            id: data.id,
            tenant_id: data.tenant_id,
            token: data.token,
            refresh_token: data.refresh_token,
            expires_in: data.expires_in,
            name: data.name,
            email,
            user: {
              tenant_id: data.tenant_id,
            },
          }
        } catch (error) {
          console.error('Erro ao autenticar:', error)
          return null
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
}
