import React, { useCallback, useRef, useState } from 'react';
import { useEffect } from 'react';

import { useStateValue } from '../state/context';

import Message from './Message';
import { fetchMessages, useMessages } from '../utils/messages';
import MessageInput from './MessageInput';
import { ChatContainer, ContentWrap, MsgContainer } from '../styles';
import { COMMENT_MSG, FETCH_SUCCESS } from '../interfaces';
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
  const { messages, error, loading } = useMessages();

  useEffect(() => {
    if (!inView) return;
    console.log(`RED LINE is in the view ${inView}`);
    console.log('lets fetch more!');
  }, [inView]);

  useEffect(() => {
    //fetchMessages(dispatch, amountOfMsg);
    //setIsScrolledDown(false);
    // const unsubscribe = onSnapshot(collection(db, 'messages'), () => {
    //   console.log('listening db');
    //   fetchMessages(dispatch, amountOfMsg);
    // });
    // return () => {
    //   unsubscribe();
    //   console.log('unsubscribe');
    // };
    console.log(messages);
    if (messages.length === 0) return;

    dispatch({ type: FETCH_SUCCESS, payload: messages });
  }, [messages]);

  useEffect(() => {
    if (state.messages.length === 0) return;
    console.log('start scrolling');
    scrollRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
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

  if (loading) return <div>Loading...</div>;

  return (
    <ContentWrap>
      <SideBar />
      <ChatContainer>
        <MsgContainer onScroll={handleScroll}>
          {state.messages.length !== 0 && isScrolledDown ? (
            <div
              ref={ref}
              style={{
                height: '1rem',
                backgroundColor: 'red',
              }}
            ></div>
          ) : null}

          <>{renderMessages()}</>
          {state.messages.length === 0 ? null : (
            <div
              style={{
                height: '10px',
                backgroundColor: 'green',
              }}
              ref={scrollRef}
            ></div>
          )}
        </MsgContainer>

        <MessageInput />
      </ChatContainer>
      <SideBar />
    </ContentWrap>
  );
}

export default ChatPage;
