'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Alert } from 'react-bootstrap'

interface CustomAlertProps {
  variant: 'warning' | 'danger' | 'success';
  title: string;
  message?: string;
  icon: any;
}

const CustomAlert: React.FC<CustomAlertProps> = ({
  variant, title, message, icon,
}) => (
  <Alert variant={variant} className="py-1 pb-1">
    <Alert.Heading>
      <span className="fs-6">
        <FontAwesomeIcon icon={icon} className="text-warning me-2" size="lg" fixedWidth />
        {title}
      </span>
    </Alert.Heading>
    {message && <p className={`border-top border-${variant} border-opacity-25`}>{message}</p>}
  </Alert>
)

export default CustomAlert
