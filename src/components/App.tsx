import React, { useState } from 'react';
import { Box, ChakraProvider } from '@chakra-ui/react';

import ItemList from 'components/ItemList';
import { Card, Item, unidentifiedCards } from 'logics/data';

const initialItems: Array<Item<Card>> = unidentifiedCards.map((uc) => ({
  fuzzyName: uc,
  status: 'unidentified',
  sellingPrice: null,
  concreteItem: null,
}));

export default function App() {
  const [items, _setItems] = useState(initialItems);

  return (
    <ChakraProvider>
      <ItemList items={items} />
    </ChakraProvider>
  );
}
