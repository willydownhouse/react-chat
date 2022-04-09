import React, { useCallback, useMemo, useRef } from 'react';
import { useEffect } from 'react';

import { useStateValue } from '../state/context';

import Message from './Message';
import { fetchMessages, useMessages } from '../utils/messages';
import MessageInput from './MessageInput';
import { ChatContainer, MsgContainer } from '../styles';
import { COMMENT_MSG } from '../interfaces';

function ChatPage() {
  const { state, dispatch } = useStateValue();
  const ref = useRef() as React.MutableRefObject<HTMLDivElement>;

  useEffect(() => {
    fetchMessages(dispatch);
  }, []);

  useEffect(() => {
    ref.current.scrollIntoView({ behavior: 'smooth' });
  }, [state.messages]);

  const handleMessageClick = (id: string) => {
    dispatch({
      type: COMMENT_MSG,
      payload: id,
    });
  };

  const renderMessages = useCallback(() => {
    return state.messages.map(msg => {
      return (
        <Message
          key={msg.id}
          message={msg}
          token={state.user?.token as string}
          onClick={handleMessageClick}
        />
      );
    });
  }, [state.messages]);

  return (
    <ChatContainer>
      <MsgContainer>
        <>{renderMessages()}</>
        <div ref={ref}></div>
      </MsgContainer>

      <MessageInput />
    </ChatContainer>
  );
}

export default ChatPage;
