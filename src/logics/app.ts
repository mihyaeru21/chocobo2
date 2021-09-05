import {
  Item,
  ConcreteItem,
  unidentifiedCardNames,
  allCards,
} from 'logics/data';

export interface State {
  cards: Array<Item>;
}

interface ActionIdentify {
  type: 'identify';
  payload: { fuzzyName: string; itemType: 'card'; itemId: number };
}

interface ActionPredict {
  type: 'predict';
  payload: { fuzzyName: string; itemType: 'card'; itemId: number };
}

interface ActionSetPrice {
  type: 'setPrice';
  payload: { fuzzyName: string; itemType: 'card'; price: number };
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
    default:
      return state;
  }
}

function actionIdentify(state: State, action: ActionIdentify): State {
  const concreteItem = findCardById(action.payload.itemId);
  if (concreteItem == null) {
    return state;
  }

  return {
    ...state,
    cards: replace(state.cards, action.payload.fuzzyName, {
      fuzzyName: action.payload.fuzzyName,
      status: 'identified',
      price: concreteItem.price,
      concreteItem,
    }),
  };
}

function actionPredict(state: State, action: ActionPredict): State {
  const concreteItem = findCardById(action.payload.itemId);
  if (concreteItem == null) {
    return state;
  }

  return {
    ...state,
    cards: replace(state.cards, action.payload.fuzzyName, {
      fuzzyName: action.payload.fuzzyName,
      status: 'predicted',
      price: concreteItem.price,
      concreteItem,
    }),
  };
}

function actionSetPrice(state: State, action: ActionSetPrice): State {
  return {
    ...state,
    cards: replace(state.cards, action.payload.fuzzyName, {
      fuzzyName: action.payload.fuzzyName,
      status: 'unidentified',
      price: action.payload.price,
      concreteItem: null,
    }),
  };
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
