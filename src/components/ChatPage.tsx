import React from 'react';
import { useEffect } from 'react';

import { useStateValue } from '../state/context';

import Message from './Message';
import { fetchMessages } from '../utils/messages';

function ChatPage() {
  const { state, dispatch } = useStateValue();
  useEffect(() => {
    fetchMessages(dispatch);
  }, []);

  const renderMessages = () => {
    return state.messages.map(msg => {
      return <Message key={msg.id} message={msg} />;
    });
  };

  return (
    <div>
      Chatpage
      {renderMessages()}
    </div>
  );
}

export default ChatPage;
