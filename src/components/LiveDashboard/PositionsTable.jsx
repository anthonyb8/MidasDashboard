import React from 'react';
import './TableLayout.css';

const Positions = ({ positions }) => {
  // Check if data is available and is an object
  if (!positions || typeof positions.data !== 'object' || Object.keys(positions.data).length === 0) {
    return <div className="live-table-container">No positions available.</div>;
  }

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
            <tr className='live-table-row' >
              <td className='live-table-data'>{positions.data.ticker}</td>
              <td className='live-table-data'>{positions.data.action}</td>
              <td className='live-table-data'>{positions.data.quantity}</td>
              <td className='live-table-data'>${positions.data.avg_cost}</td>
              <td className='live-table-data'>${positions.data.total_cost}</td>
              <td className='live-table-data'>${positions.data.market_value}</td>
            </tr>
          </tbody>
        </table>
      </div>
  );
};

export default Positions;
