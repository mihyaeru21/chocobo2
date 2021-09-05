import { Item, unidentifiedCardNames } from 'logics/data';

export interface State {
  cards: Array<Item>;
}

export type Action =
  | {
      type: 'setPrice';
      payload: { fuzzyName: string; itemType: 'card'; price: number };
    }
  | {
      type: 'predict';
      payload: { fuzzyName: string; itemType: 'card'; itemId: number };
    }
  | {
      type: 'identify';
      payload: { fuzzyName: string; itemType: 'card'; itemId: number };
    };

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
    case 'setPrice':
      return state;
    case 'predict':
      return state;
    case 'identify':
      return state;
    default:
      return state;
  }
}
