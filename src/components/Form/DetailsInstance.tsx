'use client'

import {
  Alert, Button, Col, InputGroup, Row,
} from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faKey, faRefresh } from '@fortawesome/free-solid-svg-icons'
import { faCopy, faPenToSquare } from '@fortawesome/free-regular-svg-icons'
import Link from 'next/link'
import { useCallback, useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
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

const DetailsInstance: React.FC<DetailsInstanceProps> = ({ id, dict }) => {
  const { data: session } = useSession()
  const [instanceData, setInstanceData] = useState<InstanceData | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [alert, setAlert] = useState<{ type: 'success' | 'danger'; message: string } | null>(null)

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

  const generateNewToken = async () => {
    if (!session?.accessToken || !instanceData) {
      setAlert({ type: 'danger', message: 'Não foi possível gerar um novo token.' })
      return
    }

    try {
      const response = await fetch(`/api/instance/generate-token/${id}`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      })

      if (!response.ok) {
        throw new Error('Erro ao gerar um novo token.')
      }

      const data = await response.json()
      setInstanceData({ ...instanceData, token: data.token })
      setAlert({ type: 'success', message: 'Novo token gerado com sucesso!' })
    } catch (err) {
      console.error(err)
      setAlert({ type: 'danger', message: 'Erro ao tentar gerar um novo token.' })
    }
  }

  useEffect(() => {
    if (session) {
      fetchInstanceData()
    }

    return () => {
      setInstanceData(null)
      setLoading(true)
      setError(null)
    }
  }, [fetchInstanceData, session])

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
      {alert && (
        <Alert variant={alert.type} onClose={() => setAlert(null)} dismissible>
          {alert.message}
        </Alert>
      )}
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
              <Row className="mb-3">
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
                <Col md={6}>
                  <Form.Group controlId="idUser">
                    <Form.Label className="text-secondary">
                      Id de usuário
                    </Form.Label>
                    <Form.Control type="text" value={session?.user?.tenant_id || ''} disabled />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="instanceStatus">
                    <Form.Label className="text-secondary">
                      Token da instância
                      <Button variant="success" size="sm" className="ms-2 p-0" onClick={generateNewToken}>
                        <FontAwesomeIcon icon={faRefresh} fixedWidth />
                        Gerar novo
                      </Button>
                    </Form.Label>
                    <Form.Control type="text" value={instanceData.token} disabled />
                  </Form.Group>
                </Col>
              </Row>
            </Col>
            <Col md={3}>
              <QrcodeStream dict={dict} instanceToken={instanceData.token} />
            </Col>
          </Row>
        </section>
      </Form>
    </div>
  )
}

export default DetailsInstance
