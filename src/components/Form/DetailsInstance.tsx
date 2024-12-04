'use client'

import {
  Button, Col, InputGroup, Row,
} from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faMapMarkerAlt,
} from '@fortawesome/free-solid-svg-icons'
import './AccountData.scss'
import { faCopy } from '@fortawesome/free-regular-svg-icons'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import QrCodeExemplo from '@/../public/assets/img/QrCodeExemplo.png'

interface DetailsInstanceProps {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  id: string;
  status: 'trial' | 'expired' | 'active';
  dict: any;
}

const formatTime = (seconds: number) => {
  const days = Math.floor(seconds / (24 * 3600))
  const hours = Math.floor((seconds % (24 * 3600)) / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = seconds % 60

  return `${days}d ${hours}h ${minutes}m ${secs}s`
}

const DetailsInstance: React.FC<DetailsInstanceProps> = ({
  onSubmit,
  id,
  status: initialStatus,
  dict,
}) => {
  const [status, setStatus] = useState(initialStatus)
  const [timeLeft, setTimeLeft] = useState(259188)

  useEffect(() => {
    setStatus(initialStatus)
    const interval = setInterval(() => {
      setTimeLeft((prevTime) => Math.max(prevTime - 1, 0))
    }, 1000)

    return () => clearInterval(interval)
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

  return (
    <div className="container-account-data container">
      <Form onSubmit={onSubmit}>
        <section className="mt-0 mb-3">
          <h5 className="text-secondary border-bottom border-secondary border-account mb-2">
            1.
            {' '}
            {` ${dict.pages.instances.details.instanceDataMyNumber}`}
          </h5>
          <p className="text-secondary">
            {dict.pages.instances.details.subtitle}
          </p>

          <Row>
            <Col md={9} className="px-4">
              <Row>
                <Col md={12} className="mb-3">
                  <Form.Group controlId="cep">
                    <Form.Label className="text-secondary">
                      {dict.pages.instances.details.apiInstance}
                      <Link href="#" onClick={() => navigator.clipboard.writeText(id)} title="Copiar" className="ms-2">
                        <FontAwesomeIcon className="text-secondary" icon={faCopy} fixedWidth />
                      </Link>
                    </Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon className="text-secondary" icon={faMapMarkerAlt} fixedWidth />
                      </InputGroup.Text>
                      <Form.Control type="text" placeholder={dict.pages.accountData.form.cep} value={id} disabled />
                    </InputGroup>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group controlId="cep">
                    <Form.Label className="text-secondary">
                      {dict.pages.instances.details.IDInstance}
                      <Link href="#" onClick={() => navigator.clipboard.writeText(id)} title="Copiar" className="ms-2">
                        <FontAwesomeIcon className="text-secondary" icon={faCopy} fixedWidth />
                      </Link>
                    </Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon className="text-secondary" icon={faMapMarkerAlt} fixedWidth />
                      </InputGroup.Text>
                      <Form.Control type="text" placeholder={dict.pages.accountData.form.cep} value={id} disabled />
                    </InputGroup>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="cep">
                    <Form.Label className="text-secondary">
                      {dict.pages.instances.details.tokenInstance}
                      <Link href="#" onClick={() => navigator.clipboard.writeText(id)} title="Copiar" className="ms-2">
                        <FontAwesomeIcon className="text-secondary" icon={faCopy} fixedWidth />
                      </Link>
                    </Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon className="text-secondary" icon={faMapMarkerAlt} fixedWidth />
                      </InputGroup.Text>
                      <Form.Control type="text" placeholder={dict.pages.accountData.form.tokenInstance} value={id} disabled />
                    </InputGroup>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <h5 className="text-dark mt-5 mb-2">{dict.pages.instances.details.instanceExpired.Signature}</h5>
                <Col md={12} className="mb-4 d-flex flex-row justify-content-between bg-light rounded-2 border border-1 pt-3 pb-2 px-3">
                  <div className="d-flex mb-2">
                    <div className="me-2">
                      <span className="text-secondary fw-bold">
                        {dict.pages.instances.details.instanceExpired.statusInstance}
                        :
                      </span>
                    </div>
                    <div>
                      <span className="status text-uppercase text-uppercase">{renderStatus()}</span>
                    </div>
                  </div>
                  <div className="d-flex">
                    <div className="me-2">
                      <span className="text-secondary fw-bold">
                        {dict.pages.instances.details.instanceExpired.expiredIn}
                        :
                      </span>
                    </div>
                    <div>
                      <span className="status text-uppercase text-uppercase text-secondary">
                        {formatTime(timeLeft)}
                      </span>
                    </div>
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
              <Image
                src={QrCodeExemplo}
                alt="QR Code Exemplo"
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: '100%', height: 'auto' }}
                className="img-fluid p-4 border border-secondary"
              />
              <h3 className="text-secondary text-center">
                {dict.pages.instances.details.ReadTheQrCode}
              </h3>
              <p className="px-4 text-center">
                <small className="text-secondary">
                  {dict.pages.instances.details.helpTextQrCode}
                </small>
              </p>
              <hr />
              <div className="text-center mt-2">
                <Link href="#" className="text-link fst-normal fs-6">
                  {dict.pages.instances.details.connectPhoneNumber}
                </Link>
              </div>
            </Col>
          </Row>
        </section>
      </Form>
    </div>
  )
}

export default DetailsInstance
