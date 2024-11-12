import { Button, HStack } from "@chakra-ui/react";
import "../styles/filter/filter.scss";

const FilterBar = () => {
  return (
    <HStack gap={4} className="filter-bar">
      <Button variant="outline">Este mês</Button>
      <Button variant="outline">Mês passado</Button>
      <Button variant="outline">Ontem</Button>
      <Button variant="outline">Hoje</Button>
    </HStack>
  );
};

export default FilterBar;
