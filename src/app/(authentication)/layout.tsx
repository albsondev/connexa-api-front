import { Container } from 'react-bootstrap'
import React from 'react'
import './login.scss'

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-light dark:bg-dark container-login">
      <Container fluid>
        {children}
      </Container>
    </div>
  )
}
