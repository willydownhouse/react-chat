import { createContext, useContext } from 'react';
import { IAppState, IStateContext } from '../interfaces';

export const initialState: IAppState = {
  messages: [],
  user: null,
  notification: null,
};

const StateContext = createContext<IStateContext>({
  state: initialState,
  dispatch: () => 1,
});

export const Provider = StateContext.Provider;

export const useStateValue = () => useContext(StateContext);
