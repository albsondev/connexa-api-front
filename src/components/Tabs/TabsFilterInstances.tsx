'use client'

import React from 'react'
import { Tab, Tabs } from 'react-bootstrap'

interface TabsFilterInstancesProps {
  dict: any;
  activeTab: 'all' | 'connected' | 'disconnected';
  onTabChange: (tab: 'all' | 'connected' | 'disconnected') => void;
}

const TabsFilterInstances: React.FC<TabsFilterInstancesProps> = ({ dict, activeTab, onTabChange }) => {
  const handleSelect = (tab: string | null) => {
    if (tab) {
      onTabChange(tab as 'all' | 'connected' | 'disconnected')
    }
  }

  return (
    <Tabs activeKey={activeTab} onSelect={handleSelect} className="navtabs-instances mb-3">
      <Tab eventKey="all" title={dict.pages.instances.filters.all} />
      <Tab eventKey="connected" title={dict.pages.instances.filters.conected} />
      <Tab eventKey="disconnected" title={dict.pages.instances.filters.disconnected} />
    </Tabs>
  )
}

export default TabsFilterInstances
