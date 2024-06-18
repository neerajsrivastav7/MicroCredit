import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import MoneyPopFooter from "./MoneyPopUpFooter";
import MoneyPopUpHeader from "./MoneyPopUpHeader";
import MoneyPopUpModelBody from "./MoneyPopUpModelBody";
import { ConvertAddMoneyDataToJson } from "../Common/JsonConverter";
import {HandleAddMoney} from "../server/ServerPatch"
import { useNavigate } from "react-router-dom";

function AddMoneyModal({
  moneyType,
  Moneyshow,
  MoneyHandleClose,
  Name,
  DailyPaidAmount,
  userName,
}) {
  const initialFormData = {
    noOfDays: 1,
    totalPaidAmount: DailyPaidAmount,
  };

  const [MoneyMessage, setMoneyMessage] = useState("");
  const [AddMoneyFormData, setAddMoneyFormData] = useState(initialFormData);
  const [MoneyType, setMoneyType] = useState(moneyType);
  const navigate = useNavigate();
  useEffect(() => {
    // Reset form data when modal is shown
    if (Moneyshow) {
      setAddMoneyFormData({
        noOfDays: 1,
        totalPaidAmount: DailyPaidAmount,
      });
    }
  }, [Moneyshow, DailyPaidAmount]);

  const handleMoneyFormDataChange = (field, value) => {
    setAddMoneyFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleSubmitMoney = async (e) => {
    e.preventDefault();
    var JsonData = ConvertAddMoneyDataToJson(
      MoneyType,
      Name,
      userName,
      AddMoneyFormData.noOfDays,
      AddMoneyFormData.totalPaidAmount
    );
    console.log(JsonData);
    try {
      const response = await HandleAddMoney(e, JsonData);
      console.log(response)
      if (response.status === 201) {
        window.location.reload();
      } else {
        setFormData(initialFormData);
        setMoneyMessage("Name can not be blank");
      }
    } catch (error) {
      setAddMoneyFormData(initialFormData);
      setMoneyMessage("Name can not be blank");
    }
  };

  const handleCloseAndResetForAddMoney = () => {
    setAddMoneyFormData(initialFormData);
    setMoneyMessage("");
    MoneyHandleClose();
  };

  return (
    <div
      className={`modal fade ${Moneyshow ? "show" : ""}`}
      id="AddMoneyPopUp"
      data-backdrop="static"
      data-keyboard="false"
      tabIndex="-1"
      aria-labelledby="AddMoneyPopUpLavel"
      aria-hidden={!Moneyshow}
      style={{ display: Moneyshow ? "block" : "none" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <MoneyPopUpHeader
            AddMoney="Add Money"
            Name={Name}
            MoneyMessage={MoneyMessage}
            handleCloseAndResetForAddMoney={handleCloseAndResetForAddMoney}
          />
          <Form onSubmit={handleSubmitMoney}>
            <MoneyPopUpModelBody
              DailyPaidAmount={DailyPaidAmount}
              AddMoneyFormData={AddMoneyFormData}
              handleMoneyFormDataChange={handleMoneyFormDataChange}
            />
            <MoneyPopFooter
              handleCloseForMoney={MoneyHandleClose}
              handleCloseAndResetForAddMoney={handleCloseAndResetForAddMoney}
              handleSaveForMoney={handleSubmitMoney}
            />
          </Form>
        </div>
      </div>
    </div>
  );
}

export default AddMoneyModal;
