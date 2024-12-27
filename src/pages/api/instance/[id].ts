import { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req
  const token = req.headers.authorization

  if (!token) {
    return res.status(403).json({ error: 'No token provided' })
  }

  try {
    const apiResponse = await axios({
      method,
      url: `${process.env.NEXT_PUBLIC_API_URL}/instance/${req.query.id}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      data: req.body,
    })

    return res.status(apiResponse.status).json(apiResponse.data)
  } catch (error: any) {
    console.error('Error in API middleware:', error.response?.data || error.message)
    return res.status(error.response?.status || 500).json({ error: 'Internal Server Error' })
  }
}
