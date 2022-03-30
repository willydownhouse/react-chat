import React from 'react';
import { Link } from 'react-router-dom';
import { LOG_OUT } from '../interfaces';
import { useStateValue } from '../state/context';
import { handleAuth } from '../utils/auth';

function Navbar() {
  const { state, dispatch } = useStateValue();

  return (
    <div>
      <Link to="/">Front</Link>
      <Link to="/chat">Chat</Link>
      <button
        onClick={() =>
          state.user
            ? dispatch({
                type: LOG_OUT,
              })
            : handleAuth(dispatch)
        }
      >
        {state.user ? 'Sign out' : 'Sign in'}
      </button>
    </div>
  );
}

export default Navbar;
