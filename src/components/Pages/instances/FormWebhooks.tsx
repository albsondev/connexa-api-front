'use client'

import { Alert, Button, Col, Form, InputGroup, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faCopy, faAngleDoubleRight, faAngleDoubleLeft, faMapMarker, faSignOut, faBolt } from "@fortawesome/free-solid-svg-icons";
import { useState } from 'react';
import ToggleButtonWebhooksNotifications from './ToggleButtonWebhooksNotifications';


interface FormWebhooksProps {
    dict: any
}

const FormWebhooks: React.FC<FormWebhooksProps> = ({ dict }) => {

    const [show, setShow] = useState(true);
    
  return (
    <Form>
        <Row>
            <Col md={12}>
                <h5>3.{' '+dict.pages.instances.register.navTabs.configureWebhooks}</h5>
                <div className=''>
                    <Alert show={show} key='warning' variant='warning' onClose={() => setShow(false)} dismissible>
                        {dict.pages.instances.register.navTabs.subtitleWebhooks}
                    </Alert>
                </div>
                <hr />
            </Col>
        </Row>
        <Row className='mb-4'>
            <Col md={6}>
                <Form.Group controlId="instanceName">
                    <Form.Label>{dict.pages.instances.register.navTabs.form.webhooks.whenSendMessage}</Form.Label>
                    <InputGroup>
                        <Form.Control type="text" placeholder={dict.pages.instances.register.navTabs.form.webhooks.whenSendMessage} />
                        <InputGroup.Text>
                            <FontAwesomeIcon className='text-secondary' icon={faAngleDoubleRight} />
                        </InputGroup.Text>
                    </InputGroup>
                </Form.Group>
            </Col>

            <Col md={6}>
                <Form.Group controlId="chatPresence">
                    <Form.Label>{dict.pages.instances.register.navTabs.form.webhooks.chatPresence}</Form.Label>
                    <InputGroup>
                        <Form.Control type="text" placeholder={dict.pages.instances.register.navTabs.form.webhooks.chatPresence} />
                        <InputGroup.Text>
                            <FontAwesomeIcon className='text-secondary' icon={faMapMarker} />
                        </InputGroup.Text>
                    </InputGroup>
                </Form.Group>
            </Col>
        </Row>
        <Row className='mb-4'>
            <Col md={6}>
                <Form.Group controlId="whenDisconnect">
                    <Form.Label>{dict.pages.instances.register.navTabs.form.webhooks.whenDisconnect}</Form.Label>
                    <InputGroup>
                        <Form.Control type="text" placeholder={dict.pages.instances.register.navTabs.form.webhooks.whenDisconnect} />
                        <InputGroup.Text>
                            <FontAwesomeIcon className='text-secondary' icon={faSignOut} />
                        </InputGroup.Text>
                    </InputGroup>
                </Form.Group>
            </Col>

            <Col md={6}>
                <Form.Group controlId="receiveMessageStatus">
                    <Form.Label>{dict.pages.instances.register.navTabs.form.webhooks.receiveMessageStatus}</Form.Label>
                    <InputGroup>
                        <Form.Control type="text" placeholder={dict.pages.instances.register.navTabs.form.webhooks.receiveMessageStatus} />
                        <InputGroup.Text>
                            <FontAwesomeIcon className='text-secondary' icon={faBolt} />
                        </InputGroup.Text>
                    </InputGroup>
                </Form.Group>
            </Col>
        </Row>
        <Row className='mb-5'>
            <Col md={6}>
                <Form.Group controlId="whenReceiveMessage">
                    <Form.Label>{dict.pages.instances.register.navTabs.form.webhooks.whenReceiveMessage}</Form.Label>
                    <InputGroup>
                        <Form.Control type="text" placeholder={dict.pages.instances.register.navTabs.form.webhooks.whenReceiveMessage} />
                        <InputGroup.Text>
                            <FontAwesomeIcon className='text-secondary' icon={faAngleDoubleLeft} />
                        </InputGroup.Text>
                    </InputGroup>
                </Form.Group>
            </Col>

            <Col md={6}>
                <Form.Group controlId="whenConnect">
                    <Form.Label>{dict.pages.instances.register.navTabs.form.webhooks.whenConnect}</Form.Label>
                    <InputGroup>
                        <Form.Control type="text" placeholder={dict.pages.instances.register.navTabs.form.webhooks.whenConnect} />
                        <InputGroup.Text>
                            <FontAwesomeIcon className='text-secondary' icon={faCopy} />
                        </InputGroup.Text>
                    </InputGroup>
                </Form.Group>
            </Col>
        </Row>
        <Row>
            <Col md={12}>
            <h6>{dict.pages.instances.register.navTabs.form.webhooks.notifyThoseSentByMeAsWell}</h6>
            <hr />
            </Col>
        </Row>
        <Row>
            <ToggleButtonWebhooksNotifications dict={dict} />
        </Row>
        <hr />
        <Row>
            <Col md={12} className='d-flex justify-content-end align-items-center'>
                <Button variant="primary" type="submit" className='me-2'>
                    {dict.pages.instances.register.navTabs.form.save}
                </Button>
                <Button variant="secondary" type="reset">
                    {dict.pages.instances.register.navTabs.form.cancel}
                </Button>
            </Col>
        </Row>
    </Form>
  );
};

export default FormWebhooks;
