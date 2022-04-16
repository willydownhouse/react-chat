import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { IUser } from '../interfaces';
import { FBbutton, Nav } from '../styles/navbar';
import {
  getAuth,
  signInWithPopup,
  FacebookAuthProvider,
  OAuthCredential,
} from 'firebase/auth';

const provider = new FacebookAuthProvider();

type NavbarProps = {
  user: IUser | null;
  setUser: (val: IUser | null) => void;
  setNotification: (val: string) => void;
};

const Navbar: React.FC<NavbarProps> = ({ user, setUser, setNotification }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    getAuth().signOut();

    localStorage.removeItem('token');
    if (location.pathname === '/chat') {
      navigate('/');
    }

    setUser(null);
    setNotification('You logged out');
    setTimeout(() => setNotification(''), 3000);
  };
  const handleLogin = () => {
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

        setUser(currentUser);
        setNotification('You logged in');
        setTimeout(() => setNotification(''), 3000);
      })
      .catch(error => {
        const credential = FacebookAuthProvider.credentialFromError(error);
        console.log('ERROR');
        console.log(credential);
        console.log(error);
      });
  };

  return (
    <Nav>
      <div></div>

      <FBbutton onClick={user ? handleLogout : handleLogin}>
        {user ? 'Sign out' : 'Sign in'}
      </FBbutton>
    </Nav>
  );
};

export default Navbar;
