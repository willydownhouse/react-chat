import styled from 'styled-components';

export const SideBar = styled.div`
  @media (max-width: 850px) {
    display: none;
  }
`;

export const SNotification = styled.div`
  position: absolute;
  top: 0;
  left: 50%;

  transform: translateX(-50%);
  font-size: 2rem;
  background-color: rgb(143, 136, 135);
  padding: 1rem 2rem;
  z-index: 10;
`;

type ContainerProps = {
  padding?: string;
  bg?: string;
};

export const AppContainer = styled.div<ContainerProps>`
  background-image: linear-gradient(to right, #141e30, #243b55);
  min-height: 100vh;
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
  padding: 0 1rem;
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

  border-radius: 5px;
  margin-bottom: 1rem;

  &::-webkit-scrollbar {
    width: 1rem;
  }

  /* Track */
  &::-webkit-scrollbar-track {
    background: transparent;
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: yellow;
    border-radius: 5px;
    background: #777;
  }

  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }

  @media (max-width: 850px) {
    padding: 1rem 1rem;
  }

  @media (max-width: 600px) {
    background: transparent;
    padding: 1rem 0;

    &::-webkit-scrollbar {
      width: 0.5rem;
    }
  }
`;
