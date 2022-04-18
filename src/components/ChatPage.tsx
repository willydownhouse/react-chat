import React, { useCallback, useRef, useState } from 'react';
import { useEffect } from 'react';
import Message from './Message';
import { subscribe } from '../utils/messages';
import MessageInput from './MessageInput';
import { ChatContainer, ContentWrap, MsgContainer, SideBar } from '../styles';
import { IMessage, IUser } from '../interfaces';

import { useInView } from 'react-intersection-observer';
import FetchMoreDiv from './FetchMoreDiv';

type ChatPageProps = {
  user: IUser | null;
};

const ChatPage: React.FC<ChatPageProps> = ({ user }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [amountOfMsg, setAmountOfMsg] = useState<number>(30);
  const [startedScrollingDown, setStartedScrollingDown] =
    useState<boolean>(false);
  const [isCommentingMsgId, setIsCommentingMsgId] = useState<string>('');
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [newMessage, setNewMessage] = useState<IMessage | null>(null);

  const scrollRef = useRef() as React.MutableRefObject<HTMLDivElement>;
  const numOfRenders = useRef<number>(0);

  const { ref, inView } = useInView();

  useEffect(() => {
    const unsubscribe = subscribe(setMessages, setLoading, amountOfMsg);

    return () => unsubscribe();
  }, [amountOfMsg]);

  useEffect(() => {
    if (!inView) return;
    setAmountOfMsg(amountOfMsg + 10);
  }, [inView]);

  useEffect(() => {
    numOfRenders.current++;
    console.log('Fetched messages:');
    console.log(messages.length);
    const lastChild = scrollRef.current.lastElementChild;

    if (numOfRenders.current === 2) {
      setTimeout(() => scrollToView(lastChild), 500);
    }

    if (newMessage) {
      scrollToView(lastChild);
      setNewMessage(null);
    }
  }, [messages]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    // const isBottom =
    //   e.currentTarget.scrollHeight - e.currentTarget.scrollTop ===
    //   e.currentTarget.clientHeight;

    if (e.currentTarget.scrollTop > 1000) {
      setStartedScrollingDown(true);
    }
  };

  const renderMessages = useCallback(() => {
    return messages.map(msg => {
      return (
        <Message
          key={msg.id}
          message={msg}
          token={user?.token as string}
          onClick={() => setIsCommentingMsgId(msg.id)}
        />
      );
    });
  }, [messages]);

  return (
    <ContentWrap>
      <SideBar />
      <ChatContainer>
        <MsgContainer ref={scrollRef} onScroll={handleScroll}>
          {startedScrollingDown ? <FetchMoreDiv scroll={ref} /> : null}

          {loading ? (
            <div style={{ fontSize: '2rem' }}>Loading ...</div>
          ) : (
            renderMessages()
          )}
        </MsgContainer>

        <MessageInput
          isCommentingMsgId={isCommentingMsgId}
          setIsCommentingMsgId={setIsCommentingMsgId}
          user={user}
          setNewMessage={setNewMessage}
        />
      </ChatContainer>
      <SideBar />
    </ContentWrap>
  );
};

export default ChatPage;

function scrollToView(el: Element | null) {
  el?.scrollIntoView({
    behavior: 'smooth',
    block: 'end',
    inline: 'nearest',
  });
}
