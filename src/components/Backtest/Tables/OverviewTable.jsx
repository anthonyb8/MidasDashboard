import React from 'react';
import './OverviewTable.css'; 

/**
 * Determines the format for display based on the key or value.
 * @param {string} key - The key indicating the type of the data.
 * @param {number} value - The raw value from the data.
 * @returns {string} The formatted value.
 */
function formatValue(key, value) {
  if (key.toLowerCase().includes("factor") || key.toLowerCase().includes("ratio") || key.toLowerCase().includes("number") || key.toLowerCase().includes("total_trades") ){
    return value.toFixed(2).toString(); // Default to raw number or string
  } else if (key.toLowerCase().includes("rate") || key.toLowerCase().includes("percent") || key.toLowerCase().includes("return")) {
    return `${(value * 100).toFixed(2)}%`; // Convert to percentage
  } else {
    return `$${value.toFixed(2).toLocaleString()}`; // Format as dollar amount
  }
}

/**
 * Transforms overview data for tabular presentation.
 * @param {Array} overviewData - The overview data to be transformed.
 * @returns {Array} An array of objects representing the transformed data.
 */
function transformOverviewData(overviewData) {
  const transformedData = [];
  const keys = Object.keys(overviewData[0]);

  // Iterate over the keys in pairs
  for (let i = 0; i < keys.length; i += 2) {
    const key1 = keys[i];
    const value1 = formatValue(key1, overviewData[0][key1]);
    const key2 = keys[i + 1] || '';
    const value2 = key2 ? formatValue(key2, overviewData[0][key2]) : '';

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
 * Renders an overview table with transformed data.
 * @param {Object} props - Component props.
 * @param {Array} props.overview_data - The overview data to display in the table.
 */
function OverviewTable({ overview_data }) {
  const data = transformOverviewData(overview_data);

  return (
    <div className="overview-table-container">
      <h1 className="overview-table-header">OVERVIEW</h1>
      <table className='overview-table'>
        <tbody>
          {data.map((row, index) => (
            <tr className='overview-table-row' key={index}>
              <td className='overview-table-data'>{row.key1}</td>
              <td className='overview-table-data'>{row.value1}</td>
              <td className='overview-table-data'>{row.key2}</td>
              <td className='overview-table-data'>{row.value2}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OverviewTable;
