import { useCallback, useContext, useState } from 'react';
import { uniq } from 'lodash-es';
import {
  Button,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Select,
} from '@chakra-ui/react';
import DispatchContext from './DispatchContext';
import { allCards, Item } from 'logics/data';

interface Props {
  fuzzyName: string | null;
  onClose: () => void;
  items: Array<Item>;
}

interface State {
  itemId: number | undefined;
  price: number | undefined;
}

export default function ItemList({ fuzzyName, onClose, items }: Props) {
  const [state, setState] = useState<State>({
    itemId: undefined,
    price: undefined,
  });
  const dispatch = useContext(DispatchContext);

  const handleItemChanged = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const itemId = Number(event.target.value);
      setState((s) => ({ ...s, itemId }));
    },
    []
  );

  const handlePriceChanged = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const price = Number(event.target.value);
      setState((s) => ({ ...s, price }));
    },
    []
  );

  const identify = useCallback(() => {
    if (fuzzyName != null && state.itemId != null) {
      dispatch({
        type: 'identify',
        payload: {
          fuzzyName,
          itemType: 'card',
          itemId: state.itemId,
        },
      });
    }
    setState({ itemId: undefined, price: undefined });
    onClose();
  }, [fuzzyName, state.itemId, dispatch, onClose]);

  const predict = useCallback(() => {
    if (fuzzyName != null && state.itemId != null) {
      dispatch({
        type: 'predict',
        payload: {
          fuzzyName,
          itemType: 'card',
          itemId: state.itemId,
        },
      });
    }
    setState({ itemId: undefined, price: undefined });
    onClose();
  }, [fuzzyName, state.itemId, dispatch, onClose]);

  const setPrice = useCallback(() => {
    if (fuzzyName != null && state.price != null) {
      dispatch({
        type: 'setPrice',
        payload: {
          fuzzyName,
          itemType: 'card',
          price: state.price,
        },
      });
    }
    setState({ itemId: undefined, price: undefined });
    onClose();
  }, [fuzzyName, state.price, dispatch, onClose]);

  const isOpen = fuzzyName != null;
  const selectableItems = allCards; // TODO: 選択できるやつは props で受けとる
  const selectablePrices = uniq(selectableItems.map((i) => i.price).sort());

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{fuzzyName}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <HStack>
            <Select value={state.price} onChange={handlePriceChanged}>
              {selectablePrices.map((p) => (
                <option value={p}>{p}</option>
              ))}
            </Select>
            <Button colorScheme="blue" onClick={setPrice}>
              金額設定
            </Button>
          </HStack>
          <HStack marginTop="2">
            <Select value={state.itemId} onChange={handleItemChanged}>
              {selectableItems.map((i) => (
                <option value={i.id}>{i.name}</option>
              ))}
            </Select>
            <Button colorScheme="blue" onClick={predict}>
              推測
            </Button>
            <Button colorScheme="blue" onClick={identify}>
              確定
            </Button>
          </HStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
