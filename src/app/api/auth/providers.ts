import { NextResponse } from 'next/server'
import { authOptions } from '@/app/api/auth/option'
import { NextAuthOptions } from 'next-auth'

export async function GET() {
  const providers = (authOptions as NextAuthOptions).providers.map((provider) => ({
    id: provider.id,
    name: provider.name,
    type: provider.type,
  }))

  return NextResponse.json(providers)
}
