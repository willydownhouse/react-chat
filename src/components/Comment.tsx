import React, { ReactNode } from 'react';
import { IMessage } from '../interfaces';
import { CommentAuth, SComment } from '../styles/message';

type CommentProps = {
  message: IMessage;
  children?: ReactNode;
};

const Comment = ({ message, children }: CommentProps) => (
  <SComment>
    <CommentAuth>
      {`${message.author}: ${message.text.substring(0, 60)}...`}
      {children}
    </CommentAuth>
  </SComment>
);

export default Comment;
