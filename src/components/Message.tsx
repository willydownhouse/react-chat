import React from 'react';
import { IMessage } from '../interfaces';

type MessageProps = {
  message: IMessage;
};

function Message({ message }: MessageProps) {
  return (
    <div>
      <h3>{message.author}</h3>
      <h4>{message.text}</h4>
      <p>{message.createdAt}</p>
    </div>
  );
}

export default Message;
