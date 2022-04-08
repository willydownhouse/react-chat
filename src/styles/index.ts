import styled from 'styled-components';

type ContainerProps = {
  padding?: string;
  bg?: string;
};

export const AppContainer = styled.div<ContainerProps>`
  background-image: linear-gradient(to right, #868f96 0%, #596164 100%);
  min-height: 100vh;

  @media (max-width: 850px) {
    padding: 0 1rem;
  }
`;

export const ContentWrap = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr 1fr;

  @media (max-width: 850px) {
    grid-template-columns: 1fr;
  }
`;

export const PageContainer = styled.div``;

export const ChatContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: transparent;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
`;

export const MsgContainer = styled.div`
  height: 85%;
  padding: 0rem 10rem;
  overflow-y: scroll;
  background: linear-gradient(
    to right bottom,
    rgba(255, 255, 255, 0.7),
    rgba(255, 255, 255, 0.3)
  );
  border-radius: 5px;
  margin-bottom: 1rem;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 850px) {
    padding: 1rem 1rem;
  }
`;
