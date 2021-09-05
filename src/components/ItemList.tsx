import { useCallback, useState } from 'react';
import {
  Center,
  Container,
  Table,
  Tbody,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import ItemRow from 'components/ItemRow';
import EditingModal from 'components/EditingModal';
import type { Item, Category } from 'logics/data';

interface Props {
  category: Category;
  items: Array<Item>;
}

export default function ItemList({ category, items }: Props) {
  const [editingFuzzyName, setEditingFuzzyName] = useState<string | null>(null);

  const openModal = useCallback((fuzzyName: string) => {
    setEditingFuzzyName(fuzzyName);
  }, []);

  const closeModal = useCallback(() => {
    setEditingFuzzyName(null);
  }, []);

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
            <ItemRow item={item} openModal={openModal} key={item.fuzzyName} />
          ))}
        </Tbody>
      </Table>
      <EditingModal
        category={category}
        fuzzyName={editingFuzzyName}
        onClose={closeModal}
        items={items}
      />
    </Container>
  );
}
