'use client'

import { Col, Form, Row } from 'react-bootstrap';

interface ToggleButtonWebhooksNotificationsProps {
    dict: any;
}

const ToggleButtonWebhooksNotifications: React.FC<ToggleButtonWebhooksNotificationsProps> = ({ dict }) => {
  return (
    <Row>
        <Col md={12}>
            <Form.Check
                type="switch"
                id="webhooksNotifications"
                label={dict.pages.instances.register.navTabs.form.webhooks.notifyThoseSentByMeAsWell}
            />
        </Col>
    </Row>
  );
};

export default ToggleButtonWebhooksNotifications;
