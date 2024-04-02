import './TablesCollection.css'; 
import React, { useState } from 'react';

import TradeTable from './TradeTable';
import OverviewTable from './OverviewTable';
import SignalsTable from './SignalsTable';

function TablesCollection({ overview_data, trades_data, signals_data }) {
  const [selectedTable, setSelectedTable] = useState('overview');

  const renderTable = () => {
    switch (selectedTable) {
      case 'overview':
        return <OverviewTable overview_data={overview_data} />;
      case 'trades':
        return <TradeTable trades_data={trades_data} />;
      case 'signals':
        return <SignalsTable signals_data={signals_data} />;
      default:
        return <div>Select a table...</div>;
    }
  };

  return (
    <div className="table-collection"> {/* Reuse `filter-view` for consistent styling */}
      <div className="strategy-buttons-bar"> {/* Button bar for table selection */}
        <button
          className={`button-style ${selectedTable === 'overview' ? 'selected' : ''}`}
          onClick={() => setSelectedTable('overview')}
          >OVERVIEW
        </button>
        <button
          className={`button-style ${selectedTable === 'trades' ? 'selected' : ''}`}
          onClick={() => setSelectedTable('trades')}
          >TRADES
        </button>
        <button
          className={`button-style ${selectedTable === 'signals' ? 'selected' : ''}`}
          onClick={() => setSelectedTable('signals')}
          >SIGNALS
        </button>
      </div>
      <div className="table-container"> {/* Container for the selected table */}
        {renderTable()}
      </div>
    </div>
  );
}

export default TablesCollection;
