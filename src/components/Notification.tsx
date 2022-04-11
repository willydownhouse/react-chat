import React from 'react';
import { useStateValue } from '../state/context';
import { SNotification } from '../styles';

function Notification() {
  const { state } = useStateValue();

  if (!state.notification) return null;

  return (
    <SNotification>
      <p>{state.notification.text}</p>
    </SNotification>
  );
}

export default Notification;
