'use client'

import {
  Button, Col, Row,
} from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import { useEffect, useState } from 'react'

import './AccountData.scss'
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
import CustomAlert from '@/components/Alert/CustomAlert'
import ModalPayments from '../Modals/ModalPayments'

interface InstanceExpiredProps {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  id: string;
  name: string;
  status: 'trial' | 'expired' | 'active';
  dict: any;
}

const InstanceExpired: React.FC<InstanceExpiredProps> = ({
  onSubmit,
  id,
  status: initialStatus,
  name,
  dict,
}) => {
  const [status, setStatus] = useState(initialStatus)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    setStatus(initialStatus)
  }, [initialStatus])

  const renderStatus = () => {
    switch (status) {
      case 'trial':
        return <span className="text-warning"><strong>TRIAL</strong></span>
      case 'expired':
        return <span className="text-danger"><strong>EXPIRED</strong></span>
      case 'active':
      default:
        return <span className="text-success"><strong>ACTIVE</strong></span>
    }
  }

  const handleOpenModal = () => setShowModal(true)
  const handleCloseModal = () => setShowModal(false)

  return (
    <>
      <CustomAlert
        variant="warning"
        title={dict.pages.instances.details.instanceExpired.alertMessage}
        icon={faExclamationTriangle}
      />
      <div className="container-account-data container">
        <h4 className="text-secondary border-bottom border-secondary border-account mb-2">Visualização de Instância web</h4>
        <p className="text-secondary mb-2">
          Visualização de Instância web
          <strong>{name}</strong>
        </p>
        <Form onSubmit={onSubmit}>
          <section className="mt-0 mb-3">
            <h5 className="text-secondary border-bottom border-secondary border-account mb-2">
              {dict.pages.instances.details.instanceExpired.title}
            </h5>
            <p className="text-secondary">
              {dict.pages.instances.details.instanceExpired.makePaymentSubtitle}
              {' '}
              R$ 99.99
            </p>

            <h5 className="text-dark mb-2">{dict.pages.instances.details.instanceExpired.Signature}</h5>
            <Row className="px-4 py-4 mb-3 mt-3 bg-light rounded-2 border border-1">
              <Col md={12} className="d-flex">
                <div className="me-2">
                  <span className="text-secondary fw-bold">
                    {dict.pages.instances.details.instanceExpired.instanceCode}
                    :
                  </span>
                </div>
                <div>
                  <span className="status text-uppercase text-uppercase text-secondary fs-6">{id}</span>
                </div>
              </Col>
              <Col md={12}><hr className="mt-1 mb-2" /></Col>
              <Col md={12} className="d-flex mb-2">
                <div className="me-2">
                  <span className="text-secondary fw-bold">
                    {dict.pages.instances.details.instanceExpired.statusInstance}
                    :
                  </span>
                </div>
                <div>
                  <span className="status text-uppercase text-uppercase">{renderStatus()}</span>
                </div>
              </Col>
              <Col md={12} className="d-flex">
                <div className="me-2">
                  <span className="text-secondary fw-bold">
                    {dict.pages.instances.details.instanceExpired.expiredIn}
                    :
                  </span>
                </div>
                <div>
                  <span className="status text-uppercase text-uppercase text-secondary">
                    Expirado!
                  </span>
                </div>
              </Col>
            </Row>
          </section>
          <hr className="my-4" />

          <Row>
            <Col md={{ span: 6, offset: 3 }} className="d-grid">
              <Button variant="success" onClick={handleOpenModal}>
                {dict.pages.instances.details.instanceExpired.button}
              </Button>
            </Col>
          </Row>
        </Form>
      </div>

      {/* Modal */}
      <ModalPayments show={showModal} onClose={handleCloseModal} dict={dict} />
    </>
  )
}

export default InstanceExpired
