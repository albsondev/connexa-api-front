import { NextAuthOptions, User } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { getDictionary } from '@/locales/dictionary'
import { JWT } from 'next-auth/jwt'

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ user, token }): Promise<JWT> {
      if (user) {
        const safeUser: User = {
          ...user,
          id: typeof user.id === 'string' ? parseInt(user.id, 10) : user.id,
        }
        return { ...token, user: safeUser }
      }
      return token
    },
    async session({ session, token }) {
      const newSession = { ...session, user: token.user as User }
      return newSession
    },
  },
  providers: [
    CredentialsProvider({
      credentials: {
        username: { type: 'string' },
        password: { type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials) return null

        const { username, password } = credentials
        const ok = username === 'Username' && password === 'Password'
        const dict = await getDictionary()

        if (!ok) {
          throw new Error(dict.login.message.auth_failed)
        }

        return {
          id: 1,
          name: 'Name',
          username: 'Username',
          email: 'user@email.com',
          avatar: '/assets/img/avatars/8.jpg',
        }
      },
    }),
  ],
}
