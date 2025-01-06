import { faCircleExclamation, faEye } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import React from 'react'
import { Button, ButtonGroup, Table } from 'react-bootstrap'
import '@/components/Table/InstanceTable.scss'
import InstanceTableSkeleton from '@/components/SkeletonLoader/InstanceTableSkeleton'
import { faEdit, faTrashAlt } from '@fortawesome/free-regular-svg-icons'

interface Instance {
  id: string;
  name: string;
  status: 'connected' | 'disconnected';
}

interface InstanceTableDataProps {
  instances: Instance[]; // A lista de instâncias a ser exibida
  loading: boolean; // O estado de carregamento
  error: string | null; // Mensagem de erro, se houver
  dict: any; // Qualquer outro dado necessário (como o dict)
  query: string;
}

const InstanceTableData: React.FC<InstanceTableDataProps> = ({
  instances, loading, error, dict, query,
}) => {
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
            <td className={instance.status === 'connected' ? 'connected' : 'disconnected'}>{instance.status === 'connected' ? 'Conectada' : 'Desconectada'}</td>

            <td>
              <ButtonGroup size="sm" className="d-flex justify-content-center">
                <Button size="sm" variant="light" className="border">
                  <Link href={`/instances/details/${instance.id}`} className="text-primary text-decoration-none">
                    <FontAwesomeIcon className="text-primary me-2" icon={faEye} />
                    {dict.pages.instances.table.show}
                  </Link>
                </Button>

                <Button size="sm" variant="light" className="border">
                  <Link href={`/instances/details/${instance.id}`} className="text-secondary text-decoration-none">
                    <FontAwesomeIcon className="text-secondary me-2" icon={faEdit} />
                    {dict.pages.instances.table.edit}
                  </Link>
                </Button>

                <Button size="sm" variant="light" className="border">
                  <Link href={`/instances/remove/${instance.id}`} className="text-danger text-decoration-none">
                    <FontAwesomeIcon className="text-danger me-2" icon={faTrashAlt} />
                    {dict.pages.instances.table.delete}
                  </Link>
                </Button>

              </ButtonGroup>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}

export default InstanceTableData
