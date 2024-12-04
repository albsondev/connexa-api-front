'use client'

import { Col, Form, Row } from 'react-bootstrap'

interface ToggleButtonsConfigsProps {
  dict: any;
}

const ToggleButtonsConfigs: React.FC<ToggleButtonsConfigsProps> = ({ dict }) => (
  <Row>
    <Col md={4}>
      <Form.Check
        type="switch"
        id="reject-calls"
        label={dict.pages.instances.register.navTabs.form.automaticallyRejectCalls}
      />
    </Col>
    <Col md={4}>
      <Form.Check
        type="switch"
        id="read-messages"
        label={dict.pages.instances.register.navTabs.form.automaticallyReadMessages}
      />
    </Col>
  </Row>
)

export default ToggleButtonsConfigs
