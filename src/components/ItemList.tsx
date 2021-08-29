import { useCallback, useContext, useState } from 'react';
import {
  Button,
  Center,
  Container,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Table,
  Tbody,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from '@chakra-ui/react';
import ItemRow from 'components/ItemRow';
import type { Item, Card } from 'logics/data';
import DispatchContext from './DispatchContext';

interface Props {
  items: Array<Item<Card>>;
}

export default function ItemList({ items }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [fuzzyName, setFuzzyName] = useState<string | null>(null);
  const [itemId, setItemId] = useState<number | null>(null);
  const [price, setPrice] = useState<number | null>(null);
  const dispatch = useContext(DispatchContext);

  const openModal = useCallback(
    (fuzzyName: string) => {
      setFuzzyName(fuzzyName);
      onOpen();
    },
    [onOpen]
  );

  const closeModal = useCallback(() => {
    onClose();
    setFuzzyName(null);
    setItemId(null);
    setPrice(null);
  }, [onClose]);

  const identify = useCallback(() => {
    if (fuzzyName != null && itemId != null) {
      dispatch({
        type: 'identify',
        payload: {
          fuzzyName: fuzzyName,
          itemType: 'card',
          itemId,
        },
      });
    }
    closeModal();
  }, [fuzzyName, itemId, dispatch, closeModal]);

  const predict = useCallback(() => {
    if (fuzzyName != null && itemId != null) {
      dispatch({
        type: 'predict',
        payload: {
          fuzzyName: fuzzyName,
          itemType: 'card',
          itemId,
        },
      });
    }
    closeModal();
  }, [fuzzyName, itemId, dispatch, closeModal]);

  const setPriceAction = useCallback(() => {
    if (fuzzyName != null && price != null) {
      dispatch({
        type: 'setPrice',
        payload: {
          fuzzyName: fuzzyName,
          itemType: 'card',
          price,
        },
      });
    }
    closeModal();
  }, [fuzzyName, price, closeModal, dispatch]);

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
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{fuzzyName}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>hoge</ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={setPriceAction}>
              金額設定
            </Button>
            <Button colorScheme="blue" onClick={predict}>
              推測
            </Button>
            <Button colorScheme="blue" onClick={identify}>
              確定
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
}
