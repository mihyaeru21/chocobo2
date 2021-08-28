import React from 'react';
import { Box, ChakraProvider, Container } from '@chakra-ui/react';
import type { Item, Card } from 'logics/data';

interface Props {
  items: Array<Item<Card>>;
}

export default function ItemList({ items }: Props) {
  return (
    <Container>
      {items.map((item) => (
        <Box key={item.fuzzyName}>{item.fuzzyName}</Box>
      ))}
    </Container>
  );
}
