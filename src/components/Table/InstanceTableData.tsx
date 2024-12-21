import { faCircleExclamation, faEye } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import React from 'react'
import { Button, Table } from 'react-bootstrap'
import '@/components/Table/InstanceTable.scss'

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
    return <div>Carregando...</div>
  }

  if (error) {
    return <div>{error}</div>
  }

  if (instances.length === 0) {
    return <div>Sem instâncias disponíveis.</div>
  }

  const filteredInstances = instances.filter((instance) => instance.name.toLowerCase().includes(query.toLowerCase()))

  return (
    <Table className="table-instances" striped bordered hover responsive>
      <thead>
        <tr>
          <th>{dict.pages.instances.table.name}</th>
          <th>{dict.pages.instances.table.token}</th>
          <th>{dict.pages.instances.table.status}</th>
          <th>{dict.pages.instances.table.show}</th>
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
              <Link href={`/instances/details/${instance.id}`}>
                <Button variant="link" className="text-center btn-show">
                  <FontAwesomeIcon className="text-secondary" icon={faEye} />
                </Button>
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}

export default InstanceTableData
