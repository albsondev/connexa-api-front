import { NextRequestWithAuth, withAuth } from 'next-auth/middleware'
import { type NextFetchEvent, NextRequest, NextResponse } from 'next/server'
import { match } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'
import { getLocales } from '@/locales/dictionary'
import { defaultLocale } from '@/locales/config'

export default async function middleware(request: NextRequest, event: NextFetchEvent) {
  const headers = { 'accept-language': request.headers.get('accept-language') ?? '' }
  const languages = new Negotiator({ headers }).languages()
  const locales = getLocales()
  const locale = match(languages, locales, defaultLocale)
  const response = NextResponse.next()

  // Definir o cookie de idioma
  if (!request.cookies.get('locale')) {
    response.cookies.set('locale', locale)
  }

  // Proteger todas as rotas de API, exceto auth (usado pelo NextAuth)
  if (request.nextUrl.pathname.startsWith('/api/') && !['/api/auth'].includes(request.nextUrl.pathname)) {
    const res = await withAuth(
      () => response,
      {
        pages: {
          signIn: '/login',
        },
      },
    )(request as NextRequestWithAuth, event)

    if (res) {
      res.headers.set('Access-Control-Allow-Origin', '*')
      res.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
      res.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')

      // Tratar requisições OPTIONS (preflight requests)
      if (request.method === 'OPTIONS') {
        return new Response(null, {
          headers: res.headers,
        })
      }

      return res
    }
  }

  return response
}
