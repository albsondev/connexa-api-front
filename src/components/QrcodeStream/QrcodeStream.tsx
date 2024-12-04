import { useEffect, useState } from 'react'
// eslint-disable-next-line import/no-extraneous-dependencies
import { QRCodeSVG } from 'qrcode.react'

const QrcodeStream: React.FC = () => {
  const [qrCodeData, setQrCodeData] = useState<string | null>(null)

  useEffect(() => {
    const instanceToken = '3DITV7CJEOUIE1S'
    const tenantID = '4ZNQ05RCXQ'
    const apiUrl = `http://localhost:3000/api/v1/qrcode/instance/${instanceToken}/${tenantID}`

    const eventSource = new EventSource(apiUrl)

    const handleQrCodeEvent = (event: MessageEvent) => {
      setQrCodeData(event.data)
    }

    const handleError = (error: Event) => {
      console.error('Erro na conexão SSE:', error)
    }

    eventSource.addEventListener('qrcode', handleQrCodeEvent)
    eventSource.onerror = handleError

    return () => {
      eventSource.removeEventListener('qrcode', handleQrCodeEvent)
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
