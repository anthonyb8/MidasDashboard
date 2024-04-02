import React, { useState } from 'react';
import { usePagination } from './hooks/usePagination';
import "./TableLayout.css";

/**
 * Displays trade data in a paginated table.
 * 
 * @param {{ trades_data: Array<{timestamp: string, trade_id: number, leg_id: number, symbol: string, quantity: number, price: number, cost: number, direction: string}> }} props - Component props.
 */
function TradeTable({ trades_data }) {
  const { currentItems, goToNextPage, goToPreviousPage, currentPage, totalPages } = usePagination(trades_data, 20);

  return (
    <div className="backtest-table-container">
      <table className='backtest-table'>
        <thead>
        <tr className='backtest-table-row'>
            <th className='backtest-table-header'>Timestamp</th>
            <th className='backtest-table-header'>Trade ID</th>
            <th className='backtest-table-header'>Leg ID</th>
            <th className='backtest-table-header'>Ticker</th>
            <th className='backtest-table-header'>Quantity</th>
            <th className='backtest-table-header'>Price</th>
            <th className='backtest-table-header'>Cost</th>
            <th className='backtest-table-header'>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((trade, index) => (
             <tr className='backtest-table-row' key={index}>
             <td className='backtest-table-data'>{trade.timestamp}</td>
             <td className='backtest-table-data'>{trade.trade_id}</td>
             <td className='backtest-table-data'>{trade.leg_id}</td>
             <td className='backtest-table-data'>{trade.ticker}</td>
             <td className='backtest-table-data'>{trade.quantity}</td>
             <td className='backtest-table-data'>{trade.price}</td>
             <td className='backtest-table-data'>{trade.cost}</td>
             <td className='backtest-table-data'>{trade.action}</td>
           </tr>

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

export default TradeTable;