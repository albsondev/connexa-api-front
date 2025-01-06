'use client'

import React, { useCallback, useEffect, useState } from 'react'
import InstanceCardsRow from '@/components/Cards/Instance/InstanceCardsRow'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import SkeletonLoaderCards from '@/components/SkeletonLoader/SkeletonLoaderCards'

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

    setLoading(true)
    setError(null)

    try {
      const response = await axios.get('/api/instance', {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      })

      if (response.status !== 200) {
        console.error('Erro ao buscar instâncias...código diferente de 200:', response)
        throw new Error('Erro ao buscar instâncias')
      }

      const { data } = response
      setInstances(data)
    } catch (err: any) {
      console.error(err)
      setError(err.message || 'Falha ao carregar instâncias')
    } finally {
      setLoading(false)
    }
  }, [session?.accessToken])

  useEffect(() => {
    if (session) {
      fetchInstances()
    }
  }, [session, fetchInstances])

  if (loading) {
    return <SkeletonLoaderCards />
  }

  return (
    <InstanceCardsRow
      instances={instances}
      loading={loading}
      error={error}
      dict={dict}
    />
  )
}

export default InstanceCards
