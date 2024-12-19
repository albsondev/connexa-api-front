import React from 'react'
import FilterComponent from '@/components/Filters/Filter'
import CardsFilter from '@/components/Cards/CardsFilter'
import { Col, Row } from 'react-bootstrap'

interface CardsFilterRowProps {
  dict: {
    dashboard: {
      cardsFilter: {
        totalSent: string;
        totalReceived: string;
      };
    };
  };
}

const CardsFilterRow: React.FC<CardsFilterRowProps> = ({ dict }) => (
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
)

export default CardsFilterRow
