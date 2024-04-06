import React from 'react';
import './RegressionTable.css'; // Adjust the path as necessary


/**
 * Transforms data for tabular presentation.
 * @param {Array} data - The data to be transformed.
 * @returns {Array} An array of objects representing the transformed data.
 */
function transformData(data) {
  const transformedData = [];
  const keys = Object.keys(data[0]);

  // Iterate over the keys in pairs
  for (let i = 0; i < keys.length; i += 2) {
    const key1 = keys[i];
    const value1 = data[0][key1];
    const key2 = keys[i + 1] || '';
    const value2 = key2 ? data[0][key2] : '';

    const row = {
      key1: key1,
      value1: value1,
      key2: key2,
      value2: value2
    };
    transformedData.push(row);
  }

  return transformedData;
}

/**
 * Renders an Regression table with transformed data.
 * @param {Object} props - Component props.
 * @param {Array} props.data - The Regression data to display in the table.
 */
function RegressionTable({ data }) {
  const transformed_data = transformData(data);

  return (
    <div className="regression-table-container">
      <table className='regression-table'>
        <thead>
          <tr className='regression-table-row'>
            <th className='regression-table-header'>Metric</th>
            <th className='regression-table-header'>Value</th>
            <th className='regression-table-header'>Metric</th>
            <th className='regression-table-header'>Value</th>
          </tr>
        </thead>
        <tbody>
          {transformed_data.map((row, index) => (
            <tr className='regression-table-row' key={index}>
              <td className='regression-table-data-metric'>{row.key1.replace(/_/g, " ")}</td>
              <td className='regression-table-data-value'>{row.value1}</td>
              <td className='regression-table-data-metric'>{row.key2.replace(/_/g, " ")}</td>
              <td className='regression-table-data-value'>{row.value2}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


export default RegressionTable;

