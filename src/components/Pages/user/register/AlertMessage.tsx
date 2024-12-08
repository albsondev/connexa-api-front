import React from 'react'
import { Alert } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'

interface AlertMessageProps {
  message: string | null;
  type: 'success' | 'danger';
}

const AlertMessage: React.FC<AlertMessageProps> = ({ message, type }) => {
  if (!message) return null

  const icon = type === 'success' ? faCheckCircle : faExclamationTriangle
  const variant = type === 'success' ? 'success' : 'danger'

  return (
    <Alert variant={variant} className="d-flex align-items-center">
      <FontAwesomeIcon icon={icon} className="me-2" />
      {message}
    </Alert>
  )
}

export default AlertMessage
