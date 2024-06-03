import React from 'react';
import './RegressionTable.css'; 

/**
 * Determines the format for display based on the key or value.
 * @param {string} key - The key indicating the type of the data.
 * @param {number} value - The raw value from the data.
 * @returns {string} The formatted value.
 */
function formatValue(key, value) {
  // Lists defining the format based on key contents
  const percentageKeys = ["rate", "percent", "return", "drawdown", "volatility", "standard_deviation", "contribution"];
  const numberKeys = ["factor","r_squared", "ratio", "number", "p_value", "alpha", "beta", "sharpe", "sortino"];
  const dollarKeys = ["profit", "loss", "fees", "equity", "dollar", "portfolio", "hedge"];

  key = key.toLowerCase(); // Normalize key to lower case for comparison

  // Determine format based on the key
  if (percentageKeys.some(part => key.includes(part))) {
    return `${(value * 100).toFixed(2)}%`; // Convert to percentage
  } else if (dollarKeys.some(part => key.includes(part))) {
    return `$${parseFloat(value).toFixed(2).toLocaleString()}`; // Format as dollar amount
  } else if (numberKeys.some(part => key.includes(part))) {
      return parseFloat(value).toFixed(2); // Round and convert to string
  } else {
    return value.toString(); // Default case if no specific format is matched
  }
}

/**
 * Transforms overview data for tabular presentation.
 * @param {Array} overviewData - The overview data to be transformed.
 * @returns {Array} An array of objects representing the transformed data.
 */
function transformData(overviewData) {
  const transformedData = [];
  const keys = Object.keys(overviewData);

  // Iterate over the keys in pairs
  for (let i = 0; i < keys.length; i += 2) {
    const key1 = keys[i];
    const value1 = formatValue(key1, overviewData[key1]);
    const key2 = keys[i + 1] || '';
    const value2 = key2 ? formatValue(key2, overviewData[key2]) : '';

    const row = {
      key1: key1.replace(/_/g, ' '),
      value1: value1,
      key2: key2.replace(/_/g, ' '),
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
  console.log(data)
  const transformed_data = transformData(data);
  console.log(transformed_data);

  return (
    <div className="regression-table-container">
      <h1 className='regression-table-header'>RISK</h1>
      <table className='regression-table'>
        <tbody>
          {transformed_data.map((row, index) => (
            <tr className='regression-table-row' key={index}>
              <td className='regression-table-data'>{row.key1}</td>
              <td className='regression-table-data'>{row.value1}</td>
              <td className='regression-table-data'>{row.key2}</td>
              <td className='regression-table-data'>{row.value2}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RegressionTable;

