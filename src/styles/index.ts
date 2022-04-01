import styled from 'styled-components';
import { Field, Form } from 'formik';

type ContainerProps = {
  padding?: string;
  bg?: string;
};

export const AppContainer = styled.div<ContainerProps>`
  height: 100vh;
  background: #202225;

  @media (max-width: 850px) {
    padding: 0 1rem;
  }
`;

export const ContentWrap = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr 1fr;
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
    display: none;
  }
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
