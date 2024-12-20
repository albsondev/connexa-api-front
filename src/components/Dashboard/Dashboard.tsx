'use client'

import React from 'react'
import Chart from '@/components/Layout/Dashboard/Chart/Chart'
import MessageStats from '@/components/Layout/Dashboard/MessageStats/MessageStats'
import { Col, Row } from 'react-bootstrap'
import InstanceCards from '@/components/Cards/Instance/InstanceCards'
import CardsFilterRow from '../Cards/CardsFilterRow'

interface DashboardProps {
  dict: any;
}

const Dashboard: React.FC<DashboardProps> = ({ dict }) => (
  <>
    <InstanceCards dict={dict} />
    <CardsFilterRow dict={dict} />
    <Row>
      <Col md={8}>
        <Chart dict={dict} />
      </Col>
      <Col md={4}>
        <MessageStats dict={dict} />
      </Col>
    </Row>
  </>
)

export default Dashboard
