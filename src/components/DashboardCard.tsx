import React from 'react';
import { Box, Text, Icon } from "@chakra-ui/react";
import { IconType } from "react-icons";
import "../styles/dashboard/dashboard.scss";

interface DashboardCardProps {
  title: string;
  value: number | string;
  icon: IconType;
  colorScheme: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, value, icon, colorScheme }) => {
  return (
    <Box className={`dashboard-card ${colorScheme}`}>
      <Text className="title">{title}</Text>
      <Text className="value">{value}</Text>
      <Icon as={icon} className="icon" />
    </Box>
  );
};

export default DashboardCard;