import { useReducer } from 'react';
import { ChakraProvider } from '@chakra-ui/react';

import DispatchContext from 'components/DispatchContext';
import ItemList from 'components/ItemList';
import { initialState, reduce } from 'logics/app';

export default function App() {
  const [state, dispatch] = useReducer(reduce, initialState);

  return (
    <ChakraProvider>
      <DispatchContext.Provider value={dispatch}>
        <ItemList category="card" items={state.cards} />
      </DispatchContext.Provider>
    </ChakraProvider>
  );
}
