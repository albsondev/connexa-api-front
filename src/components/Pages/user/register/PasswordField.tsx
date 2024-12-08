import React, { useState } from 'react'
import { Button, Form, InputGroup } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

interface PasswordInputProps {
  label: string;
  name: string;
  value: string;
  onChange: (name: string, value: string) => void;
  error?: string;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  label, name, value, onChange, error,
}) => {
  const [showPassword, setShowPassword] = useState(false)

  const togglePasswordVisibility = () => setShowPassword(!showPassword)

  return (
    <Form.Group controlId={name} className="mb-3">
      <Form.Label>{label}</Form.Label>
      <InputGroup size="sm">
        <Form.Control
          type={showPassword ? 'text' : 'password'}
          name={name}
          value={value}
          onChange={(e) => onChange(name, e.target.value)}
          isInvalid={!!error}
          size="sm"
        />
        <Button variant="outline-secondary" onClick={togglePasswordVisibility}>
          <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
        </Button>
        {error && <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>}
      </InputGroup>
    </Form.Group>
  )
}

export default PasswordInput
