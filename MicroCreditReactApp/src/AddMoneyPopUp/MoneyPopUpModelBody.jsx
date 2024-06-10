import { Modal, Button, Form } from "react-bootstrap";
import React from "react";

function MoneyPopUpModelBody({
  DailyPaidAmount,
  AddMoneyFormData,
  handleMoneyFormDataChange,
}) {
  const handleNoOfDaysforMoneyChange = (e) => {
    const days = parseInt(e.target.value, 10);
    const totalPaidAmount = days * DailyPaidAmount;
    handleMoneyFormDataChange("noOfDays", days);
    handleMoneyFormDataChange("totalPaidAmount", totalPaidAmount);
  };
  return (
    <div
      className="modal-body"
      style={{ maxHeight: "calc(100vh - 210px)", overflowY: "auto" }}
    >
      <Form>
        <Form.Group controlId="formBasicNoOfDays">
          <Form.Label>
            <strong>No Of Days</strong>
          </Form.Label>
          <Form.Control
            type="number"
            placeholder="Paid For No Of Days"
            value={AddMoneyFormData.noOfDays}
            onChange={handleNoOfDaysforMoneyChange}
          />
        </Form.Group>
        <Form.Group controlId="formBasicNGivenAmount">
          <Form.Label>
            <strong>Given Amount</strong>
          </Form.Label>
          <Form.Control
            type="number"
            value={AddMoneyFormData.totalPaidAmount}
            placeholder="Enter Given Amount"
            onChange={handleNoOfDaysforMoneyChange}
            readOnly
          />
        </Form.Group>
      </Form>
    </div>
  );
}

export default MoneyPopUpModelBody;
