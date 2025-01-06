import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import axios from 'axios'

// Função para renovar o token antes de expirar
async function refreshAccessToken(refreshToken: string) {
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user/refresh-token`, {
      refresh_token: refreshToken,
    })

    const { data } = response

    if (!data.token || !data.refresh_token || !data.expires_in) {
      throw new Error('Resposta inválida ao renovar o token.')
    }

    return {
      accessToken: data.token,
      refreshToken: data.refresh_token,
      accessTokenExpires: Date.now() + data.expires_in * 1000, // Calcula o novo timestamp
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
        email: { label: 'Email', type: 'text', placeholder: 'Digite seu email' },
        password: { label: 'Senha', type: 'password', placeholder: 'Digite sua senha' },
      },
      async authorize(credentials) {
        if (!credentials) {
          throw new Error('Credenciais não fornecidas.')
        }

        const { email, password } = credentials

        try {
          const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user/login`, {
            email,
            password,
          })

          const { data } = response

          if (!data.token || !data.refresh_token || !data.tenant_id) {
            throw new Error('Autenticação falhou. Dados incompletos.')
          }

          return {
            id: data.tenant_id,
            token: data.token,
            refresh_token: data.refresh_token,
            tenant_id: data.tenant_id,
            name: data.name,
            email,
          }
        } catch (error) {
          console.error('Erro ao autenticar:', error)
          throw new Error('Falha na autenticação.')
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: any; user?: any }) {
      console.log('JWT Callback:', token, user)
      // Durante o login inicial, salve as informações do usuário
      if (user) {
        return {
          ...token,
          accessToken: user.token,
          refreshToken: user.refresh_token,
          tenant_id: user.tenant_id,
          accessTokenExpires: Date.now() + 300 * 1000, // 5 minutos de validade
        }
      }

      // Verifica se o token ainda é válido
      if (Date.now() < token.accessTokenExpires) {
        return token
      }

      // Tenta renovar o token expirado
      console.log('Token expirado. Tentando renovar...')
      const refreshedToken = await refreshAccessToken(token.refreshToken)

      if (!refreshedToken) {
        console.error('Erro ao renovar o token.')
        return { ...token, error: 'RefreshAccessTokenError' }
      }

      return {
        ...token,
        ...refreshedToken,
      }
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          id: token.tenant_id,
          name: token.name,
          email: token.email,
        },
        accessToken: token.accessToken,
        refreshToken: token.refreshToken,
        error: token.error,
      }
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
}
