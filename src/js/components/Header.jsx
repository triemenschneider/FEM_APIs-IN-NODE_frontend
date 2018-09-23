import React from 'react';

//https://fontawesome.com/icons
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';

const Header = () => (
  <div className="header">
    <h1>
      {/* <FontAwesomeIcon icon={faLock} /> */}
      Members Database
    </h1>
  </div>
);

export default Header;
