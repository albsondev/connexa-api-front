import { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')

  // Tratar requisições OPTIONS (preflight requests)
  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  // Lógica para lidar com SSE
  if (req.method === 'GET') {
    res.setHeader('Content-Type', 'text/event-stream')
    res.setHeader('Cache-Control', 'no-cache')
    res.setHeader('Connection', 'keep-alive')

    // Enviar dados de exemplo
    const sendQRCode = () => {
      res.write(`data: ${JSON.stringify({ qrCode: 'exampleQRCodeData' })}\n\n`)
    }

    // Enviar QR Code a cada 5 segundos
    const intervalId = setInterval(sendQRCode, 5000)

    // Limpar intervalo quando a conexão for fechada
    req.on('close', () => {
      clearInterval(intervalId)
      res.end()
    })
  } else {
    res.status(405).json({ message: 'Method Not Allowed' })
  }
}
