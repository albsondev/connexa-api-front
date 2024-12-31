import { useEffect, useState } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { useSession } from 'next-auth/react'
import { Alert } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQrcode } from '@fortawesome/free-solid-svg-icons'
import QrCodeSkeletonLoader from '../SkeletonLoader/QrCodeSkeletonLoader'

interface QrcodeStreamProps {
  instanceToken: string;
  dict: any;
}

const QrcodeStream: React.FC<QrcodeStreamProps> = ({ instanceToken, dict }) => {
  const { data: session } = useSession()
  const [qrCodeData, setQrCodeData] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [errorMessages, setErrorMessages] = useState<string | null>(null)

  useEffect(() => {
    if (!session?.accessToken) {
      setError('Token de autenticação não encontrado.')
      return undefined
    }

    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/qrcode/instance/${instanceToken}/${session.user.tenant_id}`
    const eventSource = new EventSource(apiUrl)

    const handleQrCodeEvent = (event: MessageEvent) => {
      try {
        setQrCodeData(event.data)
        setError(null)
        setErrorMessages(null)
      } catch (err) {
        console.error('Erro ao processar QR Code:', err)
        setError('QRCode falhou!')
        setErrorMessages('Erro ao processar o QR Code recebido.')
      }
    }

    const handleSSEError = (err: Event) => {
      setError('QRCode falhou!')

      if ('message' in err) {
        setErrorMessages((err as any).message)
      } else {
        console.error(err)
        setErrorMessages('Erro desconhecido na conexão SSE.')
      }

      console.error('Detalhes do erro:', err)
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
      return (
        <Alert variant="danger" style={{ textAlign: 'center' }}>
          <Alert.Heading>
            <FontAwesomeIcon icon={faQrcode} style={{ marginRight: '0.5em' }} />
            {error}
          </Alert.Heading>
          <hr />
          <p>
            <small>
              {errorMessages}
            </small>
          </p>
        </Alert>
      )
    }
    if (qrCodeData) {
      return (
        <div>
          <QRCodeSVG value={qrCodeData || ''} size={256} />
          <h3 className="text-secondary text-center">
            {dict.pages.instances.details.ReadTheQrCode}
          </h3>
          <p className="px-4 text-center">
            <small className="text-secondary">
              {dict.pages.instances.details.helpTextQrCode}
            </small>
          </p>
        </div>
      )
    }
    return <QrCodeSkeletonLoader />
  }

  return (
    <div style={{
      textAlign: 'center', marginTop: '0px',
    }}
    >
      {renderContent()}
    </div>
  )
}

export default QrcodeStream
