import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const token = req.headers.authorization // Certifique-se de que o token está presente
    if (!token) {
      return res.status(403).json({ error: 'No token provided' })
    }

    const apiResponse = await axios({
      method: req.method, // Repassa o método (GET, POST, PUT, DELETE)
      url: `${process.env.NEXT_PUBLIC_API_URL}/instance`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: token, // Aqui o Bearer Token é repassado
      },
      data: req.body, // Passa o body (se for POST ou PUT)
    })

    return res.status(apiResponse.status).json(apiResponse.data)
  } catch (error: any) {
    console.error('Erro ao buscar instâncias:', error.response?.data || error.message)
    return res.status(error.response?.status || 500).json({ error: 'Erro no proxy da API' })
  }
}
