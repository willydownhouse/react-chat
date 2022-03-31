import React, { useRef } from 'react';
import { useEffect } from 'react';

import { useStateValue } from '../state/context';

import Message from './Message';
import { fetchMessages } from '../utils/messages';
import MessageInput from './MessageInput';
import { ChatContainer, MsgContainer, PageContainer } from '../styles';

function ChatPage() {
  const { state, dispatch } = useStateValue();
  const ref = useRef() as React.MutableRefObject<HTMLDivElement>;

  useEffect(() => {
    fetchMessages(dispatch);
  }, []);

  useEffect(() => {
    ref.current.scrollIntoView({ behavior: 'smooth' });
  }, [state.messages]);

  const renderMessages = () => {
    return state.messages.map(msg => {
      return <Message key={msg.id} message={msg} />;
    });
  };

  return (
    <PageContainer>
      <ChatContainer>
        <MsgContainer>
          <>{renderMessages()}</>
          <div ref={ref}></div>
        </MsgContainer>

        <MessageInput />
      </ChatContainer>
    </PageContainer>
  );
}

export default ChatPage;
