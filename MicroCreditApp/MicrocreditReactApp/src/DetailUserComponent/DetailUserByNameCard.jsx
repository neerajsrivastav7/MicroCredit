import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HandleGetDetailByName } from "../server/ServerGet";
import UserDetailCardByName from "../DetailUserComponent/UserDetailCardByName";
import "./Heading.css";

function DetailUserByNameCard({ UserName }) {
  const [cardsData, setCardsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await HandleGetDetailByName(UserName);
        setCardsData(data);
        if (data.length === 0) {
          navigate("/microcredit/userDetail");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [UserName, navigate]);

  const handleViewClick = (name, subName) => {
    navigate(`/microcredit/userDetail/subName/${name}/${subName}`);
  };

  const handleAddMoney = (Name) => {
    console.log(Name);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;
  if (cardsData.length === 0) {
    return <div>No data available</div>; // This will never be reached due to navigation
  }

  return (
    <div className="container mt-5" Cardheading>
      <div className="row">
        {cardsData.map((data, index) => (
          <UserDetailCardByName
            key={index}
            Name={data.name}
            subName={data.sub_name}
            noOfDays={data.no_of_days}
            amount={data.amount}
            startDate={data.start_date}
            noOfRemainingDay={data.no_of_remaining_day}
            dailyPaidAmount={data.daily_paid_amount}
            currentEndDate={data.current_end_date}
            settlementAmount={data.settlement_amount}
            onView={() => handleViewClick(data.name, data.sub_name)}
            onAddMoney={() => handleAddMoney(data.name)}
          />
        ))}
      </div>
    </div>
  );
}

export default DetailUserByNameCard;
