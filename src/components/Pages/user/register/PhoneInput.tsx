import React from 'react'
import InputMask from 'react-input-mask'
import { Form } from 'react-bootstrap'

export const PhoneInput: React.FC<any> = ({
  label, name, value, onChange, error,
}) => (
  <Form.Group controlId={name} className="mb-3">
    <Form.Label>{label}</Form.Label>
    <InputMask mask="+55 99 9 9999-9999" value={value} onChange={(e) => onChange(name, e.target.value)}>
      {() => (
        <Form.Control type="text" isInvalid={!!error} size="sm" />
      )}
    </InputMask>
    <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
  </Form.Group>
)
