import './Dashboard.css'; 
import React from 'react';
import Orders from './OrdersTable';
import RiskTable from './RiskTable';
import Account from './AccountTable';
import Positions from './PositionsTable';
import { useLiveDashboard } from './hooks/useLive';

const LiveDashboard = () => {
  const { loading, sessionData, handleRefreshClick } = useLiveDashboard();

  if (loading) return <div>Loading...</div>;

  return (
    <div className="dashboard-grid">
      <button className="refresh-button" onClick={handleRefreshClick}>
        ↻
      </button>
      <div className="grid-item account">
        <Account data={sessionData.account} />
      </div>
      <div className="grid-item positions">
        <Positions data={sessionData.positions} />
      </div>
      <div className="grid-item orders">
        <Orders data={sessionData.orders} />
      </div>
      <div className="grid-item risk">
        <RiskTable data={sessionData.risk} />
      </div>
    </div>
  );
};

export default LiveDashboard;
