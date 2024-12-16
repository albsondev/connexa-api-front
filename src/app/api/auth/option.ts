import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ user, token }) {
      const newToken = { ...token }

      if (user) {
        newToken.user = user
        newToken.accessToken = user.token
      }

      return newToken
    },

    async session({ session, token }) {
      const newSession = { ...session }
      newSession.user = token.user
      newSession.accessToken = token.accessToken
      return newSession
    },
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: { type: 'email' },
        password: { type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials) return null

        const { email, password } = credentials

        try {
          const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/user/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
          })

          if (!response.ok) {
            throw new Error('Invalid credentials')
          }

          const data = await response.json()

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
          console.error('Error in authorize:', error)
          throw new Error('Login failed, please check your email and password')
        }
      },
    }),
  ],
}
