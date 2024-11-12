import { Box, Flex, Text, Badge, Avatar, Circle, Float } from "@chakra-ui/react";

import "../styles/header/header.scss";

const Header = () => {
  return (
    <Box as="header" className="header">
      <Text className="logo">Admin Panel</Text>
      <Flex align="center">
        <Badge colorScheme="red" className="auth-badge">
          2FA Ativado
        </Badge>
        <Avatar.Root colorPalette="green" variant="subtle">
      <Avatar.Fallback>DA</Avatar.Fallback>
      <Float placement="bottom-end" offsetX="1" offsetY="1">
        <Circle
          bg="green.500"
          size="8px"
          outline="0.2em solid"
          outlineColor="bg"
        />
      </Float>
    </Avatar.Root>
      </Flex>
    </Box>
  );
};

export default Header;
