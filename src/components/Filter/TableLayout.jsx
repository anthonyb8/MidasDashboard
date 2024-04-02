import './TableLayout.css';
import React, { useState, useMemo, useEffect } from 'react';

/**
 * TableLayout displays a summary of backtest strategies with the ability
 * to view more details for each strategy.
 * 
 * @param {Object} props The component props.
 * @param {Object[]} props.strategy Array of strategy summaries.
 * @param {Function} props.onBacktestViewClick Callback for click events on "View" buttons.
 * @returns {React.ReactElement} Rendered component.
 */
function TableLayout({ strategy, onBacktestViewClick }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    setCurrentPage(1);
  }, [strategy]);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return strategy.slice(start, end);
  }, [currentPage, strategy]);

  // Function to handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (!strategy || strategy.length === 0) {
    return <div className="no-data">No data available for this strategy.</div>;
  }

  // Calculate the total number of pages
  const totalPages = Math.ceil(strategy.length / itemsPerPage);

  return (
    <div className="filter-table-container">
      <table className='filter-table'>
        <thead>
          <tr className='filter-table-row'>
            <th className='filter-table-header'>CREATED</th>
            <th className='filter-table-header'>SYMBOLS</th>
            <th className='filter-table-header'>CAPITAL</th>
            <th className='filter-table-header'>START</th>
            <th className='filter-table-header'>END</th>
            <th className='filter-table-header'>Action</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map(summary => (
            <tr  className='filter-table-row' key={summary.id}>
              <td className='filter-table-data'>{summary.created_at}</td>
              <td className='filter-table-data'>{summary.tickers.join(' | ')}</td>
              <td className='filter-table-data'>{summary.capital}</td>
              <td className='filter-table-data'>{summary.start_date}</td>
              <td className='filter-table-data'>{summary.end_date}</td>
              <td className='filter-table-data'>
                <button className="view-button" onClick={() => onBacktestViewClick(summary.id)}>View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>&lt;</button>
        <button disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)}>&gt;</button>
      </div>
    </div>
  );
}

export default TableLayout;
