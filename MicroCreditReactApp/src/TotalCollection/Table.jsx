import React, { useEffect, useState } from "react";
import "./TotalCollectionTable.css";
import { GetTotalCollection } from "../server/ServerGet";

function Table() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await GetTotalCollection();
        console.log(result)
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="container mt-5">
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead className="thead-dark">
            <tr>
              <th className="highlight">Name</th>
              <th>Total Daily Collection (Actual)</th>
              <th>Total Daily Collection (Paid)</th>
              <th className="highlight">Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                <td className="highlight">{row.name}</td>
                <td>{row.actual}</td>
                <td>{row.paid}</td>
                <td
                  className={`highlight ${
                    row.actual === row.paid ? "status-true" : "status-false"
                  }`}
                >
                  {row.actual === row.paid ? "✓" : "✗"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Table;
