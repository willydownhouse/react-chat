import React, { useCallback, useRef, useState } from 'react';
import { useEffect } from 'react';

import { useStateValue } from '../state/context';

import Message from './Message';
import { fetchMessages } from '../utils/messages';
import MessageInput from './MessageInput';
import { ChatContainer, ContentWrap, MsgContainer } from '../styles';
import { COMMENT_MSG } from '../interfaces';
import SideBar from './SideBar';

function ChatPage() {
  //const [amountOfMsg, setAmountOfMsg] = useState<number>(10);
  const { state, dispatch } = useStateValue();
  const ref = useRef() as React.MutableRefObject<HTMLDivElement>;

  // const scrollRef = useRef() as React.MutableRefObject<HTMLDivElement>;

  // useEffect(() => {
  //   fetchMessages(dispatch, amountOfMsg);
  // }, [amountOfMsg]);

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

  // const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
  //   const containerHeight = e.currentTarget.clientHeight;

  //   const scrollHeight = e.currentTarget.scrollHeight;
  //   const scrollTop = e.currentTarget.scrollTop;

  //   const position = ((scrollTop + containerHeight) / scrollHeight) * 100;

  //   if (position > 35) return;

  //   console.log('scroll position:');
  //   console.log(position);
  //   console.log('lets fetch more!');
  //   setAmountOfMsg(amountOfMsg + 1);
  // };

  return (
    <ContentWrap>
      <SideBar />
      <ChatContainer>
        <MsgContainer>
          <>{renderMessages()}</>
          <div ref={ref}></div>
        </MsgContainer>

        <MessageInput />
      </ChatContainer>
      <SideBar />
    </ContentWrap>
  );
}

export default ChatPage;
