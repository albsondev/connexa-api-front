import './App.css';
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import React from 'react';

const App: React.FC<React.PropsWithChildren<object>> = ({ children }) => {
  return <ChakraProvider value={defaultSystem}>{children}</ChakraProvider>
};

export default App;
