import styled from 'styled-components';

export const FrontPageCont = styled.div`
  height: 90vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  /*  background: url('https://images.unsplash.com/photo-1553117595-47f8eda3177d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzcyfHxtb3VudGFpbnN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60')
    no-repeat center center/cover; */
`;

export const FrontImg = styled.img`
  @media (max-width: 850px) {
    width: 400px;
  }
  @media (max-width: 600px) {
    width: 300px;
  }
`;
//143 136 135
