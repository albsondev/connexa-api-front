import { useEffect, useState } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { useSession } from 'next-auth/react'

interface QrcodeStreamProps {
  instanceId: string;
}

const QrcodeStream: React.FC<QrcodeStreamProps> = ({ instanceId }) => {
  const { data: session } = useSession()
  const [qrCodeData, setQrCodeData] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!session?.accessToken) {
      setError('Token de autenticação não encontrado.')
      return undefined
    }

    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/instance/${instanceId}/qrcode/stream/${session.accessToken}`

    // Log para verificar a URL
    console.log('Connecting to SSE with URL:', apiUrl)

    const eventSource = new EventSource(apiUrl)

    const handleQrCodeEvent = (event: MessageEvent) => {
      try {
        const data = JSON.parse(event.data)
        setQrCodeData(data.qrCode)
        setError(null)
      } catch (err) {
        console.error('Erro ao processar QR Code:', err)
        setError('Falha ao processar o QR Code recebido.')
      }
    }

    const handleSSEError = (err: Event) => {
      console.error('Erro na conexão SSE:', err)
      setError('Erro na conexão com o servidor.')
    }

    eventSource.addEventListener('message', handleQrCodeEvent)
    eventSource.onerror = handleSSEError

    return () => {
      eventSource.removeEventListener('message', handleQrCodeEvent)
      eventSource.close()
    }
  }, [instanceId, session?.accessToken])

  const renderContent = () => {
    if (error) {
      return <p style={{ color: 'red' }}>{error}</p>
    }
    if (qrCodeData) {
      return (
        <div>
          <p>Recebido QR Code:</p>
          <QRCodeSVG value={qrCodeData || ''} size={256} />
        </div>
      )
    }
    return <p>Aguardando QR Code...</p>
  }

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>QRCode Stream</h1>
      {renderContent()}
    </div>
  )
}

export default QrcodeStream
