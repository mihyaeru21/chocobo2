import React, { createContext } from 'react';
import { Action } from 'logics/app';

export default createContext<React.Dispatch<Action>>(() => {});
