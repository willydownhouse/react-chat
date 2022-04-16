import {
  getAuth,
  signInWithPopup,
  FacebookAuthProvider,
  OAuthCredential,
} from 'firebase/auth';
import React from 'react';
import { Location, NavigateFunction } from 'react-router-dom';
import {
  IAppAction,
  IUser,
  LOG_IN,
  LOG_OUT,
  REMOVE_NOTIFICATION,
  SET_NOTIFICATION,
} from '../interfaces';

const provider = new FacebookAuthProvider();

export const login = (
  dispatch: React.Dispatch<IAppAction>,
  location: Location,
  navigate: NavigateFunction
) => {
  const auth = getAuth();

  signInWithPopup(auth, provider)
    .then(result => {
      // The signed-in user info.
      const user = result.user;

      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      const credential = FacebookAuthProvider.credentialFromResult(result);
      //tällä tulee

      const accessToken = (credential as OAuthCredential).accessToken;

      localStorage.setItem('token', accessToken as string);

      const { displayName, email, photoURL, uid } = user;

      const currentUser: IUser = {
        id: uid,
        name: displayName as string,
        email: email as string,
        photoURL: photoURL as string,
        token: accessToken as string,
      };

      if (location.pathname === '/') {
        navigate('/chat');
      }

      dispatch({
        type: LOG_IN,
        payload: currentUser,
      });

      dispatch({
        type: SET_NOTIFICATION,
        payload: {
          text: 'You succesfully logged in',
          color: 'red',
        },
      });
      setTimeout(
        () =>
          dispatch({
            type: REMOVE_NOTIFICATION,
          }),
        3000
      );
    })
    .catch(error => {
      const credential = FacebookAuthProvider.credentialFromError(error);
      console.log('ERROR');
      console.log(credential);
      console.log(error);
    });
};

export const checkIfLoggedIn = (setUser: (val: IUser | null) => void) => {
  getAuth().onAuthStateChanged(user => {
    if (!user) return;

    const { displayName, email, photoURL, uid } = user;

    const token = localStorage.getItem('token');

    const currentUser: IUser = {
      id: uid,
      name: displayName as string,
      email: email as string,
      photoURL: photoURL as string,
      token: token as string,
    };

    setUser(currentUser);
  });
};

export const logout = (
  dispatch: React.Dispatch<IAppAction>,
  location: Location,
  navigate: NavigateFunction
) => {
  getAuth().signOut();
  localStorage.removeItem('token');

  if (location.pathname === '/chat') {
    navigate('/');
  }
  dispatch({
    type: LOG_OUT,
  });

  dispatch({
    type: SET_NOTIFICATION,
    payload: {
      text: 'You logged out',
      color: 'red',
    },
  });
  setTimeout(
    () =>
      dispatch({
        type: REMOVE_NOTIFICATION,
      }),
    3000
  );
};
