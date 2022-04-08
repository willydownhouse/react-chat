import React from 'react';
import { Formik, Form, Field, FormikValues } from 'formik';
import { useStateValue } from '../state/context';
import { IMessage, REMOVE_MSG_COMMENT } from '../interfaces';
import {
  addNewMessage,
  fetchMessages,
  useMsgForComment,
} from '../utils/messages';
import { v4 as uuidv4 } from 'uuid';
import Comment from './Comment';
import {
  InputWrap,
  StyledButton,
  StyledField,
  StyledForm,
} from '../styles/input';
import * as yup from 'yup';
import { CommentBtn } from '../styles/message';
import { TiDelete } from 'react-icons/ti';

const initialValues = {
  commenting: '',
  message: '',
};

const validationSchema = yup.object().shape({
  message: yup.string().required("You can't send empty messages.."),
});

function MessageInput() {
  const { state, dispatch } = useStateValue();

  const { message, loading, error } = useMsgForComment(
    state.isCommentingMsgId as string
  );

  const handleSubmit = (values: FormikValues) => {
    const message: IMessage = {
      id: uuidv4(),
      author: state.user?.name as string,
      authorId: state.user?.id as string,
      authorImg: state.user?.photoURL as string,
      text: values.message,
      createdAt: new Date().toISOString(),
      isCommentOfMsgId: state.isCommentingMsgId,
    };

    addNewMessage(message, dispatch);
    fetchMessages(dispatch);

    dispatch({ type: REMOVE_MSG_COMMENT });
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
      {({ values, errors }) => (
        <StyledForm>
          {message && (
            <>
              <Comment message={message}>
                <CommentBtn
                  onClick={() => dispatch({ type: REMOVE_MSG_COMMENT })}
                >
                  <TiDelete size={`2rem`} />
                </CommentBtn>
              </Comment>
            </>
          )}

          <InputWrap>
            <StyledField
              name="message"
              value={values.message}
              placeholder={errors.message ? errors.message : 'Send message...'}
              autoComplete="off"
              errors={errors.message}
            />
            <StyledButton type="submit">Send</StyledButton>
          </InputWrap>
        </StyledForm>
      )}
    </Formik>
  );
}

export default MessageInput;
