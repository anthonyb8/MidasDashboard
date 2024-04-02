import React, { useState } from 'react';
import LineChart from './LineChart';
import SignalChart from './SignalChart';
import "./ChartsCollection.css";

function ChartsCollection({ timeseries_stats, price_data, signal_data }) {
  const [selectedChart, setSelectedChart] = useState('Equity');

  // Construct individual arrays
  const equityArray = timeseries_stats.map(item => ({ time: item.timestamp, value: item.equity_value }));
  const dailyReturnArray = timeseries_stats.map(item => ({ time: item.timestamp, value: item.daily_return }));
  const cumReturnArray = timeseries_stats.map(item => ({ time: item.timestamp, value: item.cumulative_return }));
  const drawdownArray = timeseries_stats.map(item => ({ time: item.timestamp, value: item.percent_drawdown }));

  const chartsData = {
    'Equity': <LineChart data={equityArray} />,
    'Return': <LineChart data={dailyReturnArray} />,
    'Drawdown': <LineChart data={drawdownArray} />,
    'Signal': <SignalChart price_data={price_data} signals_data={signal_data} />
  };

  return (
    <div className="chart-collection-container">
      <div className="chart-title-and-selector">
        <select className="dropdown-menu" onChange={(e) => setSelectedChart(e.target.value)} value={selectedChart}>
          <option value="Equity">EQUITY</option>
          <option value="Return">RETURN</option>
          <option value="Drawdown">DRAWDOWN</option>
          <option value="Signal">SIGNAL</option>
        </select>
      </div>
      <div className="chart-container">
        {chartsData[selectedChart]}
      </div>
    </div>
  );
}

export default ChartsCollection;
