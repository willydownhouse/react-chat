import React, { useReducer } from 'react';
import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { initialState, Provider } from '../state/context';
import { reducer } from '../state/reducer';
import { handleAuth } from '../utils/auth';
import ChatPage from './ChatPage';
import FrontPage from './FrontPage';
import MessageInput from './MessageInput';
import Navbar from './Navbar';
import ProtectedRoute from './ProtectedRoute';

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    console.log('STATE');
    console.log(state);
  }, [state]);
  return (
    <div>
      <Provider value={{ state, dispatch }}>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<FrontPage />} />
            <Route
              path="/chat"
              element={
                <>
                  <ChatPage />
                  <ProtectedRoute>
                    <MessageInput />
                  </ProtectedRoute>
                </>
              }
            />
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
