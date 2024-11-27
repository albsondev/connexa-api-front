import React from 'react'
import { Form } from 'react-bootstrap'
import './Form.scss'

interface InputProps {
  label: string;
  type: string;
  placeholder: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  icon?: string;
}

const Input: React.FC<InputProps> = ({
  label, type, placeholder, value, onChange, icon,
}) => (
  <Form.Group className="mb-3">
    {label && <Form.Label>{label}</Form.Label>}
    <Form.Control
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={icon ? 'd-flex align-items-center' : ''}
    />
    {icon && (
    <div className="input-icon">
      <i className={`fa ${icon}`} />
    </div>
    )}
  </Form.Group>
)

export default Input
