import React from "react";
import "./Card.css";
import AddMoneyButton from "../Card/AddMoneyButton";
import DeleteButton from "../Common/DeleteButton";
const UserDetailCardByName = ({
  Name,
  subName,
  noOfDays,
  amount,
  startDate,
  noOfRemainingDay,
  dailyPaidAmount,
  currentEndDate,
  settlementAmount,
  onView,
}) => {
  return (
    <div className="col-12 col-sm-8 col-md-6 col-lg-4 mb-4">
      <div className="card cardByName">
        <div className="card-header cardHeaderByName">{subName}</div>
        <div className="card-body cardBodyByName">
          <p className="card-text" style={{ color: "red" }}>
            <strong>Next Paid Date:</strong> {currentEndDate}
          </p>
          <p className="card-text">
            <strong>No of Remaining Days:</strong> {noOfRemainingDay}
          </p>
          <p className="card-text">
            <strong>Daily Paid Amount:</strong> {dailyPaidAmount}
          </p>
          <p className="card-text">
            <strong>Settlement Amount:</strong> {settlementAmount}
          </p>
          <p className="card-text">
            <strong>Start Date:</strong> {startDate}
          </p>
          <p className="card-text">
            <strong>Current End Date:</strong> {currentEndDate}
          </p>
          <p className="card-text">
            <strong>No of Days:</strong> {noOfDays}
          </p>
          <p className="card-text">
            <strong>Amount:</strong> {amount}
          </p>
          <div className="button-group">
            <button className="btn btn-primary" onClick={onView}>
              View
            </button>
            <AddMoneyButton
              type="subName"
              Name={subName}
              onAddDailyPAmount={dailyPaidAmount}
              userName={Name}
            />
            <DeleteButton subName={subName} />
            {/* <button className="btn btn-danger" subName={subName}>
              Delete User
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailCardByName;

