import React from 'react';
import './Dashboard.css';
import ParametersBar from './ParametersBar';
import ChartsCollection from './ChartsCollection';
import TablesCollection from './TablesCollection';
import { useDashboard } from './hooks/useDashboard';


/**
 * Dashboard component displaying the selected backtest's details including parameters,
 * charts, and tables of data. Allows users to select different backtests to view.
 */
const Dashboard = () => {
  const { loading, backtestsCache, currentBacktestId, handleTabClick, removeBacktest } = useDashboard();

  return (
    <div className="dashboard-container">
      {loading ? (
        <p>Loading...</p>
        ) : !currentBacktestId ? (
          <p>Please select a backtest to view its details.</p>
          ) : (
            backtestsCache[currentBacktestId] ? (
              <>
            <div className="tabs">
              {Object.keys(backtestsCache).map((id) => (
                <div
                  key={id}
                  className={`tab ${+currentBacktestId === +id ? 'tab-active' : ''}`}
                  onClick={() => handleTabClick(id)}
                  >Backtest {id}
                  <button
                    className="tab-button"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent click from affecting the tab itself
                      removeBacktest(id);
                    }}
                    >x
                  </button>
                </div>
              ))}
            </div>
            <div className="content-area">
              <h1 className="content-title">{backtestsCache[currentBacktestId].parameters.strategy_name}</h1>
              <ParametersBar parameters={backtestsCache[currentBacktestId].parameters}/>
              <ChartsCollection timeseries_stats={backtestsCache[currentBacktestId].timeseriesData} price_data={backtestsCache[currentBacktestId].priceData} signal_data={backtestsCache[currentBacktestId].signalData}/> {/* price_data={backtestData.price_data} signals_data={backtestData.signals}/>*/}
              <TablesCollection overview_data={backtestsCache[currentBacktestId].static_stats} trades_data ={backtestsCache[currentBacktestId].trades} signals_data={backtestsCache[currentBacktestId].signalData}/>
            </div>
          </>
        ) : (
          <p>No data available for this backtest.</p>
          )
          )}
    </div>
  );
};

export default Dashboard;

