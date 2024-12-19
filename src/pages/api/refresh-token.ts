import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const refreshToken = req.cookies.refresh_token
    if (!refreshToken) {
      return res.status(403).json({ error: 'Refresh token não encontrado' })
    }

    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh-token`, {
      refresh_token: refreshToken,
    })

    const { token, refresh_token: newRefreshToken } = response.data

    res.setHeader('Set-Cookie', [
      `access_token=${token}; Path=/; HttpOnly`,
      `refresh_token=${newRefreshToken}; Path=/; HttpOnly`,
    ])

    return res.status(200).json({ message: 'Token renovado com sucesso' })
  } catch (error) {
    console.error('Erro ao tentar renovar o token:', error)
    return res.status(500).json({ error: 'Erro ao tentar renovar o token' })
  }
}
