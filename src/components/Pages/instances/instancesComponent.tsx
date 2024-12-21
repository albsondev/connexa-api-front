'use client'

import React, { useState } from 'react'
import {
  Button, ButtonGroup, Col, Dropdown, DropdownButton, Form, Pagination, Row,
} from 'react-bootstrap'
import Link from 'next/link'
import './InstancesComponent.scss'
import InstanceTable from '@/components/Table/InstanceTable'
import TabsFilterInstances from '@/components/Tabs/TabsFilterInstances'

interface InstancesComponentProps {
  dict: {
    pages: {
      instances: {
        filters: {
          all: string;
          conected: string;
          disconnected: string;
          searchHeader: string;
          add: string;
        };
        table: {
          name: string;
          type: string;
          id: string;
          token: string;
          status: string;
          paymentMatureDate: string;
          payment: string;
          show: string;
          actionsDropdown: {
            downloads: string;
            csv: string;
          };
        };
      };
    };
  };
}

const InstancesComponent: React.FC<InstancesComponentProps> = ({ dict }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'connected' | 'disconnected'>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [itemsPerPage, setItemsPerPage] = useState(7)

  const handleTabChange = (tab: 'all' | 'connected' | 'disconnected') => {
    setActiveTab(tab)
  }

  return (
    <div>
      <Row className="dashboard mb-3">
        <Col md={4}>
          <TabsFilterInstances dict={dict} activeTab={activeTab} onTabChange={handleTabChange} />
        </Col>
        <Col md={5}>
          <Form.Control
            type="text"
            placeholder={dict.pages.instances.filters.searchHeader}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="searchInput my-3 py-2"
          />
        </Col>
        <Col md={3}>
          <ButtonGroup className="my-2 py-2 btn-group-instances">
            <Link href="/instances/register">
              <Button variant="primary" className="fw-bold">{dict.pages.instances.filters.add}</Button>
            </Link>
            <DropdownButton variant="outline-secondary" as={ButtonGroup} title={dict.pages.instances.table.actionsDropdown.downloads} id="bg-nested-dropdown">
              <Dropdown.Item eventKey="1">{dict.pages.instances.table.actionsDropdown.csv}</Dropdown.Item>
            </DropdownButton>
          </ButtonGroup>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <InstanceTable dict={dict} activeTab={activeTab} searchQuery={searchQuery} />
        </Col>
      </Row>
      <Row>
        <Col md={11} className="d-flex justify-content-center">
          <Pagination>
            <Pagination.Prev />
            <Pagination.Item active>{1}</Pagination.Item>
            <Pagination.Next />
          </Pagination>
        </Col>
        <Col md={1}>
          <Form.Select
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(Number(e.target.value))}
            className="itemsPerPage"
          >
            <option value={5}>5</option>
            <option value={7}>7</option>
            <option value={10}>10</option>
          </Form.Select>
        </Col>
      </Row>
    </div>
  )
}

export default InstancesComponent
