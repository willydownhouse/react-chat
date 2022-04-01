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
import { AppContainer, ContentWrap } from '../styles';
import SideBar from './SideBar';

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
    <AppContainer>
      <GlobalStyles />
      <Provider value={{ state, dispatch }}>
        <BrowserRouter>
          <Navbar />
          <ContentWrap>
            <SideBar />
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
            <SideBar />
          </ContentWrap>
        </BrowserRouter>
      </Provider>
    </AppContainer>
  );
}

export default App;
