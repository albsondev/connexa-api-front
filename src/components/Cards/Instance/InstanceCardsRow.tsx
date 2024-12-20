import React from 'react'
import { Col, Row } from 'react-bootstrap'
import InfoCard from '@/components/Cards/InfoCard'

interface Instance {
  id: string;
  name: string;
  status: 'connected' | 'disconnected';
}

interface InstanceCardsRowProps {
  instances: Instance[]; // A lista de instâncias a ser exibida
  loading: boolean; // O estado de carregamento
  error: string | null; // Mensagem de erro, se houver
  dict: any; // Qualquer outro dado necessário (como o dict)
}

const InstanceCardsRow: React.FC<InstanceCardsRowProps> = ({
  instances, loading, error, dict,
}) => {
  if (loading) {
    return <div>Carregando...</div>
  }

  if (error) {
    return <div>{error}</div>
  }

  if (instances.length === 0) {
    return <div>Sem instâncias disponíveis.</div>
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
          link="/dashboard/instances"
          dict={dict}
        />
      </Col>
      <Col sm={12} md={6} lg={4}>
        <InfoCard
          title={dict.dashboard.cardsInfo.webInstancesConnected}
          subtitle={dict.dashboard.cardsInfo.totalWebConnections}
          value={connectedInstances}
          bgColor="#aedbe3"
          link="/dashboard/connected"
          dict={dict}
        />
      </Col>
      <Col sm={12} md={6} lg={4}>
        <InfoCard
          title={dict.dashboard.cardsInfo.webInstancesDisconnected}
          subtitle={dict.dashboard.cardsInfo.totalWebDisconnections}
          value={disconnectedInstances}
          bgColor="#ffc1e3"
          link="/dashboard/disconnected"
          dict={dict}
        />
      </Col>
    </Row>
  )
}

export default InstanceCardsRow
