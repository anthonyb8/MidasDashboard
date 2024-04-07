import React, { useState } from 'react';
import LineChart from './LineChart';
import SignalChart from './SignalChart';
import ReturnChart from './ReturnChart';
import "./ChartsCollection.css";
import { PiCompassLight } from 'react-icons/pi';

function ChartsCollection({ timeseries_stats, price_data, signal_data }) {
  const [selectedChart, setSelectedChart] = useState('Equity');

  // Construct individual arrays
  const equityArray = timeseries_stats.map(item => ({ time: item.timestamp, value: item.equity_value }));
  const periodReturnArray = timeseries_stats.map(item => ({ time: item.timestamp, value: item.period_return }));
  const cumReturnArray = timeseries_stats.map(item => ({ time: item.timestamp, value: item.cumulative_return }));
  const drawdownArray = timeseries_stats.map(item => ({ time: item.timestamp, value: item.percent_drawdown }));
  const benchmarkArray = timeseries_stats.map(item => ({ time: item.timestamp, value: item.daily_benchmark_return }));
  const dailyStrategyArray = timeseries_stats.map(item => ({ time: item.timestamp, value: item.daily_strategy_return }));
  console.log(benchmarkArray);

  const chartsData = {
    'Equity': <LineChart data={equityArray} />,
    'Return': <LineChart data={periodReturnArray} />,
    'Drawdown': <LineChart data={drawdownArray} />,
    'Signal': <SignalChart price_data={price_data} signals_data={signal_data} />,
    'Returns_v_Benchmark': <ReturnChart strategy_data={dailyStrategyArray} benchmark_data={benchmarkArray} />
  };

  return (
    <div className="chart-collection-container">
      <div className="chart-title-and-selector">
        <select className="dropdown-menu" onChange={(e) => setSelectedChart(e.target.value)} value={selectedChart}>
          <option value="Equity">EQUITY</option>
          <option value="Return">RETURN</option>
          <option value="Returns_v_Benchmark">Returns v Benchmark</option>
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
