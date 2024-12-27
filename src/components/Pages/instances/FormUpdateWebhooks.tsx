'use client'

import {
  Alert,
  Button, Col, Form, InputGroup, Row,
} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faAngleDoubleRight, faBolt, faMapMarker, faSignOut,
} from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'
import { fetchInstanceData, updateInstanceData } from '@/app/api/instance/update/updateInstance'
import { useSession } from 'next-auth/react'
import ToggleButtonWebhooksNotifications from './ToggleButtonWebhooksNotifications'

interface FormUpdateWebhooksProps {
  dict: any;
  id: string;
}

const FormUpdateWebhooks: React.FC<FormUpdateWebhooksProps> = ({ dict, id: instanceId }) => {
  const { data: session } = useSession()
  const [formData, setFormData] = useState({
    on_message: '',
    on_instance_status: '',
    chat_presence: '',
    message_status: '',
  })

  const [alert, setAlert] = useState({
    show: false,
    message: '',
    variant: 'success',
  })

  useEffect(() => {
    const loadInstanceData = async () => {
      if (session?.accessToken) {
        try {
          const instanceData = await fetchInstanceData(session.accessToken, instanceId)
          setFormData(instanceData.webhooks)
        } catch (error) {
          console.error('Erro ao buscar dados da instância', error)
          setAlert({ show: true, message: 'Erro ao buscar dados da instância', variant: 'danger' })
        }
      }
    }
    loadInstanceData()
  }, [instanceId, dict, session?.accessToken])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id: fieldId, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [fieldId]: value,
    }))
  }

  const handleUpdateInstance = async () => {
    try {
      if (session?.accessToken) {
        await updateInstanceData(session.accessToken, instanceId, formData)
        setAlert({
          show: true,
          message: dict.pages.instances.details.instanceUpdate.msgSuccess,
          variant: 'success',
        })
      } else {
        setAlert({
          show: true,
          message: dict.pages.instances.details.instanceUpdate.msgError || 'Erro: Sessão não encontrada.',
          variant: 'danger',
        })
      }
    } catch (error: any) {
      console.error('Erro ao atualizar dados da instância:', error)

      setAlert({
        show: true,
        message: error.message || 'Erro desconhecido ao atualizar a instância.',
        variant: 'danger',
      })
    }
  }

  return (
    <Form>
      {alert.show && (
        <Alert
          variant={alert.variant}
          onClose={() => setAlert({ ...alert, show: false })}
          dismissible
        >
          {alert.message}
        </Alert>
      )}
      <Row>
        <Col md={12}>
          <h5>
            {` ${dict.pages.instances.register.navTabs.configureWebhooks}`}
          </h5>
          <hr />
        </Col>
      </Row>
      <Row className="mb-4">
        <Col md={6}>
          <Form.Group controlId="on_message">
            <Form.Label>
              {dict.pages.instances.register.navTabs.form.webhooks.onSendOrReceiveMessage}
            </Form.Label>
            <InputGroup>
              <Form.Control
                type="text"
                placeholder={dict.pages.instances.register.navTabs.form.webhooks.onSendOrReceiveMessage}
                value={formData.on_message}
                onChange={handleInputChange}
              />
              <InputGroup.Text>
                <FontAwesomeIcon className="text-secondary" icon={faAngleDoubleRight} />
              </InputGroup.Text>
            </InputGroup>
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group controlId="on_instance_status">
            <Form.Label>
              {dict.pages.instances.register.navTabs.form.webhooks.onChangeInstanceStatus}
            </Form.Label>
            <InputGroup>
              <Form.Control
                type="text"
                placeholder={dict.pages.instances.register.navTabs.form.webhooks.onChangeInstanceStatus}
                value={formData.on_instance_status}
                onChange={handleInputChange}
              />
              <InputGroup.Text>
                <FontAwesomeIcon className="text-secondary" icon={faMapMarker} />
              </InputGroup.Text>
            </InputGroup>
          </Form.Group>
        </Col>
      </Row>
      <Row className="mb-4">
        <Col md={6}>
          <Form.Group controlId="chat_presence">
            <Form.Label>
              {dict.pages.instances.register.navTabs.form.webhooks.chatPresence}
            </Form.Label>
            <InputGroup>
              <Form.Control
                type="text"
                placeholder={dict.pages.instances.register.navTabs.form.webhooks.chatPresence}
                value={formData.chat_presence}
                onChange={handleInputChange}
              />
              <InputGroup.Text>
                <FontAwesomeIcon className="text-secondary" icon={faSignOut} />
              </InputGroup.Text>
            </InputGroup>
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group controlId="message_status">
            <Form.Label>
              {dict.pages.instances.register.navTabs.form.webhooks.receiveMessageStatus}
            </Form.Label>
            <InputGroup>
              <Form.Control
                type="text"
                placeholder={dict.pages.instances.register.navTabs.form.webhooks.receiveMessageStatus}
                value={formData.message_status}
                onChange={handleInputChange}
              />
              <InputGroup.Text>
                <FontAwesomeIcon className="text-secondary" icon={faBolt} />
              </InputGroup.Text>
            </InputGroup>
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <ToggleButtonWebhooksNotifications dict={dict} />
      </Row>
      <hr />
      <Row>
        <Col md={12} className="d-flex justify-content-end align-items-center">
          <Button variant="primary" type="button" className="me-2" onClick={handleUpdateInstance}>
            {dict.pages.instances.register.navTabs.form.update}
          </Button>
          <Button variant="secondary" type="reset">
            {dict.pages.instances.register.navTabs.form.cancel}
          </Button>
        </Col>
      </Row>
    </Form>
  )
}

export default FormUpdateWebhooks
