'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import InstanceTableData from '@/components/Table/InstanceTableData'

interface InstanceTableProps {
  dict: any;
  activeTab: 'all' | 'connected' | 'disconnected';
  searchQuery: string;
}

interface Instance {
  id: string;
  name: string;
  status: 'connected' | 'disconnected';
}

const InstanceTable: React.FC<InstanceTableProps> = ({ dict, activeTab, searchQuery }) => {
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

  const filteredInstances = instances.filter((instance) => {
    if (activeTab !== 'all' && instance.status !== activeTab) {
      return false
    }
    if (searchQuery && !instance.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false
    }
    return true
  })

  return <InstanceTableData instances={filteredInstances} loading={loading} error={error} dict={dict} query={searchQuery} />
}

export default InstanceTable
