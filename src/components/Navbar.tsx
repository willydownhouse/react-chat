import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useStateValue } from '../state/context';
import { FBbutton, Nav } from '../styles/navbar';
import { login, logout } from '../utils/auth';

function Navbar() {
  const { state, dispatch } = useStateValue();
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Nav>
      <div></div>

      <FBbutton
        onClick={() =>
          state.user
            ? logout(dispatch, location, navigate)
            : login(dispatch, location, navigate)
        }
      >
        {state.user ? 'Sign out' : 'Sign in'}
      </FBbutton>
    </Nav>
  );
}

export default Navbar;
