import React from 'react';
import "./Sidebar.css";
import { BsCart3, BsGrid1X2Fill, BsListCheck, BsMenuButtonWideFill, BsFillGearFill } from 'react-icons/bs';
import { FaHome } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Sidebar({ openSidebarToggle }) {
  return (
    <aside id="sidebar" className={`sidebar ${openSidebarToggle ? "active" : ""}`}>
      <div className='sidebar-title'>
        <div className='sidebar-brand'>MIDAS</div>
      </div>
      <ul className='sidebar-list'>
        <li className='sidebar-list-item'><Link to="/"><FaHome className='icon'/> Home</Link></li>
        <li className='sidebar-list-item'><Link to="/live"><BsMenuButtonWideFill className='icon'/> Live</Link></li>
        <li className='sidebar-list-item'><Link to="/filter"><BsListCheck className='icon'/> Filter</Link></li>
        <li className='sidebar-list-item'><Link to="/backtests"><BsGrid1X2Fill className='icon'/> Backtests</Link></li>
      </ul>
    </aside>
  );
}

export default Sidebar;
