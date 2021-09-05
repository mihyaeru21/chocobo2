import { useReducer } from 'react';
import { ChakraProvider, Grid, GridItem } from '@chakra-ui/react';

import DispatchContext from 'components/DispatchContext';
import ItemList from 'components/ItemList';
import { initialState, reduce } from 'logics/app';

export default function App() {
  const [state, dispatch] = useReducer(reduce, initialState);

  return (
    <ChakraProvider>
      <DispatchContext.Provider value={dispatch}>
        <Grid templateColumns="1fr 1fr 1fr" gap="4">
          <GridItem>
            <ItemList category="card" items={state.cards} />
          </GridItem>
          <GridItem>
            <ItemList category="liquid" items={state.liquids} />
          </GridItem>
          <GridItem>
            <ItemList category="collar" items={state.collars} />
          </GridItem>
        </Grid>
      </DispatchContext.Provider>
    </ChakraProvider>
  );
}
