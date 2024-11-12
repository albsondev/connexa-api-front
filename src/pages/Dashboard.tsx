import { Box, SimpleGrid, Heading } from "@chakra-ui/react";
import { FaServer, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import DashboardCard from "../components/DashboardCard";

const Dashboard = () => {
  return (
    <Box p="6">
      <Heading mb="6">Dashboard</Heading>
      <SimpleGrid columns={[1, 3]} gap="6">
      <DashboardCard title="Total de instâncias web" value={1} icon={<FaServer />} colorScheme="teal" />
        <DashboardCard title="Instâncias web conectadas" value={0} icon={<FaCheckCircle />} colorScheme="green" />
        <DashboardCard title="Instâncias web desconectadas" value={1} icon={<FaTimesCircle />} colorScheme="red" />
      </SimpleGrid>
      {/* Adicione outros componentes de gráficos e filtros aqui */}
    </Box>
  );
};

export default Dashboard;
