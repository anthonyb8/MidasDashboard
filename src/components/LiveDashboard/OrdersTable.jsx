import React from 'react';
import './TableLayout.css';

const Orders = ({ orders }) => {

  if (!orders || typeof orders.data !== 'object' ) {
    return <div className="live-table-container">No orders available.</div>;
  }

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
              <tr className='live-table-row' >
                <td className='live-table-data'>{orders.data.symbol}</td>
                <td className='live-table-data'>{orders.data.action}</td>
                <td className='live-table-data'>{orders.data.status}</td>
                <td className='live-table-data'>{orders.data.filled}</td>
                <td className='live-table-data'>{orders.data.totalQty}</td>
              </tr>

          </tbody>
        </table>
      </div>
  );
};

export default Orders;
