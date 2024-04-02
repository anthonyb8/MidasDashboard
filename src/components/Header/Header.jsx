import "./Header.css";
import React from 'react';
import {BsJustify} from 'react-icons/bs';

function Header({OpenSidebar}) {
  return (
      <div className='header'>
          <button className='menu-icon' onClick={OpenSidebar}>
              <BsJustify className='icon'/>
          </button>
      </div>
  );
}

export default Header;
