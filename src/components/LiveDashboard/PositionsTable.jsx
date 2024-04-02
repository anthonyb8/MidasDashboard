import React from 'react';
import './TableLayout.css';

const Positions = ({ data }) => {
  // Convert the object of objects into an array of objects for easy mapping
  const positionsArray = Object.entries(data).map(([ticker, details]) => ({
    ticker,
    ...details
  }));

  return (
    <div className="live-table-container">
      <h2 className="live-table-title">Positions</h2>
        <table className="live-table-container">
          <thead>
            <tr className='live-table-row'>
              <th className='live-table-header'>Ticker</th>
              <th className='live-table-header'>Action</th>
              <th className='live-table-header'>Quantity</th>
              <th className='live-table-header'>Average Cost</th>
              <th className='live-table-header'>Total Cost</th>
              <th className='live-table-header'>Market Value</th>
            </tr>
          </thead>
          <tbody>
            {positionsArray.map((position, index) => (
              <tr className='live-table-row' key={index}>
                <td className='live-table-data'>{position.ticker}</td>
                <td className='live-table-data'>{position.action}</td>
                <td className='live-table-data'>{position.quantity.toLocaleString()}</td>
                <td className='live-table-data'>${position.avg_cost.toLocaleString()}</td>
                <td className='live-table-data'>${position.total_cost.toLocaleString()}</td>
                <td className='live-table-data'>${position.market_value.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  );
};

export default Positions;
