import styled from 'styled-components';

export const FrontPageCont = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const FrontImg = styled.img`
  @media (max-width: 850px) {
    width: 400px;
  }
  @media (max-width: 600px) {
    width: 300px;
  }
`;
