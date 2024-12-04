'use client'

import {
  Button, Col, Form, InputGroup, Row,
} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopy, faHdd, faLink } from '@fortawesome/free-solid-svg-icons'
import ToggleButtonsConfigs from './ToggleButtonsConfigs'

interface FormRegisterNewInstanceProps {
  dict: any;
}

const FormRegisterNewInstance: React.FC<FormRegisterNewInstanceProps> = ({ dict }) => (
  <Form>
    <Row>
      <Col md={12}>
        <h5>
          1.
          {` ${dict.pages.instances.register.navTabs.webInstanceData}`}
        </h5>
        <hr />
      </Col>
    </Row>
    <Row className="mb-3">
      <Col md={4}>
        <Form.Group controlId="instanceName">
          <Form.Label>{dict.pages.instances.register.navTabs.form.instanceName}</Form.Label>
          <InputGroup>
            <Form.Control type="text" placeholder={dict.pages.instances.register.navTabs.form.instanceName} />
            <InputGroup.Text>
              <FontAwesomeIcon className="text-secondary" icon={faHdd} />
            </InputGroup.Text>
          </InputGroup>
        </Form.Group>
      </Col>

      <Col md={4}>
        <Form.Group controlId="instanceId">
          <Form.Label>{dict.pages.instances.register.navTabs.form.instanceId}</Form.Label>
          <InputGroup>
            <Form.Control type="text" placeholder={dict.pages.instances.register.navTabs.form.instanceId} disabled />
            <InputGroup.Text>
              <FontAwesomeIcon className="text-secondary" icon={faHdd} />
            </InputGroup.Text>
          </InputGroup>
        </Form.Group>
      </Col>
      <Col md={4}>
        <Form.Group controlId="tokenIntegration">
          <Form.Label>
            {dict.pages.instances.register.navTabs.form.tokenIntegration}
            <Button size="sm" variant="link" href="#" className="mx-2 text-secondary">
              <FontAwesomeIcon className="text-secondary" icon={faCopy} />
            </Button>
          </Form.Label>
          <InputGroup>
            <Form.Control type="text" placeholder={dict.pages.instances.register.navTabs.form.tokenIntegration} disabled />
            <InputGroup.Text>
              <FontAwesomeIcon className="text-secondary" icon={faLink} />
            </InputGroup.Text>
          </InputGroup>
          <Form.Text className="text-link float-end">
            <Button size="sm" variant="link" href="/instances/token" className="text-secondary">
              {dict.pages.instances.register.navTabs.form.generateNewToken}
            </Button>
          </Form.Text>
        </Form.Group>
      </Col>
    </Row>
    <Row>
      <Col md={12}>
        <h5>
          2.
          {` ${dict.pages.instances.register.navTabs.configs}`}
        </h5>
        <hr />
      </Col>
    </Row>
    <Row>
      <ToggleButtonsConfigs dict={dict} />
    </Row>
    <hr />
    <Row>
      <Col md={12} className="d-flex justify-content-end align-items-center">
        <Button variant="primary" type="submit" className="me-2">
          {dict.pages.instances.register.navTabs.form.continue}
        </Button>
        <Button variant="secondary" type="reset">
          {dict.pages.instances.register.navTabs.form.cancel}
        </Button>
      </Col>
    </Row>
  </Form>
)

export default FormRegisterNewInstance
