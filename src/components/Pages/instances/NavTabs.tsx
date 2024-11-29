'use client'

import { Tabs, Tab } from 'react-bootstrap';
import FormRegisterNewInstance from './FormRegisterNewInstance';
import FormWebhooks from './FormWebhooks';

interface NavTabsProps {
    dict : any
}

const NavTabs: React.FC<NavTabsProps> = ({ dict }) => {
  return (
    <Tabs defaultActiveKey="dados" id="web-instance-tabs" className="mb-3">
      <Tab eventKey="dados" title={dict.pages.instances.register.navTabs.webInstanceData}>
        <FormRegisterNewInstance dict={dict} />
      </Tab>
      <Tab eventKey="webhooks" title={dict.pages.instances.register.navTabs.webhooks}>
        <FormWebhooks dict={dict} />
      </Tab>
    </Tabs>
  );
};

export default NavTabs;
