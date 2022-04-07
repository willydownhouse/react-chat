import React from 'react';
import { AppContainer, PageContainer } from '../styles';
import { FrontImg, FrontPageCont } from '../styles/frontpage';

function FrontPage() {
  return (
    <PageContainer>
      <FrontPageCont>
        <FrontImg src="./Icon.png" />
      </FrontPageCont>
    </PageContainer>
  );
}

export default FrontPage;
