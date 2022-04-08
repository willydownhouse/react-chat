import styled from 'styled-components';
import { Field, Form } from 'formik';

export const StyledForm = styled(Form)`
  height: 10%;
  display: flex;
  flex-direction: column;
`;

export const InputWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

type StyledFieldProps = {
  errors?: string;
};

export const StyledField = styled(Field)<StyledFieldProps>`
  width: 90%;
  height: 4rem;
  outline: none;
  font-size: 1.7rem;
  border: ${props =>
    props.errors ? '2px solid #a30000' : '1px solid #e7e7e7'};
  border-radius: 5px;
  @media (max-width: 850px) {
    width: 85%;
  }
`;

export const StyledButton = styled.button`
  width: 9%;
  height: 4rem;
  background: transparent;
  border: 1px solid #e7e7e7;
  border-radius: 5px;
  outline: none;
  color: white;
  cursor: pointer;
  font-family: 'Roboto', sans-serif;

  @media (max-width: 850px) {
    width: 12%;
  }
`;
