import React from 'react';
import { useStateValue } from '../state/context';

const ProtectedRoute: React.FC = ({ children }) => {
  const { state } = useStateValue();
  if (!state.user)
    return (
      <div style={{ fontSize: '1.8rem' }}>
        You have to sign in to enter the chat
      </div>
    );

  return <>{children}</>;
};

export default ProtectedRoute;
