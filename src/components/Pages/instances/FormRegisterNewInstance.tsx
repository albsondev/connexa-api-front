'use client'

import {
  Button, Col, Form, InputGroup, Row,
} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHdd } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import CustomAlert from '@/components/Alert/CustomAlert'

interface FormRegisterNewInstanceProps {
  dict: any;
}

const FormRegisterNewInstance: React.FC<FormRegisterNewInstanceProps> = ({ dict }) => {
  const { data: session } = useSession()
  const router = useRouter()
  const [instanceName, setInstanceName] = useState('')
  const [alert, setAlert] = useState({
    show: false,
    variant: 'success' as 'success' | 'danger',
    title: '',
    message: '',
  })

  const handleRegisterInstance = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!instanceName) {
      setAlert({
        show: true,
        variant: 'danger',
        title: dict.pages.instances.register.alerts.missingNameTitle,
        message: dict.pages.instances.register.alerts.missingNameMessage,
      })
      return
    }

    try {
      const response = await fetch('/api/instance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session?.accessToken}`,
        },
        body: JSON.stringify({ name: instanceName }),
      })

      if (!response.ok) {
        throw new Error(dict.pages.instances.register.alerts.errorMessage)
      }

      setAlert({
        show: true,
        variant: 'success',
        title: 'Nova instância registrada com sucesso',
        message: 'O nome da instância foi salvo com sucesso.',
      })
      setInstanceName('')

      setTimeout(() => {
        router.push('/instances')
      }, 1500)
    } catch (error) {
      setAlert({
        show: true,
        variant: 'danger',
        title: 'Erro ao registrar nova instância',
        message: String(error),
      })
    }
  }

  return (
    <Form onSubmit={handleRegisterInstance}>
      {alert.show && (
        <CustomAlert
          variant={alert.variant}
          title={alert.title}
          message={alert.message}
          icon={faHdd}
        />
      )}

      <Row>
        <Col md={12}>
          <h5>
            1.
            {' '}
            {dict.pages.instances.register.navTabs.webInstanceData}
          </h5>
          <hr />
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={6}>
          <Form.Group controlId="instanceName">
            <Form.Label>{dict.pages.instances.register.navTabs.form.instanceName}</Form.Label>
            <InputGroup>
              <Form.Control
                type="text"
                placeholder={dict.pages.instances.register.navTabs.form.instanceName}
                value={instanceName}
                onChange={(e) => setInstanceName(e.target.value)}
              />
              <InputGroup.Text>
                <FontAwesomeIcon className="text-secondary" icon={faHdd} />
              </InputGroup.Text>
            </InputGroup>
          </Form.Group>
        </Col>
      </Row>

      <hr />

      <Row>
        <Col md={12} className="d-flex justify-content-end align-items-center">
          <Button variant="primary" type="submit" className="me-2">
            {dict.pages.instances.register.navTabs.form.save}
          </Button>
          <Button variant="secondary" type="reset" onClick={() => setInstanceName('')}>
            {dict.pages.instances.register.navTabs.form.cancel}
          </Button>
        </Col>
      </Row>
    </Form>
  )
}

export default FormRegisterNewInstance
