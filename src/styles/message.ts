import styled from 'styled-components';

interface StyledMsgProps {
  bg?: string;
  comment?: boolean;
}

export const StyledMsg = styled.div<StyledMsgProps>`
  width: 100%;
  min-height: 6rem;
  padding: 1.5rem 1rem;
  background-color: #36393f;
  margin-bottom: 2rem;

  display: flex;
  align-items: center;
  background: linear-gradient(
    to right bottom,
    rgba(255, 255, 255, 0.7),
    rgba(255, 255, 255, 0.3)
  );
  color: #36393f;
  cursor: pointer;
  border-bottom-left-radius: 5px;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  border-top-left-radius: ${props => (props.comment ? '' : '5px')};
`;

export const Flex = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 1rem;
`;

export const Author = styled.h2`
  margin-right: 3rem;
`;

export const MsgWrap = styled.div`
  max-width: 50rem;
  white-space: pre-wrap; /* Webkit */
  white-space: -moz-pre-wrap; /* Firefox */
  white-space: -pre-wrap; /* Opera <7 */
  white-space: -o-pre-wrap; /* Opera 7 */
  word-wrap: break-word; /* IE */
`;

export const Msg = styled.p`
  font-size: 1.6rem;
`;

export const ImgWrap = styled.div`
  margin-right: 2rem;
`;

export const ProfileImg = styled.img`
  border-radius: 0.5rem;
`;

export const SComment = styled.div``;

export const CommentAuth = styled.span`
  position: relative;
  display: inline-block;
  background-image: linear-gradient(
    to right,
    rgba(255, 255, 255, 0.7),
    rgba(255, 255, 255, 0.3)
  );
  padding: 0.7rem 2rem 0.7rem 2rem;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  color: #111;
  font-size: 1.2rem;
`;

export const CommentBtn = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 2rem;
  height: 2rem;

  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;
