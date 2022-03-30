import React from 'react';
import { useStateValue } from '../state/context';

const ProtectedRoute: React.FC = ({ children }) => {
  const { state } = useStateValue();
  if (!state.user) return <div>Sign in to send messages</div>;

  return <>{children}</>;
};

export default ProtectedRoute;
