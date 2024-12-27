'use client'

import {
  Button, Col, InputGroup, Row,
} from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faKey } from '@fortawesome/free-solid-svg-icons'
import { faCopy, faPenToSquare } from '@fortawesome/free-regular-svg-icons'
import Link from 'next/link'
import { useCallback, useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
//import QrCodeExemplo from '@/../public/assets/img/QrCodeExemplo.png'
import '@/components/Form/AccountData.scss'
import DetailsInstanceSkeletonLoader from '@/components/SkeletonLoader/DetailsInstanceSkeletonLoader'
import QrcodeStream from '@/components/QrcodeStream/QrcodeStream'

interface DetailsInstanceProps {
  id: string;
  dict: any;
}

interface InstanceData {
  id: string;
  name: string;
  status: string;
  token: string;
  webhooks: {
    on_message: string;
    on_instance_status: string;
    chat_presence: string;
    message_status: string;
  };
}

const formatTime = (seconds: number) => {
  const days = Math.floor(seconds / (24 * 3600))
  const hours = Math.floor((seconds % (24 * 3600)) / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = seconds % 60

  return `${days}d ${hours}h ${minutes}m ${secs}s`
}

const DetailsInstance: React.FC<DetailsInstanceProps> = ({ id, dict }) => {
  const { data: session } = useSession()
  const [instanceData, setInstanceData] = useState<InstanceData | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [timeLeft, setTimeLeft] = useState(259188)

  const fetchInstanceData = useCallback(async () => {
    if (!session?.accessToken) {
      setError('Token de autenticação não encontrado.')
      setLoading(false)
      return
    }

    try {
      const response = await fetch('/api/instance', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      })

      if (!response.ok) {
        throw new Error('Erro ao buscar instâncias.')
      }

      const data = await response.json()
      const selectedInstance = data.find((instance: InstanceData) => instance.id === id)

      if (!selectedInstance) {
        throw new Error('Instância não encontrada.')
      }

      setInstanceData(selectedInstance)
    } catch (err) {
      console.error(err)
      setError('Falha ao carregar dados da instância.')
    } finally {
      setLoading(false)
    }
  }, [id, session?.accessToken])

  useEffect(() => {
    if (session) {
      fetchInstanceData()
    }

    const interval = setInterval(() => {
      setTimeLeft((prevTime) => Math.max(prevTime - 1, 0))
    }, 1000)

    return () => clearInterval(interval)
  }, [fetchInstanceData, session])

  const renderStatus = () => {
    switch (instanceData?.status) {
      case 'trial':
        return <span className="text-warning"><strong>TRIAL</strong></span>
      case 'expired':
        return <span className="text-danger"><strong>EXPIRED</strong></span>
      case 'active':
      default:
        return <span className="text-warning"><strong>TRIAL</strong></span>
    }
  }

  if (loading) {
    return <DetailsInstanceSkeletonLoader />
  }

  if (error) {
    return <p className="text-danger">{error}</p>
  }

  if (!instanceData) {
    return <p className="text-danger">Dados da instância não encontrados.</p>
  }

  return (
    <div className="container-account-data container">
      <Form>
        <section className="mt-0 mb-3">
          <Row>
            <Col xs={12} md={11}>
              <h5 className="text-dark border-bottom border-secondary border-account mb-2">
                1.
                {' '}
                {`${dict.pages.instances.details.instanceData} ${instanceData.name}`}
              </h5>
              <p className="text-secondary">
                {dict.pages.instances.details.subtitle}
              </p>
            </Col>
            <Col xs={12} md={1} className="d-flex justify-content-end">
              <Link href={`/instances/update/${id}`}>
                <Button variant="primary" size="sm" className="border border-secondary mt-2">
                  <FontAwesomeIcon icon={faPenToSquare} fixedWidth />
                  Editar
                </Button>
              </Link>
            </Col>
          </Row>

          <Row>
            <Col md={9} className="px-4">
              <Row>
                <Col md={12} className="mb-3">
                  <Form.Group controlId="instanceId">
                    <Form.Label className="text-secondary">
                      {dict.pages.instances.details.apiInstance}
                      <Link href="#" onClick={() => navigator.clipboard.writeText(instanceData.id)} title="Copiar" className="ms-2">
                        <FontAwesomeIcon className="text-secondary" icon={faCopy} fixedWidth />
                      </Link>
                    </Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon className="text-secondary" icon={faKey} fixedWidth />
                      </InputGroup.Text>
                      <Form.Control type="text" value={instanceData.id} disabled />
                    </InputGroup>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group controlId="instanceName">
                    <Form.Label className="text-secondary">
                      {dict.pages.instances.details.nameInstance}
                    </Form.Label>
                    <Form.Control type="text" value={instanceData.name} disabled />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="instanceStatus">
                    <Form.Label className="text-secondary">
                      {dict.pages.instances.details.statusInstance}
                    </Form.Label>
                    <Form.Control type="text" value={instanceData.status} disabled />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <h5 className="text-dark mt-5 mb-2">{dict.pages.instances.details.instanceExpired.Signature}</h5>
                <Col md={12} className="mb-4 d-flex flex-row justify-content-between bg-light rounded-2 border border-1 pt-3 pb-2 px-3">
                  <div className="d-flex mb-2">
                    <span className="text-secondary fw-bold me-2">
                      {dict.pages.instances.details.instanceExpired.statusInstance}
                      :
                    </span>
                    <span className="status text-uppercase">{renderStatus()}</span>
                  </div>
                  <div className="d-flex">
                    <span className="text-secondary fw-bold me-2">
                      {dict.pages.instances.details.instanceExpired.expiredIn}
                      :
                    </span>
                    <span className="status text-uppercase text-secondary">{formatTime(timeLeft)}</span>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col md={{ span: 8, offset: 2 }} className="d-grid">
                  <Button variant="success">
                    {dict.pages.instances.details.instanceExpired.button}
                  </Button>
                </Col>
              </Row>
            </Col>
            <Col md={3}>
              <QrcodeStream instanceToken={instanceData.token} />
              {/* <Image
                src={QrCodeExemplo}
                alt="QR Code Exemplo"
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: '100%', height: 'auto' }}
                className="img-fluid p-4 border border-secondary"
              /> */}
              <h3 className="text-secondary text-center">
                {dict.pages.instances.details.ReadTheQrCode}
              </h3>
              <p className="px-4 text-center">
                <small className="text-secondary">
                  {dict.pages.instances.details.helpTextQrCode}
                </small>
              </p>
            </Col>
          </Row>
        </section>
      </Form>
    </div>
  )
}

export default DetailsInstance
