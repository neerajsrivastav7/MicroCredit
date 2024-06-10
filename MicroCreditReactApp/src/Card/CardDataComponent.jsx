import React, { useEffect, useState } from "react";
import CardComponent from "./CardComponent";
import { HandleGetDetail } from "../server/ServerGet";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
const CardDataComponent = () => {
  const [cardsData, setCardsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await HandleGetDetail();
        setCardsData(data);
        console.log(cardsData)
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleViewClick = (name) => {
    navigate(`/microcredit/userDetail/${name}`);
  };

  const handleAddMoney = (Name) => {
    console.log(Name);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;
  if (cardsData.length === 0) {
    return <div>No data available</div>;
  }
  return (
    <div className="container mt-5">
      <div className="row ">
        {cardsData.map((data, index) => (
          <CardComponent
            key={index}
            Name={data.name}
            Amount={data.totalGivenAmount}
            paidAmount={data.totalDailyPaidAmount}
            EndDate={data.nextPaidDate}
            onView={() => handleViewClick(data.name)}
            onAddName={data.name} // Correct prop for name  justify-content-center
            onAddDailyPAmount={data.totalDailyPaidAmount}
          />
        ))}
      </div>
    </div>
  );
};

export default CardDataComponent;





