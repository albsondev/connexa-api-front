'use client';

import { Row, Col, Button, Alert } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { useEffect, useState } from 'react';

import './AccountData.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import ModalPayments from '../Modals/ModalPayments';

interface InstanceExpiredProps {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  id: string;
  status: 'trial' | 'expired' | 'active';
  dict: any;
}

const InstanceExpired: React.FC<InstanceExpiredProps> = ({
  onChange,
  onSubmit,
  id,
  status: initialStatus,
  dict
}) => {
  const [status, setStatus] = useState(initialStatus);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setStatus(initialStatus);
  }, [initialStatus]);

  const renderStatus = () => {
    switch (status) {
      case 'trial':
        return <span className="text-warning"><strong>TRIAL</strong></span>;
      case 'expired':
        return <span className="text-danger"><strong>EXPIRED</strong></span>;
      case 'active':
      default:
        return <span className="text-success"><strong>ACTIVE</strong></span>;
    }
  };

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <>
       <Alert variant="warning" className='py-1'>
        <Alert.Heading>
          <span className="fs-6">
            <FontAwesomeIcon icon={faExclamationTriangle} className="text-warning me-2" size='lg' fixedWidth />
              {dict.pages.instances.details.instanceExpired.alertMessage}
            </span>
        </Alert.Heading>
      </Alert>
      <div className="container-account-data container">
        <Form onSubmit={onSubmit}>
          <section className="mt-0 mb-3">
            <h5 className="text-secondary border-bottom border-secondary border-account mb-2">
            {dict.pages.instances.details.instanceExpired.title}
            </h5>
            <p className="text-secondary">
              {dict.pages.instances.details.instanceExpired.makePaymentSubtitle} R$ 99.99
            </p>

            <h5 className="text-dark mb-2">{dict.pages.instances.details.instanceExpired.Signature}</h5>
            <Row className="px-4 py-4 mb-3 mt-3 bg-light rounded-2 border border-1">
              <Col md={12} className="d-flex">
                <div className='me-2'>
                  <span className="text-secondary fw-bold">{dict.pages.instances.details.instanceExpired.instanceCode}:</span>
                </div>
                <div>
                  <span className="status text-uppercase text-uppercase text-secondary fs-6">{id}</span>
                </div>
              </Col>
              <Col md={12}><hr className='mt-1 mb-2'/></Col>
              <Col md={12} className="d-flex mb-2">
                <div className='me-2'>
                  <span className="text-secondary fw-bold">{dict.pages.instances.details.instanceExpired.statusInstance}:</span>
                </div>
                <div>
                  <span className="status text-uppercase text-uppercase">{renderStatus()}</span>
                </div>
              </Col>
              <Col md={12} className="d-flex">
                <div className='me-2'>
                  <span className="text-secondary fw-bold">{dict.pages.instances.details.instanceExpired.expiredIn}:</span>
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
  );
};

export default InstanceExpired;
