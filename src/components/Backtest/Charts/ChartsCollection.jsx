import React, { useState } from 'react';
import "./ChartsCollection.css";
import LineChart from './LineChart';
import SignalChart from './SignalChart';
import ReturnChart from './ReturnChart';

function ChartsCollection({ timeseries_stats, price_data, signals_data }) {
  const [selectedChart, setSelectedChart] = useState('Equity');

  const equityArray = timeseries_stats.map(item => ({ time: item.timestamp, value: item.equity_value }));
  const periodReturnArray = timeseries_stats.map(item => ({ time: item.timestamp, value: item.period_return }));
  const cumReturnArray = timeseries_stats.map(item => ({ time: item.timestamp, value: item.cumulative_return }));
  const drawdownArray = timeseries_stats.map(item => ({ time: item.timestamp, value: item.percent_drawdown }));
  const benchmarkArray = timeseries_stats.map(item => ({ time: item.timestamp, value: item.daily_benchmark_return }));
  const dailyStrategyArray = timeseries_stats.map(item => ({ time: item.timestamp, value: item.daily_strategy_return }));

  const chartsData = {
    'Equity': <LineChart data={equityArray} />,
    'Return': <LineChart data={periodReturnArray} />,
    'Drawdown': <LineChart data={drawdownArray} />,
    'Signal': <SignalChart price_data={price_data} signals_data={signals_data} />,
    'Returns_v_Benchmark': <ReturnChart strategy_data={dailyStrategyArray} benchmark_data={benchmarkArray} />
  };

  return (
    <div className="chart-collection-container">
      <div className="chart-selector">
        <select className="chart-collection-dropdown-menu" onChange={(e) => setSelectedChart(e.target.value)} value={selectedChart}>
          <option value="Equity">Equity</option>
          <option value="Return">Return</option>
          <option value="Returns_v_Benchmark">Benchmark</option>
          <option value="Drawdown">Drawdown</option>
          <option value="Signal">Signal</option>
        </select>
      </div>
      <div className="chart-container">
        {chartsData[selectedChart]}
      </div>
    </div>
  );
}

export default ChartsCollection;
