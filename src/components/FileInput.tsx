import React from 'react';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { FileInputCont, FileInputLabel, SFileInput } from '../styles/input';

type FileInputProps = {
  file: File | string;
  setFile: (val: File | string) => void;
};

function FileInput({ file, setFile }: FileInputProps) {
  return (
    <FileInputCont>
      <FileInputLabel htmlFor="file">
        <FaCloudUploadAlt size={'3rem'} />
        <span>{file ? (file as File).name : null}</span>
        <SFileInput
          id="file"
          type={'file'}
          onChange={e => setFile(e.target.files ? e.target.files[0] : '')}
        />
      </FileInputLabel>
    </FileInputCont>
  );
}

export default FileInput;
