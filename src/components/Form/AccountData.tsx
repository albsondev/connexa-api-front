'use client'

import {
  Alert, Button, Col, InputGroup, Row,
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
import { fetchUserData, updateUserData } from '@/app/api/user/update/updateUser'

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

  const [alert, setAlert] = useState({
    show: false,
    message: '',
    variant: 'success',
  })

  useEffect(() => {
    const loadUserData = async () => {
      if (session?.accessToken) {
        try {
          const additionalData = await fetchUserData(session.accessToken)
          setFormData((prevData) => ({
            ...prevData,
            ...additionalData,
            ...additionalData.address,
          }))
        } catch (error) {
          console.error('Error fetching user data:', error)
          setAlert({ show: true, message: 'Error fetching user data.', variant: 'danger' })
        }
      }
    }
    loadUserData()
  }, [session])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }))
  }

  const handleUpdateUser = async () => {
    try {
      const token = session?.accessToken ?? ''
      await updateUserData(token, formData)
      setAlert({ show: true, message: 'User data updated successfully!', variant: 'success' })
    } catch (error) {
      console.error('Error updating user data:', error)
      setAlert({ show: true, message: 'Failed to update user data.', variant: 'danger' })
    }
  }

  if (!session || !session.user) {
    return <div>Loading...</div>
  }

  return (
    <div className="container-account-data container">
      {alert.show && (
        <Alert
          variant={alert.variant}
          onClose={() => setAlert({ ...alert, show: false })}
          dismissible
        >
          {alert.message}
        </Alert>
      )}

      <Form>
        <section className="mt-0 mb-5">
          <h5 className="text-secondary border-bottom border-secondary border-account">
            1.
            {' '}
            {dict.pages.accountData.title}
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
          </Row>
        </section>

        <section className="mt-1 mb-4">
          <h5 className="text-secondary border-bottom border-secondary border-account">
            2.
            {' '}
            {dict.pages.accountData.form.address}
          </h5>
          <Row className="px-4">
            <Col md={6}>
              <Form.Group controlId="zipcode">
                <Form.Label className="text-secondary">{dict.pages.accountData.form.zipcode}</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <FontAwesomeIcon className="text-secondary" icon={faMapMarkerAlt} fixedWidth />
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder={dict.pages.accountData.form.zipcode}
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

          <Row className="px-4">
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

          <Row className="px-4 mt-4">
            <Col md={12} className="d-flex justify-content-end">
              <Button
                type="button"
                variant="outline-secondary"
                onClick={handleUpdateUser}
              >
                {dict.pages.accountData.form.save}
              </Button>
            </Col>
          </Row>
        </section>
      </Form>
    </div>
  )
}

export default AccountData
