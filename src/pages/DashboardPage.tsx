import React from 'react';
import Header from '../components/Dashboard/Header';
import Sidebar from '../components/Dashboard/Sidebar';
import StatsCard from '../components/Dashboard/StatsCard';

const DashboardPage: React.FC = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-6 bg-gray-50 flex-1">
          <div className="grid grid-cols-3 gap-4 mb-6">
            <StatsCard title="Total de instâncias web" value={1} description="Total de instâncias web executando" color="green" />
            <StatsCard title="Instâncias web conectadas" value={0} description="Total de instâncias web conectadas" color="blue" />
            <StatsCard title="Instâncias web desconectadas" value={1} description="Total de instâncias web desconectadas" color="red" />
          </div>
          {/* Aqui você pode adicionar outros componentes, como gráficos e tabelas */}
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;
