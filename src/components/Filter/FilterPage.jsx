import log from 'loglevel';
import "./FilterPage.css"
import React  from 'react';
import TableLayout from './TableLayout';
import { useFilterView } from './hooks/useFilterView';

/**
 * A component that renders a view for filtering backtest summaries by strategy.
 * It displays a dynamic list of strategy names as buttons. Clicking a button selects a strategy
 * and displays a table layout of backtest summaries for that strategy.
 * 
 * Utilizes the `useFilterView` hook for fetching and managing the state of backtest summaries,
 * including loading state, grouped summaries by strategy, and the currently selected strategy.
 * 
 * @returns {React.ReactElement} The FilterView component.
 */
function FitlerView() {
  const { isLoading, groupedSummaries, selectedStrategyName, setSelectedStrategyName, handleBacktestViewClick } = useFilterView();

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="filter-view">
      <div className="strategy-buttons">
        {Object.keys(groupedSummaries).map(strategyName => (
          <button
            key={strategyName}
            className={`button-style ${selectedStrategyName === strategyName ? 'selected' : ''}`}
            onClick={() => setSelectedStrategyName(strategyName)} 
            >{strategyName.toUpperCase()}
          </button>
        ))}
      </div>
      <div className="table-container">
        {selectedStrategyName && <TableLayout strategy={groupedSummaries[selectedStrategyName]} onBacktestViewClick={handleBacktestViewClick} />}
      </div>
    </div>
  );
}

export default FitlerView;

