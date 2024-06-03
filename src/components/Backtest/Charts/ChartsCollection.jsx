import React, { useState } from 'react';
import "./ChartsCollection.css";
import LineChart from './LineChart';
import SignalChart from './SignalChart';
import ReturnChart from './ReturnChart';

function ChartsCollection({ period_timeseries_stats, daily_timeseries_stats, bm_timeseries_stats, price_data, signals_data }) {
  const [selectedChart, setSelectedChart] = useState('Equity');
  const [timeFrame, setTimeFrame] = useState('Daily'); // Added state for time frame selection

  // Mapping functions to generate chart data arrays
  const mapData = (data, key) => data.map(item => ({ time: item.timestamp, value: item[key] }));

  // Daily
  const dailyEquityArray = mapData(daily_timeseries_stats, 'equity_value');
  const dailyReturnArray = mapData(daily_timeseries_stats, 'period_return');
  const dailyCumReturnArray = mapData(daily_timeseries_stats, 'cumulative_return');
  const dailyDrawdownArray = mapData(daily_timeseries_stats, 'percent_drawdown');
  
  // Period
  const periodEquityArray = mapData(period_timeseries_stats, 'equity_value');
  const periodReturnArray = mapData(period_timeseries_stats, 'period_return');
  const periodCumReturnArray = mapData(period_timeseries_stats, 'cumulative_return');
  const periodDrawdownArray = mapData(period_timeseries_stats, 'percent_drawdown');

  // Benchmark
  const benchmarkArray = bm_timeseries_stats.map(item => ({ time: item.timestamp, value: item.daily_benchmark_return }));

  // Function to decide which data array to use based on the selected time frame
  const getChartData = (dailyArray, periodArray) => timeFrame === 'Daily' ? dailyArray : periodArray;
  
  const chartsData = {
    'Equity': <LineChart data={getChartData(dailyEquityArray, periodEquityArray)} />,
    'Return': <LineChart data={getChartData(dailyReturnArray, periodReturnArray)} />,
    'Drawdown': <LineChart data={getChartData(dailyDrawdownArray, periodDrawdownArray)} />,
    'Signal': <SignalChart price_data={price_data} signals_data={signals_data} />,
    'Returns_v_Benchmark': <ReturnChart strategy_data={dailyReturnArray} benchmark_data={benchmarkArray} />
    
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
        <select className="timeframe-dropdown-menu" onChange={(e) => setTimeFrame(e.target.value)} value={timeFrame}>
          <option value="Daily">Daily</option>
          <option value="Period">Period</option>
        </select>
      </div>
      <div className="chart-container">
        {chartsData[selectedChart]}
      </div>
    </div>
  );
}

export default ChartsCollection;