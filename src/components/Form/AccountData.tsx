'use client'

import {Row, Col, Button, InputGroup,} from 'react-bootstrap'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
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
import './AccountData.scss'

interface AccountDataProps {
  dict: any
}

const AccountData: React.FC<AccountDataProps> = ({ dict }) => (
  <div className="container-account-data container">
    <Form>
      <section className="mt-0 mb-5">
        <h5 className="text-secondary border-bottom border-secondary border-account">1.{' ' + dict.pages.accountData.title}</h5>
        <Row className="px-4">
          <Col md={6}>
            <Form.Group controlId="fullName">
              <Form.Label className='text-secondary strong'>{dict.pages.accountData.form.fullName}</Form.Label>
              <InputGroup>
                <InputGroup.Text>
                  <FontAwesomeIcon className="text-secondary" icon={faUser} fixedWidth />
                </InputGroup.Text>
                <Form.Control type="text" placeholder={dict.pages.accountData.form.fullName} />
              </InputGroup>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="email">
              <Form.Label className='text-secondary'>{dict.pages.accountData.form.email}</Form.Label>
              <InputGroup>
                <InputGroup.Text>
                  <FontAwesomeIcon className="text-secondary" icon={faAt} fixedWidth />
                </InputGroup.Text>
                <Form.Control type="email" placeholder={dict.pages.accountData.form.email} />
              </InputGroup>
            </Form.Group>
          </Col>
        </Row>
        <Row className="px-4 mt-4">
          <Col md={6}>
            <Form.Group controlId="cpfCnpj">
              <Form.Label className='text-secondary'>{dict.pages.accountData.form.cpfCnpj}</Form.Label>
              <InputGroup>
                <InputGroup.Text>
                  <FontAwesomeIcon className="text-secondary" icon={faIdCard} fixedWidth />
                </InputGroup.Text>
                <Form.Control type="text" placeholder={dict.pages.accountData.form.cpfCnpj} />
              </InputGroup>
            </Form.Group>
          </Col>
          <Col className='mt-4 pt-1' md={6}>
            <Form.Group controlId="foreign">
              <FloatingLabel controlId="floatingSelect" label={dict.pages.accountData.form.yourAForeigner}>
              <Form.Select aria-label="">
                <option value="0">{dict.pages.accountData.form.no}</option>
                <option value="1">{dict.pages.accountData.form.yes}</option>
              </Form.Select>
            </FloatingLabel>
            </Form.Group>
          </Col>
        </Row>
      </section>

      <section className="mt-1 mb-4">
        <h5 className="text-secondary border-bottom border-secondary border-account">2. {' ' + dict.pages.accountData.form.address}</h5>
        <Row className="px-4">
          <Col md={6}>
            <Form.Group controlId="cep">
              <Form.Label className='text-secondary'>{dict.pages.accountData.form.cep}</Form.Label>
              <InputGroup>
                <InputGroup.Text>
                  <FontAwesomeIcon className="text-secondary" icon={faMapMarkerAlt} fixedWidth />
                </InputGroup.Text>
                <Form.Control type="text" placeholder={dict.pages.accountData.form.cep} />
              </InputGroup>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="logradouro">
              <Form.Label className='text-secondary'>{dict.pages.accountData.form.street}</Form.Label>
              <InputGroup>
                <InputGroup.Text>
                  <FontAwesomeIcon className="text-secondary" icon={faRoad} fixedWidth />
                </InputGroup.Text>
                <Form.Control type="text" placeholder={dict.pages.accountData.form.street} />
              </InputGroup>
            </Form.Group>
          </Col>
        </Row>
        <Row className="px-4 mt-4">
          <Col md={6}>
            <Form.Group controlId="bairro">
              <Form.Label className='text-secondary'>{dict.pages.accountData.form.neighborhood}</Form.Label>
              <InputGroup>
                <InputGroup.Text>
                  <FontAwesomeIcon className="text-secondary" icon={faBuilding} fixedWidth />
                </InputGroup.Text>
                <Form.Control type="text" placeholder={dict.pages.accountData.form.neighborhood} />
              </InputGroup>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="numero">
              <Form.Label className='text-secondary'>{dict.pages.accountData.form.number}</Form.Label>
              <InputGroup>
                <InputGroup.Text>
                  <FontAwesomeIcon className="text-secondary" icon={faHome} fixedWidth />
                </InputGroup.Text>
                <Form.Control type="text" placeholder={dict.pages.accountData.form.number} />
              </InputGroup>
            </Form.Group>
          </Col>
        </Row>
      </section>
      <hr />
      <div className="d-flex justify-content-end">
        <Button variant="danger" className="me-3">
          {dict.pages.accountData.form.btnCancel}
        </Button>
        <Button variant="primary">{dict.pages.accountData.form.btnSave}</Button>
      </div>
    </Form>
  </div>
)

export default AccountData
