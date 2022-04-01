import styled from 'styled-components';

interface StyledMsgProps {
  bg?: string;
}

export const StyledMsg = styled.div<StyledMsgProps>`
  width: 100%;
  min-height: 6rem;
  padding: 1.5rem 1rem;
  background-color: #36393f;
  margin-bottom: 2rem;
  border-radius: 5px;
  display: flex;
  align-items: center;
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

export const Msg = styled.h4`
  font-size: 1.8rem;
`;

export const ImgWrap = styled.div`
  margin-right: 2rem;
`;

export const ProfileImg = styled.img`
  border-radius: 0.5rem;
`;
