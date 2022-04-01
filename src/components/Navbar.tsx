import React from 'react';
import { Link } from 'react-router-dom';
import { useStateValue } from '../state/context';
import { FBbutton, Nav } from '../styles/navbar';
import { login, logout } from '../utils/auth';

function Navbar() {
  const { state, dispatch } = useStateValue();

  return (
    <Nav>
      <div>
        <Link to="/">Front</Link>
        <Link to="/chat">Chat</Link>
      </div>

      <FBbutton
        onClick={() => (state.user ? logout(dispatch) : login(dispatch))}
      >
        {state.user ? 'Sign out' : 'Sign in'}
      </FBbutton>
    </Nav>
  );
}

export default Navbar;
