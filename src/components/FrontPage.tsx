import React from 'react';
import { Link } from 'react-router-dom';
import { FrontImg, FrontPageCont } from '../styles/frontpage';

function FrontPage() {
  return (
    <FrontPageCont>
      <Link to="/chat">
        <FrontImg src="./logo.png" />
      </Link>
    </FrontPageCont>
  );
}

export default FrontPage;
