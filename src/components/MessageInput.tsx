import React from 'react';
import { Formik, Form, Field } from 'formik';
import { useStateValue } from '../state/context';
import { IMessage } from '../interfaces';
import { addNewMessage, fetchMessages } from '../utils/messages';
import { v4 as uuidv4 } from 'uuid';

interface FormValues {
  message: string;
}

const initialValues = {
  message: '',
};

function MessageInput() {
  const { state, dispatch } = useStateValue();

  const handleSubmit = (values: FormValues) => {
    const message: IMessage = {
      id: uuidv4(),
      author: state.user?.name as string,
      text: values.message,
      createdAt: new Date().toISOString(),
    };

    addNewMessage(message, dispatch);
    fetchMessages(dispatch);
  };
  return (
    <Formik
      onSubmit={values => handleSubmit(values)}
      initialValues={initialValues}
    >
      {({ values, errors }) => (
        <Form>
          <Field name="message" value={values.message} />
          <button type="submit">Send</button>
        </Form>
      )}
    </Formik>
  );
}

export default MessageInput;
