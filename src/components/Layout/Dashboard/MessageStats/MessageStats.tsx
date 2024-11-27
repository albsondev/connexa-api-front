'use client'

import { useState } from 'react'
import { Tabs, Tab, Table } from 'react-bootstrap'

import './MessageStats.scss'

interface StatItem {
  label: string;
  count: number;
}

interface MessageStatsProps {
  dict: any;
}

export default function MessageStats({ dict }: MessageStatsProps) {

  const statsData: StatItem[] = [
    { label: `${dict.dashboard.messageStats.texts}`, count: 0 },
    { label: `${dict.dashboard.messageStats.buttons}`, count: 0 },
    { label: `${dict.dashboard.messageStats.links}`, count: 0 },
    { label: `${dict.dashboard.messageStats.options}`, count: 0 },
    { label: `${dict.dashboard.messageStats.documents}`, count: 0 },
    { label: `${dict.dashboard.messageStats.audios}`, count: 0 },
    { label: `${dict.dashboard.messageStats.videos}`, count: 0 },
    { label: `${dict.dashboard.messageStats.contacts}`, count: 0 },
    { label: `${dict.dashboard.messageStats.images}`, count: 0 },
    { label: `${dict.dashboard.messageStats.locations}`, count: 0 },
    { label: `${dict.dashboard.messageStats.stickers}`, count: 0 },
  ]
  
  const [activeTab, setActiveTab] = useState('sent')

  return (
    <div className="card p-3 messageStats">
      <h5 className="mb-4 text-secondary text-center">{dict.dashboard.messageStats.title}</h5>
      <Tabs
        id="message-tabs"
        activeKey={activeTab}
        onSelect={(k) => setActiveTab(k || 'sent')}
        className="mb-3"
      >
        <Tab eventKey="sent" title={dict.dashboard.messageStats.sent}>
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
        <Tab eventKey="received" title={dict.dashboard.messageStats.received}>
          <p className="text-center text-muted">{dict.dashboard.messageStats.noData}</p>
        </Tab>
      </Tabs>
    </div>
  )
}
