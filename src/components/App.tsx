import React, { useState } from 'react';
import { ChakraProvider } from '@chakra-ui/react';

import ItemList from 'components/ItemList';
import { Card, Item, unidentifiedCards, cards } from 'logics/data';
import { useEffect } from 'react';

const initialItems: Array<Item<Card>> = unidentifiedCards.map((uc) => ({
  fuzzyName: uc,
  status: 'unidentified',
  price: null,
  concreteItem: null,
}));

export default function App() {
  const [items, setItems] = useState(initialItems);

  // デバッグ用。あとで storybook を使えるとベストか？
  useEffect(() => {
    setItems([
      {
        fuzzyName: unidentifiedCards[0],
        status: 'unidentified',
        price: null,
        concreteItem: null,
      },
      {
        fuzzyName: unidentifiedCards[1],
        status: 'maybe',
        price: 500,
        concreteItem: cards[8],
      },
      {
        fuzzyName: unidentifiedCards[2],
        status: 'identified',
        price: 100,
        concreteItem: cards[10],
      },
    ]);
  }, []);

  return (
    <ChakraProvider>
      <ItemList items={items} />
    </ChakraProvider>
  );
}
