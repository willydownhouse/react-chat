import React, { useState } from 'react';
import { Formik, FormikValues } from 'formik';
import { IMessage, IUser } from '../interfaces';
import { addNewMessage, useMsgForComment } from '../utils/messages';
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

type MessageInputProps = {
  isCommentingMsgId: string;
  setIsCommentingMsgId: (val: string) => void;
  user: IUser | null;
  setNewMessage: (val: IMessage | null) => void;
};

const MessageInput: React.FC<MessageInputProps> = ({
  isCommentingMsgId,
  setIsCommentingMsgId,
  user,
  setNewMessage,
}) => {
  const [file, setFile] = useState<File | string>('');

  const { message } = useMsgForComment(isCommentingMsgId as string);

  const handleSubmit = (values: FormikValues, imgUrl = '') => {
    const message: IMessage = {
      id: uuidv4(),
      author: user?.name as string,
      authorId: user?.id as string,
      authorImg: user?.photoURL as string,
      text: values.message,
      createdAt: new Date().toISOString(),
      isCommentOfMsgId: isCommentingMsgId,
      imgUrl,
    };

    addNewMessage(message);
    setIsCommentingMsgId('');
    setNewMessage(message);
  };
  return (
    <SMessageInput>
      <Formik
        onSubmit={async (values, { resetForm }) => {
          if (file) {
            const imgUrl = await handleUploadAndGetImgUrl(file as File);

            if (!imgUrl) return;
            handleSubmit(values, imgUrl as string);
            resetForm();
            setFile('');
            return;
          }
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
                  <CommentBtn onClick={() => setIsCommentingMsgId('')}>
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
};

export default MessageInput;
