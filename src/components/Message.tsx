import React from 'react';
import { IMessage } from '../interfaces';
import { Flex, Msg, Name, StyledMsg } from '../styles';

type MessageProps = {
  message: IMessage;
};

function Message({ message }: MessageProps) {
  const modifyDate = (date: string) => {
    const today = new Date().toLocaleDateString();
    const d = new Date(date).toLocaleDateString();
    const time = new Date(date).toLocaleTimeString().substring(0, 4);

    return `${today === d ? 'today' : d} ${time}`;
  };
  return (
    <StyledMsg>
      <Flex>
        <Name>{message.author}</Name>
        <h4>{modifyDate(message.createdAt)}</h4>
      </Flex>

      <Msg>{message.text}</Msg>
    </StyledMsg>
  );
}

export default Message;
