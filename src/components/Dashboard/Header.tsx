import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="flex justify-between items-center p-4 bg-gray-100 border-b">
      <div className="text-xl font-semibold">Dashboard</div>
      <div className="flex items-center space-x-4">
        <span className="text-sm">Última atualização 11/11/2024 17:00:37</span>
        <button className="bg-green-500 text-white px-4 py-2 rounded">pt-br</button>
        <button className="text-red-500 font-bold">Sair</button>
      </div>
    </header>
  );
};

export default Header;
