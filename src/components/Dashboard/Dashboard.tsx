'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import Chart from '@/components/Layout/Dashboard/Chart/Chart'
import MessageStats from '@/components/Layout/Dashboard/MessageStats/MessageStats'
import { Col, Row } from 'react-bootstrap'
import InstanceCards from '../Cards/InstanceCards'
import CardsFilterRow from '../Cards/CardsFilterRow'

interface DashboardProps {
  dict: any;
}

interface Instance {
  id: string;
  name: string;
  status: 'connected' | 'disconnected';
}

const Dashboard: React.FC<DashboardProps> = ({ dict }) => {
  const { data: session } = useSession()
  const [instances, setInstances] = useState<Instance[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const fetchInstances = useCallback(async () => {
    if (!session?.accessToken) {
      setError('Token de autenticação não encontrado.')
      setLoading(false)
      return
    }

    try {
      const response = await fetch('/api/instance', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      })
      if (!response.ok) {
        throw new Error('Erro ao buscar instâncias')
      }

      const data = await response.json()
      setInstances(data)
    } catch (err) {
      console.error(err)
      setError('Falha ao carregar instâncias')
    } finally {
      setLoading(false)
    }
  }, [session?.accessToken])

  useEffect(() => {
    if (session) {
      fetchInstances()
    }
  }, [session, fetchInstances])

  return (
    <>
      <InstanceCards instances={instances} loading={loading} error={error} dict={dict} />
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
}

export default Dashboard
