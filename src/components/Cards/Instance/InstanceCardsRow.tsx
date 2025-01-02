import React from 'react'
import { Col, Row } from 'react-bootstrap'
import InfoCard from '@/components/Cards/InfoCard'
import SkeletonLoaderCards from '@/components/SkeletonLoader/SkeletonLoaderCards'
import ErrorInstanceCards from '@/components/Errors/instances/cards/ErrorInstanceCards'

interface Instance {
  id: string;
  name: string;
  status: 'connected' | 'disconnected';
}

interface InstanceCardsRowProps {
  instances: Instance[];
  loading: boolean;
  error: string | null;
  dict: any;
}

const InstanceCardsRow: React.FC<InstanceCardsRowProps> = ({
  instances, loading, error, dict,
}) => {
  if (loading) {
    return <SkeletonLoaderCards />
  }

  if (error) {
    return <ErrorInstanceCards msg={error} />
  }

  if (!instances || instances.length === 0) {
    return <ErrorInstanceCards msg="Sem instâncias disponíveis" />
  }

  const totalInstances = instances.length
  const connectedInstances = instances.filter((instance) => instance.status === 'connected').length
  const disconnectedInstances = instances.filter((instance) => instance.status === 'disconnected').length

  return (
    <Row>
      <Col sm={12} md={6} lg={4}>
        <InfoCard
          title={dict.dashboard.cardsInfo.totalWebConnections}
          subtitle={dict.dashboard.cardsInfo.totalWebInstancesRunning}
          value={totalInstances}
          bgColor="#f2f484"
          link="/instances"
          dict={dict}
        />
      </Col>
      <Col sm={12} md={6} lg={4}>
        <InfoCard
          title={dict.dashboard.cardsInfo.webInstancesConnected}
          subtitle={dict.dashboard.cardsInfo.totalWebConnections}
          value={connectedInstances}
          bgColor="#aedbe3"
          link="/instances"
          dict={dict}
        />
      </Col>
      <Col sm={12} md={6} lg={4}>
        <InfoCard
          title={dict.dashboard.cardsInfo.webInstancesDisconnected}
          subtitle={dict.dashboard.cardsInfo.totalWebDisconnections}
          value={disconnectedInstances}
          bgColor="#ffc1e3"
          link="/instances"
          dict={dict}
        />
      </Col>
    </Row>
  )
}

export default InstanceCardsRow
