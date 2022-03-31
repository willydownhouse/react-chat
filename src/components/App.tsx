import React, { useReducer } from 'react';
import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { initialState, Provider } from '../state/context';
import { reducer } from '../state/reducer';
import { checkIfLoggedIn } from '../utils/auth';
import ChatPage from './ChatPage';
import FrontPage from './FrontPage';

import Navbar from './Navbar';
import ProtectedRoute from './ProtectedRoute';
import GlobalStyles from '../styles/global';
import { AppContainer } from '../styles';

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    console.log('STATE');
    console.log(state);
  }, [state]);

  useEffect(() => {
    checkIfLoggedIn(dispatch);
  }, []);
  return (
    <AppContainer padding="0 10rem">
      <GlobalStyles />
      <Provider value={{ state, dispatch }}>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<FrontPage />} />
            <Route
              path="/chat"
              element={
                <>
                  <ProtectedRoute>
                    <ChatPage />
                  </ProtectedRoute>
                </>
              }
            />
          </Routes>
        </BrowserRouter>
      </Provider>
    </AppContainer>
  );
}

export default App;