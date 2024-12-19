import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  callbacks: {
    async jwt({ user, token }) {
      const newToken = { ...token }

      if (user) {
        newToken.user = user
        newToken.accessToken = user.token ?? token.accessToken
      }

      return newToken
    },

    async session({ session, token }) {
      const newSession = { ...session }
      newSession.user = token.user ?? session.user
      newSession.accessToken = token.accessToken ?? session.accessToken
      return newSession
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
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
          })

          if (!response.ok) {
            console.error(`Erro de login: ${response.status} - ${response.statusText}`)
            return null
          }

          const data = await response.json()

          if (!data.token) {
            console.error('Token não encontrado no retorno da API')
            return null
          }

          return {
            tenant_id: data.tenant_id,
            name: data.name,
            refresh_token: data.refresh_token,
            token: data.token,
            id: data.tenant_id,
            email: email ?? '',
            phone: data.phone,
            address: data.address,
          }
        } catch (error) {
          console.error('Erro no authorize:', error)
          return null
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET, // chave de criptografia para o JWT
}
