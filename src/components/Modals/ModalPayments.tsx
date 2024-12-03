import { faCreditCardAlt, faFileAlt } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

interface ModalPaymentsProps {
  show: boolean;
  onClose: () => void;
  dict: any
}

const ModalPayments: React.FC<ModalPaymentsProps> = ({ show, onClose, dict }) => {

    const handleTypePayment = (type: string) => {
        console.log(`Tipo de pagamento selecionado: ${type}`);
      };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header className='bg-light' closeButton>
        <Modal.Title className='text-secondary'>{dict.pages.instances.details.modalPayments.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className='fw-bold'>{dict.pages.instances.details.modalPayments.subtitle}</p>
        <div className='d-grid gap-2'>
            <Button variant="primary" onClick={() => handleTypePayment('creditCard')}>
              <span className="d-flex align-items-center">
                <FontAwesomeIcon icon={faCreditCardAlt} className="me-2" />
                <span>{dict.pages.instances.details.modalPayments.creditCard}</span>
              </span>
            </Button>
            <Button variant="primary" onClick={() => handleTypePayment('deditCard')}>
              <span className="d-flex align-items-center">
                <FontAwesomeIcon icon={faCreditCardAlt} className="me-2" />
                <span>{dict.pages.instances.details.modalPayments.debitCard}</span>
              </span>
            </Button>
            <Button variant="primary" onClick={() => handleTypePayment('boleto')}>
              <span className="d-flex align-items-center">
                <FontAwesomeIcon icon={faFileAlt} className="me-2" />
                <span>{dict.pages.instances.details.modalPayments.bankSlip}</span>
              </span>
            </Button>
        </div>  
      </Modal.Body>
      <Modal.Footer className='d-grid gap-2 bg-light' style={{justifyContent: 'normal'}}>
        <Button variant="secondary" onClick={onClose}>
        {dict.pages.instances.details.modalPayments.btnCancel}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalPayments;
