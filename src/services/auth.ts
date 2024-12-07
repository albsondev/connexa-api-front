import { signIn } from 'next-auth/react'

export const login = async (email: string, password: string, callbackUrl: any) => {
  try {
    const res = await signIn('credentials', {
      email,
      password,
      redirect: false,
      callbackUrl,
    })

    if (!res) {
      throw new Error('Login failed')
    }

    const { ok, url, error } = res

    if (!ok) {
      throw new Error(error || 'Login failed')
    }

    return { url }
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Unknown error')
  }
}
