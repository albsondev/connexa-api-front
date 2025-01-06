import React, { useEffect, useState } from 'react'
import {
  Button, ButtonGroup, Modal, Table,
} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCircleExclamation, faEdit, faEye, faTrashAlt,
} from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import '@/components/Table/InstanceTable.scss'
import InstanceTableSkeleton from '@/components/SkeletonLoader/InstanceTableSkeleton'
import { useSession } from 'next-auth/react'

interface Instance {
  id: string;
  name: string;
  status: 'connected' | 'disconnected';
}

interface InstanceTableDataProps {
  instances: Instance[];
  loading: boolean;
  error: string | null;
  dict: any;
  query: string;
}

const InstanceTableData: React.FC<InstanceTableDataProps> = ({
  instances: initialInstances,
  loading,
  error,
  dict,
  query,
}) => {
  const [instances, setInstances] = useState<Instance[]>(initialInstances)
  const [showModal, setShowModal] = useState(false)
  const [selectedInstance, setSelectedInstance] = useState<Instance | null>(null)
  const { data: session } = useSession()

  useEffect(() => {
    setInstances(initialInstances)
  }, [initialInstances])

  const handleDelete = async () => {
    if (!selectedInstance) return

    try {
      const response = await fetch(`/api/instance/${selectedInstance.id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      })

      if (!response.ok) {
        throw new Error('Erro ao excluir a instância.')
      }

      setInstances((prevInstances) => prevInstances.filter((instance) => instance.id !== selectedInstance.id))
      setShowModal(false)
      window.location.href = '/instances'
    } catch (err) {
      console.error('Erro ao excluir a instância:', err)
    }
  }

  if (loading) {
    return <InstanceTableSkeleton />
  }

  if (error) {
    return <div>{error}</div>
  }

  if (instances.length === 0) {
    return <div>Sem instâncias disponíveis.</div>
  }

  const filteredInstances = instances.filter((instance) => instance.name.toLowerCase().includes(query.toLowerCase()))

  return (
    <>
      <Table className="table-instances striped bordered hover responsive">
        <thead>
          <tr>
            <th>{dict.pages.instances.table.name}</th>
            <th>{dict.pages.instances.table.token}</th>
            <th>{dict.pages.instances.table.status}</th>
            <th className="text-center">{dict.pages.instances.table.actions}</th>
          </tr>
        </thead>
        <tbody>
          {filteredInstances.map((instance) => (
            <tr key={instance.id}>
              <td>
                <FontAwesomeIcon icon={faCircleExclamation} className="warningIcon" />
                {' '}
                {instance.name}
              </td>
              <td>{instance.id}</td>
              <td className={instance.status === 'connected' ? 'connected' : 'disconnected'}>
                {instance.status === 'connected' ? 'Conectada' : 'Desconectada'}
              </td>
              <td>
                <ButtonGroup size="sm" className="d-flex justify-content-center">
                  <Button size="sm" variant="light" className="border">
                    <Link href={`/instances/details/${instance.id}`} className="text-primary text-decoration-none">
                      <FontAwesomeIcon className="text-primary me-2" icon={faEye} />
                      {dict.pages.instances.table.show}
                    </Link>
                  </Button>
                  <Button size="sm" variant="light" className="border">
                    <Link href={`/instances/update/${instance.id}`} className="text-secondary text-decoration-none">
                      <FontAwesomeIcon className="text-secondary me-2" icon={faEdit} />
                      {dict.pages.instances.table.edit}
                    </Link>
                  </Button>
                  <Button
                    size="sm"
                    variant="light"
                    className="border"
                    onClick={() => {
                      setSelectedInstance(instance)
                      setShowModal(true)
                    }}
                  >
                    <FontAwesomeIcon className="text-danger me-2" icon={faTrashAlt} />
                    {dict.pages.instances.table.delete}
                  </Button>
                </ButtonGroup>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Exclusão</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Tem certeza de que deseja excluir a instância
          {' '}
          <strong>{selectedInstance?.name.toUpperCase()}</strong>
          ?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Excluir
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default InstanceTableData
