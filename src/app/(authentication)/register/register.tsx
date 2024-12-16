'use client'

import React, { useState } from 'react'
import {
  Button, Col, Form, Spinner,
} from 'react-bootstrap'
import { useRouter } from 'next/navigation'
import Select from 'react-select'
import AlertMessage from '@/components/Pages/user/register/AlertMessage'
import { InputField } from '@/components/Pages/user/register/InputField'
import PasswordField from '@/components/Pages/user/register/PasswordField'
import { PhoneInput } from '@/components/Pages/user/register/PhoneInput'
import { registerUser } from '@/app/api/user/register/registerUser'
import '../register.scss'

const Register: React.FC = () => {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '+55 ',
    country: 'BR',
    password: '',
    confirmPassword: '',
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [alertMessage, setAlertMessage] = useState<{ message: string; type: 'success' | 'danger' } | null>(null)

  const countryOptions = [
    { value: 'BR', label: '🇧🇷 Brasil' },
    { value: 'US', label: '🇺🇸 Estados Unidos' },
    { value: 'FR', label: '🇫🇷 França' },
  ]

  const handleInputChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value })
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name) newErrors.name = 'O nome é obrigatório'
    if (!formData.email) newErrors.email = 'O e-mail é obrigatório'
    if (!formData.password) newErrors.password = 'A senha é obrigatória'
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'As senhas não coincidem'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsLoading(true)
    try {
      await registerUser(formData)
      setAlertMessage({ message: 'Cadastro realizado com sucesso!', type: 'success' })
      router.push('/')
    } catch (error) {
      setAlertMessage({ message: 'Erro ao cadastrar o usuário.', type: 'danger' })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Col md={8} className="background">
        <h1>O que você pode desenvolver?</h1>
        <p>
          Com o
          <strong>&nbsp;CONNEXA-API</strong>
          , você tem inúmeras possibilidades de agregar funcionalidades ao seu negócio!
        </p>
      </Col>

      <Col md={4} className="formContainer">
        {alertMessage && <AlertMessage message={alertMessage.message} type={alertMessage.type} />}

        <Form onSubmit={handleSubmit}>
          <h2>Crie sua conta</h2>

          <InputField
            label="Nome completo"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            error={errors.name}
          />

          <InputField
            label="E-mail"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            error={errors.email}
          />

          <Select
            options={countryOptions}
            value={countryOptions.find((option) => option.value === formData.country)}
            onChange={(option) => handleInputChange('country', option?.value ?? '')}
            className="mb-3"
          />

          <PhoneInput
            label="Telefone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            error={errors.phone}
          />

          <PasswordField
            label="Senha"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            error={errors.password}
          />

          <PasswordField
            label="Confirmar senha"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            error={errors.confirmPassword}
          />

          <Button type="submit" variant="success" className="w-100 mt-2" disabled={isLoading}>
            {isLoading ? <Spinner animation="border" size="sm" /> : 'Criar nova conta'}
          </Button>
        </Form>
      </Col>
    </>
  )
}

export default Register
