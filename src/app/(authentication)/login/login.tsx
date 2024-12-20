'use client'

import {
  Alert, Button, Form, FormControl, InputGroup,
} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faAt,
  faEye, faEyeSlash, faLock,
} from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import InputGroupText from 'react-bootstrap/InputGroupText'
import { useRouter } from 'next/navigation'
import useDictionary from '@/locales/dictionary-hook'
import { signIn } from 'next-auth/react'

export default function Login({ callbackUrl }: { callbackUrl: string }) {
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const dict = useDictionary()
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')

    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
        callbackUrl,
      })

      if (result?.error) {
        setError(result.error)
      } else if (result?.url) {
        router.push(result.url)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unexpected error')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <Alert
        variant="danger"
        show={error !== ''}
        onClose={() => setError('')}
        dismissible
      >
        {error}
      </Alert>

      <Form onSubmit={handleSubmit}>
        <InputGroup className="mb-3 border border-1 rounded">
          <InputGroupText className="bg-white border-0">
            <FontAwesomeIcon className="text-primary" icon={faAt} fixedWidth />
          </InputGroupText>
          <FormControl
            name="email"
            required
            disabled={submitting}
            placeholder={dict.login.form.email}
            aria-label="Email"
            className="border-0"
          />
        </InputGroup>

        <InputGroup className="mb-3 border border-1 rounded">
          <InputGroupText className="bg-white border-0">
            <FontAwesomeIcon className="text-primary" icon={faLock} fixedWidth />
          </InputGroupText>
          <FormControl
            type={showPassword ? 'text' : 'password'}
            name="password"
            required
            disabled={submitting}
            placeholder={dict.login.form.password}
            className="border-0"
          />
          <Button
            variant="outline-secondary border-0"
            onClick={() => setShowPassword(!showPassword)}
          >
            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} fixedWidth />
          </Button>
        </InputGroup>

        <Button type="submit" className="w-100" disabled={submitting}>
          {dict.login.form.submit}
        </Button>
      </Form>
    </>
  )
}
