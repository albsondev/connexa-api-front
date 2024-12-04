'use client'

import {
  Alert, Button, Col, Form, FormControl, InputGroup, Row,
} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faEye, faEyeSlash, faLock, faUser,
} from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import Link from 'next/link'
import InputGroupText from 'react-bootstrap/InputGroupText'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import useDictionary from '@/locales/dictionary-hook'

export default function Login({ callbackUrl }: { callbackUrl: string }) {
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const dict = useDictionary()
  const [showPassword, setShowPassword] = useState(false)

  const login = async (formData: FormData) => {
    setSubmitting(true)

    try {
      const res = await signIn('credentials', {
        username: formData.get('username'),
        password: formData.get('password'),
        redirect: false,
        callbackUrl,
      })

      if (!res) {
        setError('Login failed')
        return
      }

      const { ok, url, error: err } = res

      if (!ok) {
        if (err) {
          setError(err)
          return
        }

        setError('Login failed')
        return
      }

      if (url) {
        router.push(url)
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      }
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
      <Form action={login}>
        {/* Username Input */}
        <InputGroup className="mb-3 border border-1 rounded">
          <InputGroupText className="bg-white border-0">
            <FontAwesomeIcon className="text-primary" icon={faUser} fixedWidth />
          </InputGroupText>
          <FormControl
            name="username"
            required
            disabled={submitting}
            placeholder={dict.login.form.username}
            aria-label="Username"
            defaultValue="Username"
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
            aria-label="Password"
            defaultValue="Password"
            className="border-0"
          />
          <Button
            variant="outline-secondary border-0"
            onClick={() => setShowPassword(!showPassword)}
            disabled={submitting}
          >
            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} fixedWidth />
          </Button>
        </InputGroup>

        <Row className="align-items-center">
          <Col xs={12}>
            <Button
              className="w-100"
              variant="primary"
              type="submit"
              disabled={submitting}
            >
              {dict.login.form.submit}
            </Button>
          </Col>
          <Col xs={12} className="text-end mt-2">
            <Link className="px-0 text-secondary" href="#">
              {dict.login.forgot_password}
            </Link>
          </Col>
        </Row>
      </Form>
    </>
  )
}
