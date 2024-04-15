import './Dashboard.css'; 
import React from 'react';
import Orders from './OrdersTable';
import RiskTable from './RiskTable';
import Account from './AccountTable';
import Positions from './PositionsTable';
import { useLiveDashboard } from './hooks/useLive';
import { useContext, useEffect, useState } from 'react';

const LiveDashboard = () => {
  const {
    loading,
    sessionData,
    handleRefreshClick,
    selectedStrategyId,
    sessionsList,
    handleSessionChange 
  } = useLiveDashboard();
  
  if (sessionsList.length === 0 ) {
    return <div className="live-dashboard-container">No active Sessions.</div>;
  }

  if (loading) return <div>Loading...</div>;


  return (
    <div className='live-dashboard-container'>
      <div className='header-live-dashboard'>
        <h2 >Session ID: {selectedStrategyId}</h2>
        <select
          className="live-dropdown-menu"
          onChange={handleSessionChange}
          value={selectedStrategyId}
          >
          {console.log(sessionsList)}
          {sessionsList.map(sessionId => (
            <option key={sessionId} value={sessionId}>
              {sessionId}
            </option>
          ))}
        </select>
      </div>
      <div className="dashboard-grid">
        <button className="refresh-button" onClick={handleRefreshClick}>
          ↻
        </button>
        <div className="grid-item account">
          <Account account={sessionData.account} />
        </div>
        <div className="grid-item positions">
          <Positions positions={sessionData.positions} />
        </div>
        <div className="grid-item orders">
          <Orders orders={sessionData.orders} />
        </div>
        <div className="grid-item risk">
          <RiskTable risk={sessionData.risk} />
        </div>
      </div>
    </div>
  );
};

export default LiveDashboard;