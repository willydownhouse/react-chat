import React, { useState } from 'react';
import { Formik, FormikValues } from 'formik';
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
  SMessageInput,
  StyledButton,
  StyledField,
  StyledForm,
} from '../styles/input';
import * as yup from 'yup';
import { CommentBtn } from '../styles/message';
import { TiDelete } from 'react-icons/ti';
import { handleUploadAndGetImgUrl } from '../utils/image';
import FileInput from './FileInput';

const initialValues = {
  message: '',
};

const validationSchema = yup.object().shape({
  message: yup.string().required("You can't send empty messages.."),
});

function MessageInput() {
  const [file, setFile] = useState<File | string>('');
  const { state, dispatch } = useStateValue();
  const { message } = useMsgForComment(state.isCommentingMsgId as string);

  const handleSubmit = (values: FormikValues, imgUrl = '') => {
    const message: IMessage = {
      id: uuidv4(),
      author: state.user?.name as string,
      authorId: state.user?.id as string,
      authorImg: state.user?.photoURL as string,
      text: values.message,
      createdAt: new Date().toISOString(),
      isCommentOfMsgId: state.isCommentingMsgId,
      imgUrl,
    };

    addNewMessage(message, dispatch);
    fetchMessages(dispatch, 100);

    dispatch({ type: REMOVE_MSG_COMMENT });
  };
  return (
    <SMessageInput>
      <Formik
        onSubmit={async (values, { resetForm }) => {
          console.log(values);

          console.log(file);

          if (file) {
            const imgUrl = await handleUploadAndGetImgUrl(file as File);

            console.log(imgUrl);
            if (!imgUrl) return;
            console.log('submits');
            handleSubmit(values, imgUrl as string);
            resetForm();
            setFile('');
            return;
          }
          console.log('submits');
          handleSubmit(values);
          resetForm();
          setFile('');
        }}
        initialValues={initialValues}
        validationSchema={validationSchema}
      >
        {({ values, errors }) => (
          <StyledForm>
            {message ? (
              <>
                <Comment message={message}>
                  <CommentBtn
                    onClick={() => dispatch({ type: REMOVE_MSG_COMMENT })}
                  >
                    <TiDelete size={`3rem`} />
                  </CommentBtn>
                </Comment>
              </>
            ) : null}

            <InputWrap>
              <StyledField
                name="message"
                value={values.message}
                placeholder={
                  errors.message ? errors.message : 'Send message...'
                }
                autoComplete="off"
                errors={errors.message}
                $comment={message ? true : false}
              />
              <StyledButton type="submit">Send</StyledButton>
            </InputWrap>
            <FileInput file={file} setFile={setFile} />
          </StyledForm>
        )}
      </Formik>
    </SMessageInput>
  );
}

export default MessageInput;
