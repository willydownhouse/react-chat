import styled from 'styled-components';

export const Nav = styled.nav`
  padding: 0 2rem;
  height: 15vh;
  //background: #202225;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const FBbutton = styled.button`
  box-sizing: border-box;
  position: relative;
  font-family: 'Roboto', sans-serif;
  margin: 0.2em;
  padding: 0 15px 0 46px;
  border: none;
  text-align: left;
  line-height: 34px;
  white-space: nowrap;
  border-radius: 0.2em;
  font-size: 16px;
  color: #fff;
  background: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/14082/icon_facebook.png')
    6px 6px no-repeat;

  background-color: #1966c6;

  &::before {
    content: '';
    box-sizing: border-box;
    position: absolute;
    top: 0;
    left: 0;
    width: 34px;
    height: 100%;
  }
`;
