import { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

interface RefreshTokenRequest extends NextApiRequest {
  body: {
    refreshToken: string;
  };
}

interface ErrorResponse {
  error: string;
}

interface SuccessResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

// Função auxiliar para chamar o endpoint de renovação de token
async function renewToken(refreshToken: string, currentToken: string) {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/user/refresh-token`,
      {
        refresh_token: refreshToken,
      },
      {
        headers: {
          Authorization: `Bearer ${currentToken}`, // Adicionado o Bearer token no header
        },
      },
    )

    const { data } = response

    if (!data.token || !data.refresh_token || !data.expires_in) {
      throw new Error('Resposta inválida da API de renovação de token.')
    }

    return {
      accessToken: data.token,
      refreshToken: data.refresh_token,
      expiresIn: data.expires_in,
    }
  } catch (error) {
    console.error('Erro ao renovar o token:', error)
    throw new Error('Falha ao renovar o token.')
  }
}

export default async function handler(
  req: RefreshTokenRequest,
  res: NextApiResponse<ErrorResponse | SuccessResponse>,
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido.' })
  }

  const { refreshToken } = req.body
  const currentToken = req.headers.authorization?.split(' ')[1] // Extraindo o token atual do header

  if (!refreshToken || !currentToken) {
    return res.status(400).json({ error: 'Refresh token ou Bearer token não fornecido.' })
  }

  try {
    const tokens = await renewToken(refreshToken, currentToken)

    console.log('Token renovado com sucesso no servidor:', tokens)
    return res.status(200).json(tokens)
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao renovar o token.' })
  }
}
