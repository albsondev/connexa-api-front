import React from 'react'
import { Button as BootstrapButton } from 'react-bootstrap'
import './Form.scss'

interface ButtonProps {
  variant?: string;
  onClick?: () => void;
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset' | undefined;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary', onClick, children, type,
}) => (
  <BootstrapButton variant={variant} onClick={onClick} type={type}>
    {children}
  </BootstrapButton>
)

export default Button
