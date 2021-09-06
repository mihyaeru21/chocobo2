import { useCallback, useContext, useState } from 'react';
import { uniq, some } from 'lodash-es';
import {
  Button,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
} from '@chakra-ui/react';
import DispatchContext from './DispatchContext';
import { Item, Category, getAllItems } from 'logics/data';
import { useEffect } from 'react';

interface Props {
  category: Category;
  fuzzyName: string | null;
  onClose: () => void;
  items: Array<Item>;
}

interface State {
  itemId: number | undefined;
  price: number | undefined;
}

export default function ItemList({
  category,
  fuzzyName,
  onClose,
  items,
}: Props) {
  const [state, setState] = useState<State>({
    itemId: undefined,
    price: undefined,
  });
  const dispatch = useContext(DispatchContext);

  const close = useCallback(() => {
    setState({ itemId: undefined, price: undefined });
    onClose();
  }, [onClose]);

  const handleItemChanged = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      if (event.target.value != null) {
        const itemId = Number(event.target.value);
        setState((s) => ({ ...s, itemId }));
      }
    },
    []
  );

  const handlePriceChanged = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      if (event.target.value != null) {
        const price = Number(event.target.value);
        setState((s) => ({ ...s, price }));
      }
    },
    []
  );

  const identify = useCallback(() => {
    if (fuzzyName != null && state.itemId != null) {
      dispatch({
        type: 'identify',
        payload: {
          fuzzyName,
          category,
          itemId: state.itemId,
        },
      });
    }
    close();
  }, [category, fuzzyName, state.itemId, dispatch, close]);

  const predict = useCallback(() => {
    if (fuzzyName != null && state.itemId != null) {
      dispatch({
        type: 'predict',
        payload: {
          fuzzyName,
          category,
          itemId: state.itemId,
        },
      });
    }
    close();
  }, [category, fuzzyName, state.itemId, dispatch, close]);

  const setPrice = useCallback(() => {
    if (fuzzyName != null && state.price != null) {
      dispatch({
        type: 'setPrice',
        payload: {
          fuzzyName,
          category,
          price: state.price,
        },
      });
    }
    close();
  }, [category, fuzzyName, state.price, dispatch, close]);

  const isOpen = fuzzyName != null;

  // すでに選択されているものは選べなくする
  const selectableItems = getAllItems(category).filter(
    (ai) => !some(items, (i) => i.concreteItem?.id === ai.id)
  );
  const selectablePrices = uniq(selectableItems.map((i) => i.price)).sort(
    (a, b) => a - b
  );
  const firstItemId = selectableItems[0]?.id;
  const firstPrice = selectablePrices[0];

  // 開いた時に選択可能なやつの1つ目を選択しておく
  useEffect(() => {
    if (isOpen) {
      setState({ itemId: firstItemId, price: firstPrice });
    }
  }, [firstItemId, firstPrice, isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={close}>
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
            <Button
              colorScheme="blue"
              onClick={setPrice}
              disabled={selectablePrices.length === 0}
            >
              金額設定
            </Button>
          </HStack>
          <HStack marginTop="2">
            <Select value={state.itemId} onChange={handleItemChanged}>
              {selectableItems.map((i) => (
                <option value={i.id}>{i.name}</option>
              ))}
            </Select>
            <Button
              colorScheme="blue"
              onClick={predict}
              disabled={selectableItems.length === 0}
            >
              推測
            </Button>
            <Button
              colorScheme="blue"
              onClick={identify}
              disabled={selectableItems.length === 0}
            >
              確定
            </Button>
          </HStack>
        </ModalBody>
        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
}
