'use client'

import { useState } from 'react'
import { Tabs, Tab, Table } from 'react-bootstrap'

import './MessageStats.scss'

interface StatItem {
  label: string;
  count: number;
}

const statsData: StatItem[] = [
  { label: 'Textos', count: 0 },
  { label: 'Botões', count: 0 },
  { label: 'Links', count: 0 },
  { label: 'Opções', count: 0 },
  { label: 'Documentos', count: 0 },
  { label: 'Áudios', count: 0 },
  { label: 'Vídeos', count: 0 },
  { label: 'Contatos', count: 0 },
  { label: 'Imagens', count: 0 },
  { label: 'Localizações', count: 0 },
  { label: 'Stickers', count: 0 },
]

export default function MessageStats() {
  const [activeTab, setActiveTab] = useState('sent')

  return (
    <div className="card p-3 messageStats">
      <h5 className="mb-4">Mensagens Enviadas</h5>
      <Tabs
        id="message-tabs"
        activeKey={activeTab}
        onSelect={(k) => setActiveTab(k || 'sent')}
        className="mb-3"
      >
        <Tab eventKey="sent" title="Enviadas">
          <Table borderless>
            <tbody>
              {statsData.map((item, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <tr key={index} className="messageStats.row">
                  <td>{item.label}</td>
                  <td className="text-end">{item.count}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Tab>
        <Tab eventKey="received" title="Recebidas">
          <p className="text-center text-muted">Sem dados disponíveis</p>
        </Tab>
      </Tabs>
    </div>
  )
}
