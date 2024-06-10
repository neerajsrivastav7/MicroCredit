import React from "react";
import "./Card.css"
import AddMoneyButton from "./AddMoneyButton";
const CardComponent = ({
  Amount,
  paidAmount,
  onView,
  EndDate,
  Name,
}) => {
  return (
    <div className="col-12 col-sm-8 col-md-6 col-lg-4 mb-4">
      <div className="card">
        <div className="card-header">{Name}</div>
        <div className="card-body">
          <p className="card-text" style={{ color: "red" }}>
            <strong>Next Paid Date:</strong> {EndDate}
          </p>
          <p className="card-text">
            <strong>Total Given Amount:</strong> {Amount}
          </p>
          <p className="card-text">
            <strong>Total Daily Paid Amount:</strong> {paidAmount}
          </p>
          <div className="button-group">
            <button className="btn btn-primary" onClick={onView}>
              View
            </button>
            <AddMoneyButton type = {"name"} Name={Name} onAddDailyPAmount={paidAmount}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardComponent;


