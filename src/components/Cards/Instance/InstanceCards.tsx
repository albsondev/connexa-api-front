'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import InstanceCardsRow from '@/components/Cards/Instance/InstanceCardsRow'

interface InstanceCardsProps {
  dict: any;
}

interface Instance {
  id: string;
  name: string;
  status: 'connected' | 'disconnected';
}

const InstanceCards: React.FC<InstanceCardsProps> = ({ dict }) => {
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

  return <InstanceCardsRow instances={instances} loading={loading} error={error} dict={dict} />
}

export default InstanceCards
