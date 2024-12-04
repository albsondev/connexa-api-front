import NavTabs from '@/components/Pages/instances/NavTabs'
import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { getDictionary } from '@/locales/dictionary'

export default async function Page() {
  const dict = await getDictionary()

  return (
    <Row>
      <Col md={12}>
        <NavTabs dict={dict} />
      </Col>
    </Row>
  )
}
