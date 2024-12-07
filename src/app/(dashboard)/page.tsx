import React from 'react'
import { getDictionary } from '@/locales/dictionary'
import FilterComponent from '@/components/Filters/Filter'
import CardsFilter from '@/components/Cards/CardsFilter'
import Chart from '@/components/Layout/Dashboard/Chart/Chart'
import MessageStats from '@/components/Layout/Dashboard/MessageStats/MessageStats'
import InfoCard from '@/components/Cards/InfoCard'
import { Col, Row } from 'react-bootstrap'

export default async function Page() {
  const dict = await getDictionary()

  return (
    <div>
      <Row>
        <Col sm={12} md={6} lg={4}>
          <InfoCard
            title={dict.dashboard.cardsInfo.totalWebConnections}
            subtitle={dict.dashboard.cardsInfo.totalWebInstancesRunning}
            value="434"
            bgColor="#f2f484"
            link="/#"
          />
        </Col>
        <Col sm={12} md={6} lg={4}>
          <InfoCard
            title={dict.dashboard.cardsInfo.webInstancesConnected}
            subtitle={dict.dashboard.cardsInfo.totalWebConnections}
            value="234"
            bgColor="#aedbe3"
            link="/#"
          />
        </Col>
        <Col sm={12} md={6} lg={4}>
          <InfoCard
            title={dict.dashboard.cardsInfo.webInstancesDisconnected}
            subtitle={dict.dashboard.cardsInfo.totalWebDisconnections}
            value="1.575"
            bgColor="#ffc1e3"
            link="/#"
          />
        </Col>
      </Row>
      <Row className="row-cardsFilter">
        <Col md={8} className="mt-3">
          <FilterComponent dict={dict} />
        </Col>
        <Col md={2} className="mt-3">
          <CardsFilter
            title={dict.dashboard.cardsFilter.totalSent}
            value={77}
            arrowDirection="sended"
          />
        </Col>
        <Col md={2} className="mt-3">
          <CardsFilter
            title={dict.dashboard.cardsFilter.totalReceived}
            value={45}
            arrowDirection="received"
          />
        </Col>
      </Row>
      <Row>
        <Col md={8}>
          <Chart dict={dict} />
        </Col>
        <Col md={4}>
          <MessageStats dict={dict} />
        </Col>
      </Row>
    </div>
  )
}
