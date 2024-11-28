'use client'

import React, { useState } from "react";
import { Tabs, Tab, Table, Button, Form, Dropdown, Pagination, Row, Col, ButtonGroup, DropdownButton } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import "./InstancesComponent.scss";

interface Instance {
    onSelect?: (instance: Instance) => void;
    dict: any;
   }
const instancesComponent: React.FC<Instance> = ({ onSelect, dict }) => {
  const handleInstanceSelect = (instance: Instance) => {
    onSelect?.(instance);   
}

  const instances = [
    { id: 1, name: "Instancia 1", status: "Conectada" },
    { id: 2, name: "Instancia 2", status: "Desconectada" },
    { id: 3, name: "Instancia 3", status: "Conectada" },
    { id: 4, name: "Instancia 4", status: "Desconectada" },
    { id: 5, name: "Instancia 5", status: "Conectada" },
    { id: 6, name: "Instancia 6", status: "Conectada" },
    { id: 7, name: "Instancia 7", status: "Desconectada" },
    { id: 8, name: "Instancia 8", status: "Conectada" },
    { id: 9, name: "Instancia 9", status: "Desconectada" },
    { id: 10, name: "Instancia 10", status: "Conectada" }
  ];

  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(7);

  const handleTabChange = (tab: any) => {
    setActiveTab(tab);
  };

  const filteredInstances = instances.filter((instance) =>
    instance.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastItem = activeTab === "all" ? filteredInstances.length : filteredInstances.filter((instance) => instance.status === activeTab).length;
  



  return (
    <div>
        <Row className='dashboard mb-3'>
            <Col md={4}>
                <Tabs activeKey={activeTab} onSelect={handleTabChange} className="navtabs-instances mb-3">
                    <Tab eventKey="all" title={dict.pages.instances.filters.all} />
                    <Tab eventKey="connected" title={dict.pages.instances.filters.conected} />
                    <Tab eventKey="disconnected" title={dict.pages.instances.filters.disconnected} />
                </Tabs>
            </Col>
            <Col md={5}>
            <Form.Control
                type="text"
                placeholder={dict.pages.instances.filters.searchHeader}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className='searchInput  my-3 py-2'
            />    
            </Col>
            <Col md={3}>
                <ButtonGroup className="my-2 py-2 btn-group-instances">
                    <Button variant="primary" className="fw-bold">{dict.pages.instances.filters.add}</Button>
                    <DropdownButton variant="outline-secondary" as={ButtonGroup} title={dict.pages.instances.table.actionsDropdown.downloads} id="bg-nested-dropdown">
                        <Dropdown.Item eventKey="1">{dict.pages.instances.table.actionsDropdown.csv}</Dropdown.Item>
                    </DropdownButton>
                </ButtonGroup>
            </Col>
        </Row>
        <Row>
            <Col md={12}>
                <Table className="table-instances" striped bordered hover responsive>
                    <thead>
                    <tr>
                        <th>{dict.pages.instances.table.name}</th>
                        <th>{dict.pages.instances.table.type}</th>
                        <th>{dict.pages.instances.table.id}</th>
                        <th>{dict.pages.instances.table.token}</th>
                        <th>{dict.pages.instances.table.status}</th>
                        <th>{dict.pages.instances.table.paymentMatureDate}</th>
                        <th>{dict.pages.instances.table.payment}</th>
                        <th>{dict.pages.instances.table.show}</th>
                    </tr>
                    </thead>
                    <tbody>
                      <tr>
                          <td>
                          <FontAwesomeIcon icon={faCircleExclamation} className='warningIcon' /> Meu número
                          </td>
                          <td>Pagar.Me</td>
                          <td>3D829572D50...</td>
                          <td>CDCCFAAD8C...</td>
                          <td className='disconnected'>Desconectada</td>
                          <td>13/11/2024</td>
                          <td>Pendente</td>
                          <td>
                            <Button variant="link" className="text-center">
                                <FontAwesomeIcon className='text-secondary' icon={faEye} />
                            </Button>
                          </td>
                      </tr>
                    </tbody>
                </Table>
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
            className='itemsPerPage'
            >
              <option value={5}>5</option>
              <option value={7}>7</option>
              <option value={10}>10</option>
            </Form.Select>
          </Col>
        </Row>
    </div>
  );
};

export default instancesComponent;
