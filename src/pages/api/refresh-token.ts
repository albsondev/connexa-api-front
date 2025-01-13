import { NextApiRequest, NextApiResponse } from 'next'
import axios, { AxiosError } from 'axios'

/**
 * Interface para o corpo da requisição de renovação de token.
 */
interface RefreshTokenRequest extends NextApiRequest {
  body: {
    refreshToken: string;
  };
}

/**
 * Interface para a resposta de erro.
 */
interface ErrorResponse {
  error: string;
}

/**
 * Interface para a resposta de sucesso.
 */
interface SuccessResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

/**
 * Função auxiliar para chamar o endpoint de renovação de token.
 * @param refreshToken - O refresh token do usuário.
 * @param currentToken - O token de acesso atual do usuário.
 * @returns Um objeto contendo o novo access token, refresh token e tempo de expiração.
 * @throws Lança um erro se houver falha na renovação do token.
 */
const renewToken = async (refreshToken: string, currentToken: string): Promise<SuccessResponse> => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/user/refresh-token`,
      { refresh_token: refreshToken },
      { headers: { Authorization: `Bearer ${currentToken}` } },
    )

    const { data } = response

    if (!data?.token || !data?.refresh_token || !data?.expires_in) {
      throw new Error('Resposta inválida da API de renovação de token.')
    }
    return {
      accessToken: data.token,
      refreshToken: data.refresh_token,
      expiresIn: data.expires_in,
    }
  } catch (error) {
    const axiosError = error as AxiosError
    console.error('Erro ao renovar o token:', axiosError.message, axiosError.response?.data)
    throw new Error('Falha ao renovar o token.')
  }
}

/**
 * Handler para a rota de renovação de token.
 * @param req - A requisição.
 * @param res - A resposta.
 */
const handler = async (
  req: RefreshTokenRequest,
  res: NextApiResponse<ErrorResponse | SuccessResponse>,
) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido.' })
  }

  const { refreshToken } = req.body
  const currentToken = req.headers.authorization?.split(' ')[1]

  if (!refreshToken || !currentToken) {
    return res.status(400).json({ error: 'Refresh token ou Bearer token não fornecido.' })
  }

  try {
    const tokens = await renewToken(refreshToken, currentToken)
    console.log('Token renovado com sucesso no servidor:', tokens)
    return res.status(200).json(tokens)
  } catch (error: any) {
    console.error('Erro ao renovar o token:', error.message)
    return res.status(500).json({ error: 'Erro ao renovar o token.' })
  }
}

export default handler
