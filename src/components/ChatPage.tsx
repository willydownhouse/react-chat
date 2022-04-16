import React, { useCallback, useRef, useState } from 'react';
import { useEffect } from 'react';
import Message from './Message';
import { subscribe } from '../utils/messages';
import MessageInput from './MessageInput';
import { ChatContainer, ContentWrap, MsgContainer } from '../styles';
import { IMessage, IUser } from '../interfaces';
import SideBar from './SideBar';

import { useInView } from 'react-intersection-observer';

type ChatPageProps = {
  user: IUser | null;
};

const ChatPage: React.FC<ChatPageProps> = ({ user }) => {
  const [amountOfMsg, setAmountOfMsg] = useState<number>(15);
  const [isScrolledDown, setIsScrolledDown] = useState<boolean>(false);
  const [isCommentingMsgId, setIsCommentingMsgId] = useState<string>('');
  const [messages, setMessages] = useState<IMessage[]>([]);

  const scrollRef = useRef() as React.MutableRefObject<HTMLDivElement>;
  const { ref, inView } = useInView();

  useEffect(() => {
    const unsubscribe = subscribe(setMessages);

    return () => {
      console.log('unsubscribe');
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!inView) return;
    console.log(`RED LINE is in the view ${inView}`);
    console.log('lets fetch more!');
    setAmountOfMsg(amountOfMsg + 5);
  }, [inView]);

  useEffect(() => {
    console.log('Fetched messages:');
    console.log(messages.length);
    const lastChild = scrollRef.current.lastElementChild;

    console.log(lastChild);

    lastChild?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const isBottom =
      e.currentTarget.scrollHeight - e.currentTarget.scrollTop ===
      e.currentTarget.clientHeight;

    if (isBottom) {
      console.log('Is Bottom!');
      //setIsScrolledDown(true);
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

        <MessageInput
          isCommentingMsgId={isCommentingMsgId}
          setIsCommentingMsgId={setIsCommentingMsgId}
          user={user}
        />
      </ChatContainer>
      <SideBar />
    </ContentWrap>
  );
};

export default ChatPage;
