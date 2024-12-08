import React from 'react'
import { Form } from 'react-bootstrap'

interface InputFieldProps {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (name: string, value: string) => void;
  error?: string;
}

export const InputField: React.FC<InputFieldProps> = ({
  label, name, type = 'text', value, onChange, error,
}) => (
  <Form.Group controlId={name} className="mb-3">
    <Form.Label>{label}</Form.Label>
    <Form.Control
      type={type}
      name={name}
      value={value}
      onChange={(e) => onChange(name, e.target.value)}
      isInvalid={!!error}
      size="sm"
    />
    <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
  </Form.Group>
)
