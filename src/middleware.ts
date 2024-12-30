import { withAuth } from 'next-auth/middleware'
import { JWT } from 'next-auth/jwt'
import { type NextFetchEvent, NextRequest, NextResponse } from 'next/server'
import { match } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'
import { getLocales } from '@/locales/dictionary'
import { defaultLocale } from '@/locales/config'

interface NextRequestWithAuth extends NextRequest {
  nextauth: {
    token: JWT | null;
  };
}

export default async function middleware(request: NextRequest, event: NextFetchEvent) {
  const headers = { 'accept-language': request.headers.get('accept-language') ?? '' }
  const languages = new Negotiator({ headers }).languages()
  const locales = getLocales()
  const locale = match(languages, locales, defaultLocale)
  const response = NextResponse.next()

  if (!request.cookies.get('locale')) {
    response.cookies.set('locale', locale)
  }

  if (request.nextUrl.pathname.startsWith('/api/') && !request.nextUrl.pathname.startsWith('/api/auth')) {
    const res = await withAuth(
      async () => {
        const sessionExpired = request.cookies.get('next-auth.session-token') === undefined
        if (sessionExpired) {
          return NextResponse.redirect(new URL('/login', request.url))
        }

        return response
      },
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
