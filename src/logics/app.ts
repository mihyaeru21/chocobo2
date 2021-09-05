import {
  Item,
  ConcreteItem,
  unidentifiedCardNames,
  Category,
  unidentifiedLiquidNames,
  getAllItems,
  unidentifiedCollarNames,
} from 'logics/data';
import { groupBy, partition, some } from 'lodash-es';

export interface State {
  cards: Array<Item>;
  liquids: Array<Item>;
  collars: Array<Item>;
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
  liquids: unidentifiedLiquidNames.map((uc) => ({
    fuzzyName: uc,
    status: 'unidentified',
    price: null,
    concreteItem: null,
  })),
  collars: unidentifiedCollarNames.map((uc) => ({
    fuzzyName: uc,
    status: 'unidentified',
    price: null,
    concreteItem: null,
  })),
};

type Key = keyof State;

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
  const concreteItem = findItemById(
    action.payload.category,
    action.payload.itemId
  );
  if (concreteItem == null) {
    return state;
  }

  const key = getKeyByCategory(action.payload.category);
  return {
    ...state,
    [key]: optimizeItems(
      action.payload.category,
      replace(state[key], action.payload.fuzzyName, {
        fuzzyName: action.payload.fuzzyName,
        status: 'identified',
        price: concreteItem.price,
        concreteItem,
      })
    ),
  };
}

function actionPredict(state: State, action: ActionPredict): State {
  const concreteItem = findItemById(
    action.payload.category,
    action.payload.itemId
  );
  if (concreteItem == null) {
    return state;
  }

  const key = getKeyByCategory(action.payload.category);
  return {
    ...state,
    [key]: optimizeItems(
      action.payload.category,
      replace(state[key], action.payload.fuzzyName, {
        fuzzyName: action.payload.fuzzyName,
        status: 'predicted',
        price: concreteItem.price,
        concreteItem,
      })
    ),
  };
}

function actionSetPrice(state: State, action: ActionSetPrice): State {
  const key = getKeyByCategory(action.payload.category);
  return {
    ...state,
    [key]: optimizeItems(
      action.payload.category,
      replace(state[key], action.payload.fuzzyName, {
        fuzzyName: action.payload.fuzzyName,
        status: 'unidentified',
        price: action.payload.price,
        concreteItem: null,
      })
    ),
  };
}

function optimizeItems(category: Category, items: Item[]): Item[] {
  const group = groupBy(getAllItems(category), (c) => c.price);
  for (const [p, allPItems] of Object.entries(group)) {
    const price = Number(p); // entries を通すと string になっちゃう

    const pItems = items.filter((c) => c.price === price);
    const [unidentifiedItems, predictedItems] = partition(
      pItems,
      (c) => c.status === 'unidentified'
    );

    // ある金額の中で未推測が1個以外が推測済みなら残り1個も推測できる
    if (
      unidentifiedItems.length === 1 &&
      predictedItems.length === allPItems.length - 1
    ) {
      // まだ使われていないやつを探して割り当てる
      const unusedItem = getAllItems(category).find(
        (c) =>
          c.price === price &&
          !some(items, (cc) => cc.concreteItem?.id === c.id)
      );
      if (unusedItem) {
        const card = unidentifiedItems[0];
        card.concreteItem = unusedItem;
        card.status = 'predicted';
      }
    }
  }

  return items;
}

function findItemById(
  category: Category,
  id: number
): ConcreteItem | undefined {
  return getAllItems(category).find((c) => c.id === id);
}

function getKeyByCategory(category: Category): Key {
  switch (category) {
    case 'card':
      return 'cards';
    case 'liquid':
      return 'liquids';
    case 'collar':
      return 'collars';
  }
}

function replace(array: Array<Item>, fuzzyName: string, item: Item) {
  const newArray = [...array];
  const i = newArray.findIndex((c) => c.fuzzyName === fuzzyName);
  newArray[i] = item;
  return newArray;
}
