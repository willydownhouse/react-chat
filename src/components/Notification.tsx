import React from 'react';

import { SNotification } from '../styles';

type NotificationProps = {
  notification: string;
};

const Notification: React.FC<NotificationProps> = ({ notification }) => {
  if (!notification) return null;

  return (
    <SNotification>
      <p>{notification}</p>
    </SNotification>
  );
};

export default Notification;
