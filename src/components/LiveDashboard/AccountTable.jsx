import React from 'react';
import "./AccountTable.css";

/**
 * Transforms overview data for tabular presentation.
 * @param {Array} overviewData - The overview data to be transformed.
 * @returns {Array} An array of objects representing the transformed data.
 */
function transformOverviewData(overviewData) {
  const transformedData = [];
  const keys = Object.keys(overviewData);

  // Iterate over the keys in pairs
  for (let i = 0; i < keys.length; i += 2) {
    const key1 = keys[i];
    const value1 = overviewData[key1];
    const key2 = keys[i + 1] || '';
    const value2 = key2 ? overviewData[key2] : '';

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


const Account = ({ data }) => {
  const transformedData = transformOverviewData(data); 

  return (
    <div className="account-container">
      <h2 className="account-title">Account</h2>
      <table className="account-table">
        <thead>
          <tr className='account-table-row'>
          <th className='account-table-header' scope="col">Metric</th>
          <th className='account-table-header' scope="col">Value</th>
          <th className='account-table-header' scope="col">Metric</th>
          <th className='account-table-header' scope="col">Value</th>
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
}

export default Account;