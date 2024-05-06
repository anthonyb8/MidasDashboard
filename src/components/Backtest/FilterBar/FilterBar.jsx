import './FilterBar.css'; 
import React, { useState } from 'react';

function FilterBar({ groupedSummaries, updateBacktestId }) {
  const [visibleDropdown, setVisibleDropdown] = useState(null);

  return (
    <div className="backtest-filter-bar">
      {Object.keys(groupedSummaries).map(strategyName => (
        <div 
          key={strategyName} 
          className="strategy-dropdown"
          onMouseEnter={() => setVisibleDropdown(strategyName)}
          onMouseLeave={() => setVisibleDropdown(null)}
        >
          <button className="strategy-button">
            {strategyName}
          </button>
          {visibleDropdown === strategyName && (
            <div className="dropdown-content">
              {groupedSummaries[strategyName].map((backtest, index) => (
                <div
                  key={`${strategyName}-${index}`}
                  className="dropdown-item"
                  onClick={() => updateBacktestId(backtest.id)}
                >
                  {`Backtest ${index + 1}`}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default FilterBar;
