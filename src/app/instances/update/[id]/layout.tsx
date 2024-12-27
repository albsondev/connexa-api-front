import { Container } from 'react-bootstrap'
import React from 'react'

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Container fluid="lg">
      {children}
    </Container>
  )
}
