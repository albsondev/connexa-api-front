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

const AccountData = () => (
  <div className="container-account-data container">
    <Form>
      <section className="mt-0 mb-5">
        <h5 className="text-secondary border-bottom border-secondary border-account">1. Dados da conta</h5>
        <Row className="px-4">
          <Col md={6}>
            <Form.Group controlId="fullName">
              <Form.Label className='text-secondary strong'>Nome completo</Form.Label>
              <InputGroup>
                <InputGroup.Text>
                  <FontAwesomeIcon className="text-secondary" icon={faUser} fixedWidth />
                </InputGroup.Text>
                <Form.Control type="text" placeholder="Nome completo" />
              </InputGroup>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="email">
              <Form.Label>E-mail</Form.Label>
              <InputGroup>
                <InputGroup.Text>
                  <FontAwesomeIcon className="text-secondary" icon={faAt} fixedWidth />
                </InputGroup.Text>
                <Form.Control type="email" placeholder="E-mail" />
              </InputGroup>
            </Form.Group>
          </Col>
        </Row>
        <Row className="px-4 mt-4">
          <Col md={6}>
            <Form.Group controlId="cpfCnpj">
              <Form.Label>CPF/CNPJ</Form.Label>
              <InputGroup>
                <InputGroup.Text>
                  <FontAwesomeIcon className="text-secondary" icon={faIdCard} fixedWidth />
                </InputGroup.Text>
                <Form.Control type="text" placeholder="CPF/CNPJ" />
              </InputGroup>
            </Form.Group>
          </Col>
          <Col className='mt-4 pt-1' md={6}>
            <Form.Group controlId="foreign">
              <FloatingLabel controlId="floatingSelect" label="Você é estrangeiro?">
              <Form.Select aria-label="">
                <option value="0">Não</option>
                <option value="1">Sim</option>
              </Form.Select>
            </FloatingLabel>
            </Form.Group>
          </Col>
        </Row>
      </section>

      <section className="mt-1 mb-4">
        <h5 className="text-secondary border-bottom border-secondary border-account">2. Endereço</h5>
        <Row className="px-4">
          <Col md={6}>
            <Form.Group controlId="cep">
              <Form.Label>CEP</Form.Label>
              <InputGroup>
                <InputGroup.Text>
                  <FontAwesomeIcon className="text-secondary" icon={faMapMarkerAlt} fixedWidth />
                </InputGroup.Text>
                <Form.Control type="text" placeholder="CEP" />
              </InputGroup>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="logradouro">
              <Form.Label>Logradouro</Form.Label>
              <InputGroup>
                <InputGroup.Text>
                  <FontAwesomeIcon className="text-secondary" icon={faRoad} fixedWidth />
                </InputGroup.Text>
                <Form.Control type="text" placeholder="Logradouro" />
              </InputGroup>
            </Form.Group>
          </Col>
        </Row>
        <Row className="px-4 mt-4">
          <Col md={6}>
            <Form.Group controlId="bairro">
              <Form.Label>Bairro</Form.Label>
              <InputGroup>
                <InputGroup.Text>
                  <FontAwesomeIcon className="text-secondary" icon={faBuilding} fixedWidth />
                </InputGroup.Text>
                <Form.Control type="text" placeholder="Bairro" />
              </InputGroup>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="numero">
              <Form.Label>Número</Form.Label>
              <InputGroup>
                <InputGroup.Text>
                  <FontAwesomeIcon className="text-secondary" icon={faHome} fixedWidth />
                </InputGroup.Text>
                <Form.Control type="text" placeholder="Número" />
              </InputGroup>
            </Form.Group>
          </Col>
        </Row>
      </section>
      <hr />
      <div className="d-flex justify-content-end">
        <Button variant="danger" className="me-3">
          Cancelar
        </Button>
        <Button variant="primary">Salvar</Button>
      </div>
    </Form>
  </div>
)

export default AccountData
