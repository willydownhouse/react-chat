import React, { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { useEffect } from 'react';

import { useStateValue } from '../state/context';

import Message from './Message';
import { fetchMessages, useMessages } from '../utils/messages';
import MessageInput from './MessageInput';
import { ChatContainer, ContentWrap, MsgContainer } from '../styles';
import { COMMENT_MSG } from '../interfaces';
import SideBar from './SideBar';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { useInView } from 'react-intersection-observer';

function ChatPage() {
  const [amountOfMsg, setAmountOfMsg] = useState<number>(15);
  const [isScrolledDown, setIsScrolledDown] = useState<boolean>(false);
  const { state, dispatch } = useStateValue();

  const scrollRef = useRef() as React.MutableRefObject<HTMLDivElement>;
  const { ref, inView } = useInView();

  useEffect(() => {
    if (!inView) return;
    console.log(`RED LINE is in the view ${inView}`);
    console.log('lets fetch more!');
    setAmountOfMsg(amountOfMsg + 5);
  }, [inView]);

  useEffect(() => {
    fetchMessages(dispatch, amountOfMsg);
  }, [amountOfMsg]);

  useEffect(() => {
    const lastChild = scrollRef.current.lastElementChild;

    lastChild?.scrollIntoView({ behavior: 'smooth' });
  }, [state.messages]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const isBottom =
      e.currentTarget.scrollHeight - e.currentTarget.scrollTop ===
      e.currentTarget.clientHeight;

    if (isBottom) {
      console.log('Is Bottom!');
      setIsScrolledDown(true);
    }
  };

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
    <ContentWrap>
      <SideBar />
      <ChatContainer>
        <MsgContainer ref={scrollRef} onScroll={handleScroll}>
          {isScrolledDown ? (
            <div
              ref={ref}
              style={{
                height: '1rem',
                backgroundColor: 'red',
              }}
            ></div>
          ) : null}

          {renderMessages()}
        </MsgContainer>

        <MessageInput />
      </ChatContainer>
      <SideBar />
    </ContentWrap>
  );
}

export default ChatPage;
