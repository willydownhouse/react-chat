import React, { ReactNode } from 'react';
import { IUser } from '../interfaces';

type ProtectedRouteProps = {
  children: ReactNode;
  user: IUser | null;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, user }) => {
  if (!user)
    return (
      <div style={{ fontSize: '1.8rem' }}>
        You have to sign in to enter the chat
      </div>
    );

  return <>{children}</>;
};

export default ProtectedRoute;
