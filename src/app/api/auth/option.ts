import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { CustomUser } from '@/types/user'

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ user, token }) {
      const newToken = { ...token }

      if (user) {
        newToken.email = user.email ?? ''
        newToken.user = user as CustomUser
      }

      return newToken
    },

    async session({ session, token }) {
      const newSession = { ...session }
      newSession.user = {
        ...newSession.user,
        email: token.email ?? '',
      }

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

          const user: CustomUser = {
            tenant_id: data.tenant_id,
            username: data.username,
            refresh_token: data.refresh_token,
            token: data.token,
            id: data.tenant_id,
            email: email ?? '',
          }

          return user
        } catch (error) {
          console.error('Error in authorize:', error)
          throw new Error('Login failed, please check your email and password')
        }
      },
    }),
  ],
}
