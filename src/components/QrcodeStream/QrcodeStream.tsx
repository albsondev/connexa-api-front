import { useEffect, useState } from 'react'
import { QRCodeSVG } from 'qrcode.react'

const QrcodeStream: React.FC = () => {
  const [qrCodeData, setQrCodeData] = useState<string | null>(null)

  useEffect(() => {
    const apiUrl = '/api/qrcode' // URL relativa

    const eventSource = new EventSource(apiUrl)

    const handleQrCodeEvent = (event: MessageEvent) => {
      const data = JSON.parse(event.data)
      setQrCodeData(data.qrCode)
    }

    const handleError = (error: Event) => {
      console.error('Erro na conexão SSE:', error)
    }

    eventSource.addEventListener('message', handleQrCodeEvent)
    eventSource.onerror = handleError

    return () => {
      eventSource.removeEventListener('message', handleQrCodeEvent)
      eventSource.close()
    }
  }, [])

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>QRCode Stream</h1>
      {qrCodeData ? (
        <div>
          <p>Recebido QR Code:</p>
          <QRCodeSVG value={qrCodeData} size={256} />
        </div>
      ) : (
        <p>Aguardando QR Code...</p>
      )}
    </div>
  )
}

export default QrcodeStream
