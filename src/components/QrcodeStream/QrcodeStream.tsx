import { useEffect, useState } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { useSession } from 'next-auth/react'
import QrCodeSkeletonLoader from '../SkeletonLoader/QrCodeSkeletonLoader'

interface QrcodeStreamProps {
  instanceToken: string;
}

const QrcodeStream: React.FC<QrcodeStreamProps> = ({ instanceToken }) => {
  const { data: session } = useSession()
  const [qrCodeData, setQrCodeData] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!session?.accessToken) {
      setError('Token de autenticação não encontrado.')
      return undefined
    }

    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/qrcode/instance/${instanceToken}/${session.user.tenant_id}`

    // Log para verificar a URL
    console.log('Connecting to SSE with URL:', apiUrl)

    const eventSource = new EventSource(apiUrl)

    const handleQrCodeEvent = (event: MessageEvent) => {
      try {
        setQrCodeData(event.data)
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

    eventSource.addEventListener('qrcode', handleQrCodeEvent)
    eventSource.onerror = handleSSEError

    return () => {
      eventSource.removeEventListener('qrcode', handleQrCodeEvent)
      eventSource.close()
    }
  }, [instanceToken, session?.accessToken, session?.user?.tenant_id])

  const renderContent = () => {
    if (error) {
      return <p style={{ color: 'red' }}>{error}</p>
    }
    if (qrCodeData) {
      return (
        <div>
          <QRCodeSVG value={qrCodeData || ''} size={256} />
        </div>
      )
    }
    return <QrCodeSkeletonLoader />
  }

  return (
    <div style={{
      textAlign: 'center', marginTop: '0px', border: '1px solid #c0c0c0', padding: '0.35em', borderRadius: '0.25em',
    }}
    >
      {renderContent()}
    </div>
  )
}

export default QrcodeStream
