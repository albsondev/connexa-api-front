import React from 'react';

const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 bg-white h-full shadow-md p-4">
      <div className="flex items-center space-x-2 mb-8">
        <img src="logo.png" alt="Logo" className="w-10 h-10" />
        <h2 className="font-bold text-lg">Andre Albson</h2>
      </div>
      <nav>
        <ul className="space-y-4">
          <li className="text-green-500">Dashboard</li>
          <li>Instâncias Web</li>
          <li>Dados da Conta</li>
          <li>Segurança</li>
          <li>Configurações Beta</li>
        </ul>
      </nav>
      <div className="mt-8">
        <h3 className="text-sm font-semibold">Ajuda</h3>
        <ul className="space-y-2">
          <li>Github</li>
          <li>Documentação</li>
          <li>Postman Collection</li>
          <li>Discord</li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
