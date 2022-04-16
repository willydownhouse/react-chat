import React from 'react';
import { IMessage } from '../interfaces';
import {
  Author,
  Flex,
  ImgWrap,
  Msg,
  MsgBottom,
  MsgTop,
  ProfileImg,
  StyledMsg,
} from '../styles/message';
import { modifyDate, useMsgForComment } from '../utils/messages';
import Comment from './Comment';
import UploadedImg from './UploadedImg';

type MessageProps = {
  message: IMessage;
  token: string;
  onClick: (val: string) => void;
};

function Message({ message, token, onClick }: MessageProps) {
  const { message: commentedMsg } = useMsgForComment(
    message.isCommentOfMsgId as string
  );

  return (
    <>
      {commentedMsg && <Comment message={commentedMsg} />}
      <StyledMsg
        onClick={() => onClick(message.id)}
        $comment={commentedMsg ? true : false}
      >
        <MsgTop>
          <ImgWrap>
            <ProfileImg src={`${message.authorImg}?access_token=${token}`} />
          </ImgWrap>
          <Flex>
            <Author>{message.author}</Author>
            <h4>{modifyDate(message.createdAt)}</h4>
          </Flex>
        </MsgTop>
        {message.imgUrl ? <UploadedImg src={message.imgUrl} /> : null}
        <MsgBottom>
          <Msg>{message.text}</Msg>
        </MsgBottom>
      </StyledMsg>
    </>
  );
}

export default React.memo(Message);
