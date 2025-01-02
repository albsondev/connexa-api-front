import { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req
  const token = req.headers.authorization // O token já deve incluir o prefixo "Bearer"

  if (!token) {
    return res.status(403).json({ error: 'No token provided' })
  }

  if (!['GET', 'POST', 'PUT', 'DELETE'].includes(method || '')) {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const apiResponse = await axios({
      method,
      url: `${process.env.NEXT_PUBLIC_API_URL}/instance`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      data: req.body,
    })

    return res.status(apiResponse.status).json(apiResponse.data)
  } catch (error: any) {
    console.error('Error in API middleware:', error.response?.data || error.message)

    if (error.response) {
      const { status, data } = error.response
      return res.status(status).json(data)
    }

    return res.status(500).json({ error: 'Internal Server Error' })
  }
}
