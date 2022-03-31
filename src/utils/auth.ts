import {
  getAuth,
  signInWithPopup,
  FacebookAuthProvider,
  OAuthCredential,
} from 'firebase/auth';
import React from 'react';
import {
  IAppAction,
  IUser,
  LOG_IN,
  LOG_OUT,
  REMOVE_NOTIFICATION,
  SET_NOTIFICATION,
} from '../interfaces';

const provider = new FacebookAuthProvider();

export const login = (dispatch: React.Dispatch<IAppAction>) => {
  const auth = getAuth();
  signInWithPopup(auth, provider)
    .then(result => {
      // The signed-in user info.
      const user = result.user;

      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      const credential = FacebookAuthProvider.credentialFromResult(result);
      const accessToken = (credential as OAuthCredential).accessToken;

      console.log(user);

      const { displayName, email, photoURL, uid } = user;

      const currentUser: IUser = {
        id: uid,
        name: displayName as string,
        email: email as string,
        photoURL: photoURL as string,
      };

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
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = FacebookAuthProvider.credentialFromError(error);

      console.log(error);
    });
};

export const checkIfLoggedIn = (dispatch: React.Dispatch<IAppAction>) => {
  getAuth().onAuthStateChanged(user => {
    console.log(user);

    if (!user) return;

    const { displayName, email, photoURL, uid } = user;

    const currentUser: IUser = {
      id: uid,
      name: displayName as string,
      email: email as string,
      photoURL: photoURL as string,
    };

    dispatch({
      type: LOG_IN,
      payload: currentUser,
    });
  });
};

export const logout = async (dispatch: React.Dispatch<IAppAction>) => {
  await getAuth().signOut();

  dispatch({
    type: LOG_OUT,
  });
};
