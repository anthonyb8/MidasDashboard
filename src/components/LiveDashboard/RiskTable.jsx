import './TableLayout.css';
import React, { useState, useEffect } from 'react';


/**
 * Transforms overview data for tabular presentation.
 * @param {Array} data - The overview data to be transformed.
 * @returns {Array} An array of objects representing the transformed data.
 */
function transformData(data) {
  if (!data || typeof data !== 'object') {
    return [];
  }
  const transformedData = [];
  const keys = Object.keys(data);

  // Iterate over the keys in pairs
  for (let i = 0; i < keys.length; i += 2) {
    const key1 = keys[i];
    const value1 = data[key1];
    const key2 = keys[i + 1] || '';
    const value2 = key2 ? data[key2] : '';

    const row = {
      key1: key1, // Add space before capital letters
      value1: value1,
      key2: key2, // Add space before capital letters
      value2: value2
    };
    transformedData.push(row);
  }

  return transformedData;
}

const RiskTable = ({ risk }) => {

  if (!risk || typeof risk.data !== 'object' ) {
    return <div className="live-table-container">Risk Not available.</div>;
  }
  const transformedData = transformData(risk.data); 

  return (
    <div className="live-table-container">
      <h2 className="live-table-title">Risk</h2>
        <table className="live-table-container">
          <thead>
            <tr className='live-table-row'>
              <th className='live-table-header' scope="col">Metric</th>
              <th className='live-table-header' scope="col">Value</th>
              <th className='live-table-header' scope="col">Metric</th>
              <th className='live-table-header' scope="col">Value</th>
            </tr>
          </thead>
          <tbody>
            {transformedData.map((row, index) => (
              <tr className='account-table-row' key={index}>
                <td className='account-table-data'>{row.key1.replace(/_/g, " ")}</td>
                <td className='account-table-data'>{row.value1}</td>
                <td className='account-table-data'>{row.key2.replace(/_/g, " ")}</td>
                <td className='account-table-data'>{row.value2}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  );
};

export default RiskTable;