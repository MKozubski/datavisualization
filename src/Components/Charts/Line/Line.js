import React from 'react';
import PropTypes from 'prop-types';
import data from "./CTD_Data_Cambridge_Bay_2013_08_11.csv";
function DataVisualization() {
  const headers = data.slice(0, data.indexOf('\n')).split(',');
  const rows = data.slice(data.indexOf('\n') + 1).split('\n');
  const tableData = rows.map(row => {
    const values = row.split(',');
    return headers.reduce((obj, header, index) => {
      obj[header] = values[index];
      return obj;
    }, {});
  });

  return (
    <table>
      <thead>
        <tr>
          {headers.map(header => (
            <th key={header}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {tableData.map((row, index) => (
          <tr key={index}>
            {headers.map(header => (
              <td key={header}>{row[header]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

DataVisualization.propTypes = {
  data: PropTypes.string.isRequired,
};

export default DataVisualization;
