import React, { useEffect, useState } from 'react';
import { IMessage } from '../interfaces';
import { doc, getDoc, collection } from '@firebase/firestore';

import {
  Author,
  Flex,
  ImgWrap,
  Msg,
  MsgWrap,
  ProfileImg,
  StyledMsg,
} from '../styles/message';
import { modifyDate, useMsgForComment } from '../utils/messages';
import Comment from './Comment';

type MessageProps = {
  message: IMessage;
  token: string;
  onClick: (val: string) => void;
};

function Message({ message, token, onClick }: MessageProps) {
  const {
    message: commentedMsg,
    loading,
    error,
  } = useMsgForComment(message.isCommentOfMsgId as string);
  return (
    <>
      {commentedMsg && <Comment message={commentedMsg} />}
      <StyledMsg
        onClick={() => onClick(message.id)}
        comment={commentedMsg ? true : false}
      >
        <ImgWrap>
          <ProfileImg src={`${message.authorImg}?access_token=${token}`} />
        </ImgWrap>
        <div>
          <Flex>
            <Author>{message.author}</Author>
            <h4>{modifyDate(message.createdAt)}</h4>
          </Flex>
          <MsgWrap>
            <Msg>{message.text}</Msg>
          </MsgWrap>
        </div>
      </StyledMsg>
    </>
  );
}

export default React.memo(Message);
