'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import InstanceCardsRow from '@/components/Cards/Instance/InstanceCardsRow'

interface InstanceCardsProps {
  dict: {
    loadingMessage: string;
    errorMessage: string;
    noDataMessage: string;
  };
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
      setLoading(true)
      setError(null)

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/instance`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
          'Content-Type': 'application/json',
        },
      })

      if (response.status === 401) {
        throw new Error('Usuário não autenticado. Faça login novamente.')
      }

      if (!response.ok) {
        throw new Error('Erro ao buscar instâncias. Tente novamente mais tarde.')
      }

      const data: Instance[] = await response.json()
      setInstances(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido.')
    } finally {
      setLoading(false)
    }
  }, [session?.accessToken])

  useEffect(() => {
    if (session?.accessToken) {
      fetchInstances()
    }
  }, [session?.accessToken, fetchInstances])

  if (loading) {
    return <div>{dict.loadingMessage || 'Carregando...'}</div>
  }

  if (error) {
    return <div>{error}</div>
  }

  if (!instances.length) {
    return <div>{dict.noDataMessage || 'Nenhuma instância encontrada.'}</div>
  }

  return <InstanceCardsRow instances={instances} loading={loading} error={error} dict={dict} />
}

export default InstanceCards
