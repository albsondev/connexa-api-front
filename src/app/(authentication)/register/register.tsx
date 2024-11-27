'use client'

import React, { useState } from 'react'
import {
  Form, Button, Row, Col, InputGroup, Alert,
} from 'react-bootstrap'
// eslint-disable-next-line import/no-extraneous-dependencies
import Select from 'react-select'
// eslint-disable-next-line import/no-extraneous-dependencies
import 'react-world-flags'
import '../register.scss'
import { useRouter } from 'next/navigation'

const Register: React.FC = () => {
  const router = useRouter()
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    referral: '',
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const countryOptions = [
    { value: 'BR', label: '🇧🇷 Brasil' },
    { value: 'US', label: '🇺🇸 Estados Unidos' },
    { value: 'FR', label: '🇫🇷 França' },
    // Adicione mais países aqui
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSelectChange = (selectedOption: any) => {
    setFormData({ ...formData, phone: selectedOption.value })
  }

  const togglePasswordVisibility = () => setShowPassword(!showPassword)
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword)

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.fullName) newErrors.fullName = 'O nome é obrigatório'
    if (!formData.email) newErrors.email = 'O e-mail é obrigatório'
    if (!formData.phone) newErrors.phone = 'O telefone é obrigatório'
    if (!formData.password) newErrors.password = 'A senha é obrigatória'
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'As senhas não coincidem'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      <Alert className="success">
        Cadastro realizado com sucesso!
      </Alert>
      router.push('/')
    }
  }

  return (
    <Row>
      {/* Background Section */}
      <Col md={8} className="background">
        <h1>O que você pode desenvolver?</h1>
        <p>
          Com o
          <strong>&nbsp;CONNEXA-API</strong>
          ,
          você tem inúmeras possibilidades de agregar funcionalidades ao seu negócio!
        </p>
      </Col>

      {/* Form Section */}
      <Col md={4} className="formContainer">
        <Form onSubmit={handleSubmit}>
          <h2>Crie sua conta</h2>
          <p>Informe seus dados nos campos abaixo</p>

          <Form.Group controlId="fullName" className="mb-3">
            <Form.Label>Nome completo</Form.Label>
            <Form.Control
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              isInvalid={!!errors.fullName}
              placeholder="Informe seu nome completo"
            />
            <Form.Control.Feedback type="invalid">
              {errors.fullName}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="email" className="mb-3">
            <Form.Label>E-mail</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              isInvalid={!!errors.email}
              placeholder="Informe seu e-mail"
            />
            <Form.Control.Feedback type="invalid">
              {errors.email}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="phone" className="mb-3">
            <Form.Label>Telefone</Form.Label>
            <Select
              options={countryOptions}
              placeholder="Selecione o país"
              onChange={handleSelectChange}
            />
          </Form.Group>

          <Form.Group controlId="password" className="mb-3">
            <Form.Label>Senha</Form.Label>
            <InputGroup>
              <Form.Control
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                isInvalid={!!errors.password}
                placeholder="Escolha uma senha"
              />
              <Button variant="outline-secondary" onClick={togglePasswordVisibility}>
                {showPassword ? '🙈' : '👁️'}
              </Button>
              <Form.Control.Feedback type="invalid">
                {errors.password}
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>

          <Form.Group controlId="confirmPassword" className="mb-3">
            <Form.Label>Confirme sua senha</Form.Label>
            <InputGroup>
              <Form.Control
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                isInvalid={!!errors.confirmPassword}
                placeholder="Confirme sua senha"
              />
              <Button variant="outline-secondary" onClick={toggleConfirmPasswordVisibility}>
                {showConfirmPassword ? '🙈' : '👁️'}
              </Button>
              <Form.Control.Feedback type="invalid">
                {errors.confirmPassword}
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>

          <Form.Group controlId="referral" className="mb-3">
            <Form.Label>Como nos conheceu?</Form.Label>
            <Form.Control
              type="text"
              name="referral"
              value={formData.referral}
              onChange={handleInputChange}
              placeholder="Ex: Google, indicação, etc."
            />
          </Form.Group>

          <Button type="submit" variant="success" className="w-100">
            Criar nova conta
          </Button>
        </Form>
      </Col>
    </Row>
  )
}

export default Register
