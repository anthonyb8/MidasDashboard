import './App.css';
import React, { useEffect, useState, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Import other components you want to route to
import HomePage from './components/Home/Home.jsx';
import Login from './components/Login/Login';
import Header from './components/Header/Header';
import { AuthContext } from './data/AuthContext';
import Sidebar from './components/SideBar/Sidebar';
import { BacktestProvider } from './data/DataContext'; 
import FilterView from './components/Filter/FilterPage.jsx';
import { LiveDataProvider } from './data/LiveDataContext.jsx';
import LiveDashboard from './components/LiveDashboard/Dashboard';
import Dashboard from './components/BacktestDashboard/Dashboard.jsx';
import LineChart from './components/BacktestDashboard/LineChart.jsx';
// import SettingsPage from './components/SettingsPage';

function App() {
  const { isAuthenticated } = useContext(AuthContext); 
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (
    <Router>
      <BacktestProvider> 
        <LiveDataProvider>
          <div className={`grid-container ${!openSidebarToggle ? 'sidebar-hidden' : ''}`}>
            <Header OpenSidebar={OpenSidebar} />
            <Sidebar openSidebarToggle={openSidebarToggle} />
              <Routes>
              {isAuthenticated ? (
                <>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/filter" element={<FilterView />} />
                  <Route path="/backtests" element={<Dashboard />}/>
                  <Route path="/live" element={<LiveDashboard/>} />
                </>
              ) : (
                <Route path="/login" element={<Login />} />
              )}
              <Route path="*" element={<Navigate to={isAuthenticated ? "/" : "/login"} />} />
            </Routes>
          </div>
        </LiveDataProvider>
      </BacktestProvider>
    </Router>
  );
}

export default App;
