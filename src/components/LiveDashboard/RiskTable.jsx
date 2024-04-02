import './TableLayout.css';
import React, { useState, useEffect } from 'react';

const RiskTable = () => {
  const [positions, setPositions] = useState([]);

  useEffect(() => {
    // Mock fetching data
    const fetchedPositions = [
      { ticker: 'AAPL', action: 'BUY', quantity: 10, avg_cost: 150 },
      // Add more positions as needed
    ];
    setPositions(fetchedPositions);
  }, []);

  return (
    <div className="live-table-container">
      <h2 className="live-table-title">Risk</h2>
        <table className="live-table-container">
          <thead>
            <tr className='live-table-row'>
              <th className='live-table-header'>Ticker</th>
              <th className='live-table-header'>Action</th>
              <th className='live-table-header'>Quantity</th>
              <th className='live-table-header'>Average Cost</th>
            </tr>
          </thead>
          <tbody>
            {positions.map((position, index) => (
              <tr className='live-table-row' key={index}>
                <td className='live-table-data'>{position.ticker}</td>
                <td className='live-table-data'>{position.action}</td>
                <td className='live-table-data'>{position.quantity}</td>
                <td className='live-table-data'>${position.avg_cost}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  );
};

export default RiskTable;