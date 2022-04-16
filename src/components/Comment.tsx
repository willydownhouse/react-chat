import React, { ReactNode } from 'react';
import { IMessage } from '../interfaces';
import { CommentContent } from '../styles/message';

type CommentProps = {
  message: IMessage;
  children?: ReactNode;
};

const end = window.innerWidth < 355 ? 30 : 50;

const Comment = ({ message, children }: CommentProps) => {
  const renderedComment = message.text.substring(0, end);

  return (
    <div>
      <CommentContent>
        {`${message.author}: ${renderedComment}...`}
        {children}
      </CommentContent>
    </div>
  );
};

export default Comment;
