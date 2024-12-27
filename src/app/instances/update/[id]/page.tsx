import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { getDictionary } from '@/locales/dictionary'
import FormUpdateWebhooks from '@/components/Pages/instances/FormUpdateWebhooks'

const InstanceUpdate = async ({ params }: { params: { id: string } }) => {
  const dict = await getDictionary()
  const { id } = params
  return (
    <Row>
      <Col md={12}>
        <FormUpdateWebhooks dict={dict} id={id} />
      </Col>
    </Row>
  )
}

export default InstanceUpdate
