import React, { useState, useEffect } from "react";
import { HandleGetDetailBySubName } from "../server/ServerGet";

function InfoBySubName({ name, subName }) {
  const [tableData, setTableData] = useState([]);
  const [userSubName, setUserSubName] = useState(subName);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await HandleGetDetailBySubName(userSubName);
        setTableData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userSubName]);

  const handleEdit = (key) => {
    // Handle the edit action for the specified key
    console.log(`Edit action for ${key}`);
  };

  const handleEditDataList = () => {
    // Call handleEdit function with the "DataList" key
    handleEdit("DataList");
  };

  const toCamelCase = (str) => {
    return str
      .replace(/[-_]+(.)?/g, (_, chr) => (chr ? chr.toUpperCase() : ""))
      .replace(/^\w/, (c) => c.toUpperCase());
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;
  if (tableData.length === 0) {
    return <div>No data available</div>;
  }

  return (
    <div className="table-responsive">
      <table className="table table-bordered table-striped">
        <thead className="thead-dark">
          <tr>
            <th scope="col">DataList</th>
            <th scope="col">Value</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(tableData[0]).map(([key, value]) => (
            <tr key={key}>
              <td>{toCamelCase(key)}</td>
              <td>{value}</td>
              <td>
                <button
                  className="btn btn-primary"
                  onClick={
                    key === "DataList"
                      ? handleEditDataList
                      : () => handleEdit(key)
                  }
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default InfoBySubName;
