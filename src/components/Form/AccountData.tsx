'use client'

import {
  Col, InputGroup, Row,
} from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faAt,
  faBuilding,
  faHome,
  faIdCard,
  faMapMarkerAlt,
  faRoad,
  faUser,
} from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'
import './AccountData.scss'
import { useSession } from 'next-auth/react'

interface AccountDataProps {
  dict: any;
}

const AccountData: React.FC<AccountDataProps> = ({ dict }) => {
  const { data: session } = useSession()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    street: '',
    number: '',
    neighborhood: '',
    zipcode: '',
    document_number: '',
  })

  useEffect(() => {
    const user = session?.user
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        street: user.address?.street || '',
        number: user.address?.number || '',
        neighborhood: user.address?.neighborhood || '',
        zipcode: user.address?.zipcode || '',
        document_number: user.document_number || '',
      })
    }
  }, [session])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }))
  }

  if (!session || !session.user) {
    return <div>Loading...</div>
  }

  return (
    <div className="container-account-data container">
      <Form>
        <section className="mt-0 mb-5">
          <h5 className="text-secondary border-bottom border-secondary border-account">
            1.
            {` ${dict.pages.accountData.title}`}
          </h5>
          <Row className="px-4">
            <Col md={6}>
              <Form.Group controlId="name">
                <Form.Label className="text-secondary strong">{dict.pages.accountData.form.fullName}</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <FontAwesomeIcon className="text-secondary" icon={faUser} fixedWidth />
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder={dict.pages.accountData.form.fullName}
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="email">
                <Form.Label className="text-secondary">{dict.pages.accountData.form.email}</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <FontAwesomeIcon className="text-secondary" icon={faAt} fixedWidth />
                  </InputGroup.Text>
                  <Form.Control
                    type="email"
                    placeholder={dict.pages.accountData.form.email}
                    value={formData.email}
                    onChange={handleInputChange}
                    readOnly
                  />
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>
          <Row className="px-4 mt-4">
            <Col md={6}>
              <Form.Group controlId="phone">
                <Form.Label className="text-secondary">{dict.pages.accountData.form.phone}</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <FontAwesomeIcon className="text-secondary" icon={faIdCard} fixedWidth />
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder={dict.pages.accountData.form.phone}
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="phone">
                <Form.Label className="text-secondary">{dict.pages.accountData.form.phone}</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <FontAwesomeIcon className="text-secondary" icon={faIdCard} fixedWidth />
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder={dict.pages.accountData.form.phone}
                    value={formData.document_number}
                    onChange={handleInputChange}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>
        </section>

        <section className="mt-1 mb-4">
          <h5 className="text-secondary border-bottom border-secondary border-account">
            2.
            {` ${dict.pages.accountData.form.address}`}
          </h5>
          <Row className="px-4">
            <Col md={6}>
              <Form.Group controlId="zipcode">
                <Form.Label className="text-secondary">{dict.pages.accountData.form.cep}</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <FontAwesomeIcon className="text-secondary" icon={faMapMarkerAlt} fixedWidth />
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder={dict.pages.accountData.form.cep}
                    value={formData.zipcode}
                    onChange={handleInputChange}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="street">
                <Form.Label className="text-secondary">{dict.pages.accountData.form.street}</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <FontAwesomeIcon className="text-secondary" icon={faRoad} fixedWidth />
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder={dict.pages.accountData.form.street}
                    value={formData.street}
                    onChange={handleInputChange}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>
          <Row className="px-4 mt-4">
            <Col md={6}>
              <Form.Group controlId="neighborhood">
                <Form.Label className="text-secondary">{dict.pages.accountData.form.neighborhood}</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <FontAwesomeIcon className="text-secondary" icon={faBuilding} fixedWidth />
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder={dict.pages.accountData.form.neighborhood}
                    value={formData.neighborhood}
                    onChange={handleInputChange}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="number">
                <Form.Label className="text-secondary">{dict.pages.accountData.form.number}</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <FontAwesomeIcon className="text-secondary" icon={faHome} fixedWidth />
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder={dict.pages.accountData.form.number}
                    value={formData.number}
                    onChange={handleInputChange}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>
        </section>
      </Form>
    </div>
  )
}

export default AccountData
