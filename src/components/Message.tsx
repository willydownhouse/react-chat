import React from 'react';
import { IMessage } from '../interfaces';
import {
  Author,
  Flex,
  ImgWrap,
  Msg,
  ProfileImg,
  StyledMsg,
} from '../styles/message';
import { modifyDate } from '../utils/messages';

type MessageProps = {
  message: IMessage;
  token: string;
};

function Message({ message, token }: MessageProps) {
  return (
    <StyledMsg>
      <ImgWrap>
        <ProfileImg src={`${message.authorImg}?access_token=${token}`} />
      </ImgWrap>
      <div>
        <Flex>
          <Author>{message.author}</Author>
          <h4>{modifyDate(message.createdAt)}</h4>
        </Flex>

        <Msg>{message.text}</Msg>
      </div>
    </StyledMsg>
  );
}

export default Message;
