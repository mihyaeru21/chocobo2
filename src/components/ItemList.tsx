import React from 'react';
import {
  Badge,
  Center,
  Container,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import type { Item, Card } from 'logics/data';

interface Props {
  items: Array<Item<Card>>;
}

export default function ItemList({ items }: Props) {
  return (
    <Container maxW="container.sm">
      <Table size="sm">
        <Thead>
          <Tr>
            <Th>
              <Center>ステータス</Center>
            </Th>
            <Th>名前</Th>
            <Th isNumeric>売値</Th>
          </Tr>
        </Thead>
        <Tbody>
          {items.map((item) => (
            <Tr key={item.fuzzyName}>
              <Td>
                <Center>{statusBadge(item)}</Center>
              </Td>
              <Td>{viewName(item)}</Td>
              <Td isNumeric>{item.price ?? '???'}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Container>
  );
}

function statusBadge<T>(item: Item<T>): React.ReactNode {
  switch (item.status) {
    case 'identified':
      return <Badge colorScheme="green">識別済</Badge>;
    case 'maybe':
      return <Badge colorScheme="blue">推測済</Badge>;
    default:
      return <Badge colorScheme="yellow">未識別</Badge>;
  }
}

function viewName(item: Item<Card>): string {
  switch (item.status) {
    case 'identified':
      return item.concreteItem?.name ?? '';
    case 'maybe':
      return `${item.fuzzyName}（${item.concreteItem?.name ?? ''}）`;
    default:
      return item.fuzzyName;
  }
}
