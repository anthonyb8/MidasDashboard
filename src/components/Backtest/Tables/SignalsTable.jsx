import React from 'react';
import "./TableLayout.css";
import { usePagination } from '../Hooks/usePagination';

/**
 * Displays signal data in a paginated table.
 * 
 * @param {{ signals_data: Array<{timestamp: string, trade_instructions: Array<{leg_id: number, ticker: string, direction: string, allocation_percent: number}>}> }} props - Component props.
 */
function SignalsTable({ signals_data }) {
  const { currentItems, goToNextPage, goToPreviousPage, currentPage, totalPages } = usePagination(signals_data, 20);

  return (
    <div className="backtest-table-container">
      <table className='backtest-table'>
        <thead>
          <tr className='backtest-table-row'>
            <th className='timestamp-column-header'>Timestamp</th>
            <th className='backtest-table-header'>Leg ID</th>
            <th className='backtest-table-header'>Symbol</th>
            <th className='backtest-table-header'>Direction</th>
            <th className='backtest-table-header'>Trade Allocation</th>
          </tr>
        </thead>
        <tbody>
        {currentItems.map((trade, index) => (
          <React.Fragment key={index}>
            {trade.trade_instructions.map((instruction, idx) => (
              <tr className='backtest-table-row' key={idx}>
                {idx === 0 && (
                  <td className='timestamp-column-data' rowSpan={trade.trade_instructions.length}>
                    {trade.iso_timestamp}
                  </td>
                )}
                <td className='backtest-table-data'>{instruction.leg_id}</td>
                <td className='backtest-table-data'>{instruction.ticker}</td>
                <td className='backtest-table-data'>{instruction.action}</td>
                <td className='backtest-table-data'>{instruction.weight}</td>
              </tr>
            ))}
          </React.Fragment>
        ))}

        </tbody>
      </table>
      <div className="pagination">
        <button onClick={goToPreviousPage} disabled={currentPage === 1}>&lt;</button>
        <button onClick={goToNextPage} disabled={currentPage === totalPages}>&gt;</button>
      </div>
    </div>
  );
  
}
export default SignalsTable;
