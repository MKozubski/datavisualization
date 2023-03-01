import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import data from "./CTD_Data_Cambridge_Bay_2013_08_11.csv";

function TableData() {
  const [csvData, setCsvData] = useState([]);
  const [rdrComment, setRdrComment] = useState("");
  const [rdrHeaders, setRdrHeaders] = useState([]);
  const [thirdLineData, setThirdLineData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(data);
        const csvString = await response.text();
        const results = Papa.parse(csvString);
        console.log(results.data);

        // Parse the RDR comment
        const commentLines = results.data.filter((line, index) => (index >= 0 && index <= 1) || (index >= 3 && index <= 4));

        const comment = commentLines.join("\n");
        setRdrComment(comment);

        // Parse the data from line 3
        setThirdLineData(results.data[2]);

        // Parse the RDR headers
        setRdrHeaders(results.data[5]);


        // Parse the RDR data
        setCsvData(results.data.slice(6));

        setIsLoading(false);



      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <p>Loading data...</p>;
  }

  return (
    <div>
            <div>
        <h3>RDR Comment:</h3>
        <p>{rdrComment}</p>
      </div>
      <h2>Logging Information</h2>
      <table>
        <tbody>
        <tr style={{fontWeight: "bold"}}>
            {thirdLineData.map((header, index) => (
              <th key={index} style={{fontWeight: "bold"}}>{header}</th>
            ))}
          </tr>
        </tbody>
      </table>
      <h2>RDR Data</h2>
      <table>
        <thead>
          <tr style={{fontWeight: "bold"}}>
            {rdrHeaders.map((header, index) => (
              <th key={index} style={{fontWeight: "bold"}}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {csvData.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td key={j}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TableData;
