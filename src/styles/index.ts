import styled from 'styled-components';

type ContainerProps = {
  padding?: string;
  bg?: string;
};

export const AppContainer = styled.div<ContainerProps>`
  background-image: linear-gradient(to right, #868f96 0%, #596164 100%);
  min-height: 100vh;

  @media (max-width: 850px) {
    padding: 0;
  }
`;

export const ContentWrap = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr 1fr;

  @media (max-width: 850px) {
    grid-template-columns: 1fr;
  }
`;

export const ChatContainer = styled.div`
  width: 100%;
  height: 90vh;
  background-color: transparent;

  border-radius: 5px;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 8fr 2fr;
`;

export const MsgContainer = styled.div`
  height: 100%;
  padding: 0rem 10rem;
  overflow-y: scroll;
  background: linear-gradient(
    to right bottom,
    rgba(255, 255, 255, 0.7),
    rgba(255, 255, 255, 0.3)
  );
  //background: transparent;
  border-radius: 5px;
  margin-bottom: 1rem;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 850px) {
    padding: 1rem 1rem;
  }

  @media (max-width: 600px) {
    background: transparent;
  }
`;
