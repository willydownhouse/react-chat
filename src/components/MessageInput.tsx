import React from 'react';
import { Formik, Form, Field, FormikValues } from 'formik';
import { useStateValue } from '../state/context';
import { IMessage } from '../interfaces';
import { addNewMessage, fetchMessages } from '../utils/messages';
import { v4 as uuidv4 } from 'uuid';
import { StyledButton, StyledField, StyledForm } from '../styles/input';
import * as yup from 'yup';

const initialValues = {
  message: '',
};

const validationSchema = yup.object().shape({
  message: yup.string().required("You can't send empty messages.."),
});

function MessageInput() {
  const { state, dispatch } = useStateValue();

  const handleSubmit = (values: FormikValues) => {
    const message: IMessage = {
      id: uuidv4(),
      author: state.user?.name as string,
      authorId: state.user?.id as string,
      authorImg: state.user?.photoURL as string,
      text: values.message,
      createdAt: new Date().toISOString(),
    };

    addNewMessage(message, dispatch);
    fetchMessages(dispatch);
  };
  return (
    <Formik
      onSubmit={(values, { resetForm }) => {
        handleSubmit(values);
        resetForm();
      }}
      initialValues={initialValues}
      validationSchema={validationSchema}
    >
      {({ values, errors, handleBlur }) => (
        <StyledForm>
          <StyledField
            name="message"
            value={values.message}
            placeholder={errors.message ? errors.message : 'Send message...'}
            autoComplete="off"
            errors={errors.message}
            onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
              handleBlur(e);
              if (values.message === '') {
                errors.message = '';
              }
              console.log(errors);
            }}
          />
          <StyledButton type="submit">Send</StyledButton>
        </StyledForm>
      )}
    </Formik>
  );
}

export default MessageInput;
