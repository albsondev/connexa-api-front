import { Box, VStack, Text } from "@chakra-ui/react";
import { FaHome, FaServer, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import "../styles/sidebar/sidebar.scss";

const Sidebar = () => {
  return (
    <Box as="nav" className="sidebar">
      <VStack gap={4} align="start">
        <Link to="/dashboard" className="sidebar-item">
          <FaHome /> <Text>Dashboard</Text>
        </Link>
        <Link to="/instances" className="sidebar-item">
          <FaServer /> <Text>Instâncias Web</Text>
        </Link>
        <Link to="/account" className="sidebar-item">
          <FaUser /> <Text>Dados da Conta</Text>
        </Link>
      </VStack>
    </Box>
  );
};

export default Sidebar;
