import React, { useState } from 'react';
import { SImg, SUploadedImg } from '../styles/message';

type UploadedImgProps = {
  src: string;
};

function UploadedImg({ src }: UploadedImgProps) {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  return (
    <SUploadedImg>
      <SImg
        isLoaded={isLoaded}
        onLoad={() => {
          console.log('IMAGE LOADED!');
          setIsLoaded(true);
        }}
        src={src}
        alt="img"
      />
    </SUploadedImg>
  );
}

export default UploadedImg;
