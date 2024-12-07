import NextAuth from 'next-auth'
import { authOptions } from '@/app/api/auth/option'
import { CustomUser } from '@/types/user'

declare module 'next-auth' {
  interface Session {
    user: CustomUser;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    user: CustomUser;
  }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST, authOptions }
