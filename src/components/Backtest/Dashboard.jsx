// backtest/Dashboard.jsx
import React from 'react';
import "./Dashboard.css";
import FilterBar from './FilterBar/FilterBar';
import { useBacktest } from './Hooks/useBacktest';
import OverviewTable from './Tables/OverviewTable';
import ParametersBar from './Tables/ParametersTable';
import RegressionTable from './Tables/RegressionTable';
import ChartsCollection from './Charts/ChartsCollection';
import TablesCollection from './Tables/TablesCollection';

const BacktestDashboard = () => {
    const { isLoading, backtestsCache, currentBacktestId, groupedSummaries, updateBacktestId} = useBacktest();
    
    return (
        <div className="backtest-dashboard-container">
            <div key="backtest-dashbaord-filterBar">
                <FilterBar groupedSummaries={groupedSummaries} updateBacktestId={updateBacktestId} />
            </div>
            {isLoading ? ( <div>Loading...</div>) : 
            (!currentBacktestId || !backtestsCache[currentBacktestId]) ? ( <div>Select a backtest to view details.</div>) : 
            (
            <div className="backtest-dashboard-grid">
                <div className="grid-item parameters"style={{ gridArea: 'parameters' }}>
                    <ParametersBar parameters={backtestsCache[currentBacktestId]?.parameters} />
                </div>
                <div className="grid-item overview"style={{ gridArea: 'overview' }}>
                    <OverviewTable overview_data={backtestsCache[currentBacktestId]?.static_stats} />
                </div>
                <div className="grid-item regression"style={{ gridArea: 'regression' }}>
                    <RegressionTable data={backtestsCache[currentBacktestId]?.regression_stats} />
                </div>
                <div className="grid-item charts"style={{ gridArea: 'charts' }}>
                    <ChartsCollection timeseries_stats={backtestsCache[currentBacktestId]?.timeseriesData}  price_data={backtestsCache[currentBacktestId]?.priceData} signals_data={backtestsCache[currentBacktestId]?.signalData} />
                </div>
                <div className="grid-item tables"style={{ gridArea: 'tables' }}>
                    <TablesCollection trades_data={backtestsCache[currentBacktestId]?.tradeData} signals_data={backtestsCache[currentBacktestId]?.signalData} />
                </div>
            </div>
            )
            }
        </div>
    );
};

export default BacktestDashboard;

