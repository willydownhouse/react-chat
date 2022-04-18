import React from 'react';

type FetchMoreDivProps = {
  scroll: (node: Element | null | undefined) => void;
};

const FetchMoreDiv: React.FC<FetchMoreDivProps> = ({ scroll }) => {
  return (
    <div
      ref={scroll}
      style={{
        height: '1rem',
        backgroundColor: 'transparent',
      }}
    ></div>
  );
};

export default FetchMoreDiv;
