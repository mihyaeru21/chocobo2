import React, { useCallback } from 'react';
import { Badge, Center, Td, Tr } from '@chakra-ui/react';
import type { Item, Card } from 'logics/data';

interface Props {
  item: Item<Card>;
  openModal: (fuzzyName: string) => void;
}

export default function ItemRow({ item, openModal }: Props) {
  const openModalForFuzzyName = useCallback(() => {
    openModal(item.fuzzyName);
  }, [item.fuzzyName, openModal]);

  return (
    <Tr key={item.fuzzyName} cursor="pointer" onClick={openModalForFuzzyName}>
      <Td>
        <Center>{statusBadge(item)}</Center>
      </Td>
      <Td>{viewName(item)}</Td>
      <Td isNumeric>{item.price ?? '???'}</Td>
    </Tr>
  );
}

function statusBadge<T>(item: Item<T>): React.ReactNode {
  switch (item.status) {
    case 'identified':
      return <Badge colorScheme="green">識別済</Badge>;
    case 'predicted':
      return <Badge colorScheme="blue">推測済</Badge>;
    case 'unidentified':
      return <Badge colorScheme="yellow">未識別</Badge>;
  }
}

function viewName(item: Item<Card>): string {
  switch (item.status) {
    case 'identified':
      return item.concreteItem?.name ?? '';
    case 'predicted':
      return `${item.fuzzyName}（${item.concreteItem?.name ?? ''}）`;
    case 'unidentified':
      return item.fuzzyName;
  }
}
