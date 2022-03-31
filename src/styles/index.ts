import styled from 'styled-components';
import { Field, Form } from 'formik';

type ContainerProps = {
  padding?: string;
  bg?: string;
};

export const AppContainer = styled.div<ContainerProps>`
  height: 100vh;
  padding: ${props => (props.padding ? props.padding : '0')};
  background: #202225;

  @media (max-width: 850px) {
    padding: 0 1rem;
  }
`;

export const PageContainer = styled.div`
  height: 85vh;
`;

export const ChatContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: transparent;
  display: flex;
  flex-direction: column;
`;

export const MsgContainer = styled.div`
  height: 90%;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    //display: none;
    width: 1rem;
    background-color: yellow;
    scrollbar-track-color: #111;
  }
`;

export const Nav = styled.nav`
  height: 15vh;
  background: #202225;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const StyledForm = styled(Form)`
  height: 10%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyledField = styled(Field)`
  width: 90%;
  height: 4rem;
  outline: none;
  font-size: 1.8rem;

  &:focus {
    border: 2px solid #6544d1;
  }

  @media (max-width: 850px) {
    width: 90%;
  }
`;

export const StyledButton = styled.button`
  width: 10%;
  height: 4rem;
  background: linear-gradient(#ea3ea3, #ec15d2);
  outline: none;
  color: white;
  cursor: pointer;
  font-family: 'Roboto', sans-serif;
`;

interface StyledMsgProps {
  bg?: string;
}

export const StyledMsg = styled.div<StyledMsgProps>`
  width: 100%;
  min-height: 6rem;
  padding: 1rem 3rem;
  background-color: #36393f;
  margin-bottom: 2rem;
  border-radius: 5px;
`;

export const Flex = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 1rem;
`;

export const Name = styled.h2`
  margin-right: 3rem;
`;

export const Msg = styled.h4`
  font-size: 1.8rem;
`;
