import React, { useState } from 'react';
import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { checkIfLoggedIn } from '../utils/auth';
import ChatPage from './ChatPage';
import FrontPage from './FrontPage';

import Navbar from './Navbar';
import ProtectedRoute from './ProtectedRoute';
import GlobalStyles from '../styles/global';
import { AppContainer } from '../styles';
import Notification from './Notification';
import { IUser } from '../interfaces';

function App() {
  const [user, setUser] = useState<IUser | null>(null);
  const [notification, setNotification] = useState<string>('');

  useEffect(() => {
    checkIfLoggedIn(setUser);
    //console.log(process.env.NODE_ENV);
  }, []);

  return (
    <AppContainer>
      <GlobalStyles />

      <BrowserRouter>
        <Notification notification={notification} />
        <Navbar
          user={user}
          setUser={setUser}
          setNotification={setNotification}
        />
        <Routes>
          <Route path="/" element={<FrontPage />} />
          <Route
            path="/chat"
            element={
              <>
                <ProtectedRoute user={user}>
                  <ChatPage user={user} />
                </ProtectedRoute>
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </AppContainer>
  );
}

export default App;
