import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { CustomUser } from '@/types/user'

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ user, token }): Promise<any> {
      if (user) {
        return {
          ...token,
          email: user.email,
        }
      }
      return token
    },

    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          email: token.email,
        },
      }
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
            console.error('Response status:', response.status)
            console.error('Response body:', await response.text())
            throw new Error('Invalid credentials')
          }

          const data = await response.json()

          const user: CustomUser = {
            tenant_id: data.tenant_id,
            username: data.username,
            refresh_token: data.refresh_token,
            token: data.token,
            id: data.tenant_id,
            email,
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
