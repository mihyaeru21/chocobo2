import {
  Item,
  ConcreteItem,
  unidentifiedCardNames,
  allCards,
  Category,
} from 'logics/data';
import { groupBy, partition, some } from 'lodash-es';

export interface State {
  cards: Array<Item>;
}

interface ActionIdentify {
  type: 'identify';
  payload: { fuzzyName: string; category: Category; itemId: number };
}

interface ActionPredict {
  type: 'predict';
  payload: { fuzzyName: string; category: Category; itemId: number };
}

interface ActionSetPrice {
  type: 'setPrice';
  payload: { fuzzyName: string; category: Category; price: number };
}

export type Action = ActionIdentify | ActionPredict | ActionSetPrice;

export const initialState: State = {
  cards: unidentifiedCardNames.map((uc) => ({
    fuzzyName: uc,
    status: 'unidentified',
    price: null,
    concreteItem: null,
  })),
};

export function reduce(state: State, action: Action): State {
  switch (action.type) {
    case 'identify':
      return actionIdentify(state, action);
    case 'predict':
      return actionPredict(state, action);
    case 'setPrice':
      return actionSetPrice(state, action);
  }
}

function actionIdentify(state: State, action: ActionIdentify): State {
  const concreteItem = findCardById(action.payload.itemId);
  if (concreteItem == null) {
    return state;
  }

  return optimizeState({
    ...state,
    cards: replace(state.cards, action.payload.fuzzyName, {
      fuzzyName: action.payload.fuzzyName,
      status: 'identified',
      price: concreteItem.price,
      concreteItem,
    }),
  });
}

function actionPredict(state: State, action: ActionPredict): State {
  const concreteItem = findCardById(action.payload.itemId);
  if (concreteItem == null) {
    return state;
  }

  return optimizeState({
    ...state,
    cards: replace(state.cards, action.payload.fuzzyName, {
      fuzzyName: action.payload.fuzzyName,
      status: 'predicted',
      price: concreteItem.price,
      concreteItem,
    }),
  });
}

function actionSetPrice(state: State, action: ActionSetPrice): State {
  return optimizeState({
    ...state,
    cards: replace(state.cards, action.payload.fuzzyName, {
      fuzzyName: action.payload.fuzzyName,
      status: 'unidentified',
      price: action.payload.price,
      concreteItem: null,
    }),
  });
}

function optimizeState(state: State): State {
  const cards = state.cards;
  const group = groupBy(allCards, (c) => c.price);
  for (const [p, allPCards] of Object.entries(group)) {
    const price = Number(p); // entries を通すと string になっちゃう

    const pCards = cards.filter((c) => c.price === price);
    const [unidentifiedCars, predictedCards] = partition(
      pCards,
      (c) => c.status === 'unidentified'
    );

    // ある金額の中で未推測が1個以外が推測済みなら残り1個も推測できる
    if (
      unidentifiedCars.length === 1 &&
      predictedCards.length === allPCards.length - 1
    ) {
      // まだ使われていない card を探して割り当てる
      const unusedCard = allCards.find(
        (c) =>
          c.price === price &&
          !some(cards, (cc) => cc.concreteItem?.id === c.id)
      );
      if (unusedCard) {
        const card = unidentifiedCars[0];
        card.concreteItem = unusedCard;
        card.status = 'predicted';
      }
    }
  }

  return state;
}

function findCardById(id: number): ConcreteItem | undefined {
  return allCards.find((c) => c.id === id);
}

function replace(array: Array<Item>, fuzzyName: string, item: Item) {
  const newArray = [...array];
  const i = newArray.findIndex((c) => c.fuzzyName === fuzzyName);
  newArray[i] = item;
  return newArray;
}
