import React from 'react';
import './TableLayout.css';

const Orders = ({ data }) => {
  // Convert nested objects into an array of order details objects
  const ordersArray = Object.values(data); // If you need the order ID, use Object.entries(data) and adjust mapping

  return (
    <div className="live-table-container">
      <h2 className="live-table-title">Orders</h2>
        <table className="live-table-container">
          <thead>
            <tr className='live-table-row'>
              <th className='live-table-header'>Order ID</th>
              <th className='live-table-header'>Symbol</th>
              <th className='live-table-header'>Action</th>
              <th className='live-table-header'>Filled</th>
              <th className='live-table-header'>Avg Fill Price</th>
              <th className='live-table-header'>Total Qty</th>
              <th className='live-table-header'>Status</th>
            </tr>
          </thead>
          <tbody>
            {ordersArray.map((order, index) => (
              <tr className='live-table-row' key={index}>
                <td className='live-table-data'>{order.symbol}</td>
                <td className='live-table-data'>{order.action}</td>
                <td className='live-table-data'>{order.filled}</td>
                <td className='live-table-data'>${order.avgFillPrice.toLocaleString()}</td>
                <td className='live-table-data'>{order.totalQty.toLocaleString()}</td>
                <td className='live-table-data'>{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  );
};

export default Orders;
