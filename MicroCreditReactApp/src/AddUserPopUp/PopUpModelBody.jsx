import React from "react";
import { Form } from "react-bootstrap";
import "@fortawesome/fontawesome-free/css/all.min.css"; // Make sure this line is added in your main file

function PopUpModelBody({ formData, handleFormDataChange }) {
  const handleRegisterDayChange = (e) => {
    const date = new Date(e.target.value);
    const registerDay = date.toISOString().split("T")[0];
    const nextDay = new Date(date);
    nextDay.setDate(date.getDate() + 1);
    const startDate = nextDay.toISOString().split("T")[0];
    handleFormDataChange("registerDay", registerDay);
    handleFormDataChange("startDate", startDate);
    updateEndDate(startDate, formData.noOfDays);
  };

  const handleNoOfDaysChange = (e) => {
    const days = parseInt(e.target.value, 10);
    handleFormDataChange("noOfDays", days);
    updateEndDate(formData.startDate, days);
  };

  const updateEndDate = (start, days) => {
    if (start && days > 0) {
      const end = new Date(start);
      end.setDate(new Date(start).getDate() + days);
      handleFormDataChange("endDate", end.toISOString().split("T")[0]);
    } else {
      handleFormDataChange("endDate", "");
    }
  };

  return (
    <div
      className="modal-body"
      style={{ maxHeight: "calc(100vh - 210px)", overflowY: "auto" }}
    >
      <Form.Group controlId="formBasicName">
        <Form.Label>
          <i className="fas fa-user"></i> <strong>Name</strong>
        </Form.Label>
        <Form.Control
          type="text"
          value={formData.name}
          placeholder="Enter Name"
          onChange={(e) => handleFormDataChange("name", e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group controlId="formBasicSubName">
        <Form.Label>
          <i className="fas fa-user-tag"></i> <strong>SubName</strong>
        </Form.Label>
        <Form.Control
          type="text"
          value={formData.subName}
          placeholder="Enter sub name"
          onChange={(e) => handleFormDataChange("subName", e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formBasicGivenAmount">
        <Form.Label>
          <i className="fas fa-dollar-sign"></i> <strong>Given Amount</strong>
        </Form.Label>
        <Form.Control
          type="number"
          value={formData.givenAmount}
          placeholder="Enter given amount"
          onChange={(e) => handleFormDataChange("givenAmount", e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formBasicDailyGivenAmount">
        <Form.Label>
          <i className="fas fa-coins"></i> <strong>Daily Given Amount</strong>
        </Form.Label>
        <Form.Control
          type="number"
          value={formData.dailyGivenAmount}
          placeholder="Enter daily given amount"
          onChange={(e) =>
            handleFormDataChange("dailyGivenAmount", e.target.value)
          }
        />
      </Form.Group>
      <Form.Group controlId="formBasicNoOfDays">
        <Form.Label>
          <i className="fas fa-calendar-day"></i> <strong>No of Days</strong>
        </Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter number of days"
          value={formData.noOfDays}
          onChange={handleNoOfDaysChange}
        />
      </Form.Group>

      <Form.Group controlId="formBasicRegisterDay">
        <Form.Label>
          <i className="fas fa-calendar-alt"></i> <strong>Register Day</strong>
        </Form.Label>
        <Form.Control
          type="date"
          value={formData.registerDay}
          onChange={handleRegisterDayChange}
        />
      </Form.Group>

      <Form.Group controlId="formBasicStartDate">
        <Form.Label>
          <i className="fas fa-calendar-plus"></i> <strong>Start Date</strong>
        </Form.Label>
        <Form.Control type="date" value={formData.startDate} readOnly />
      </Form.Group>

      <Form.Group controlId="formBasicEndDate">
        <Form.Label>
          <i className="fas fa-calendar-check"></i> <strong>End Date</strong>
        </Form.Label>
        <Form.Control type="date" value={formData.endDate} readOnly />
      </Form.Group>

      <Form.Group controlId="formBasicMobileNumber">
        <Form.Label>
          <i className="fas fa-phone"></i> <strong>Mobile Number</strong>
        </Form.Label>
        <Form.Control
          type="tel"
          value={formData.mobileNumber}
          placeholder="Enter mobile number"
          onChange={(e) => handleFormDataChange("mobileNumber", e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formBasicAddress">
        <Form.Label>
          <i className="fas fa-map-marker-alt"></i> <strong>Address</strong>
        </Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={formData.address}
          placeholder="Enter address"
          onChange={(e) => handleFormDataChange("address", e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formBasicEmailId">
        <Form.Label>
          <i className="fas fa-envelope"></i> <strong>Email Id</strong>
        </Form.Label>
        <Form.Control
          type="email"
          value={formData.emailId}
          placeholder="Enter email"
          onChange={(e) => handleFormDataChange("emailId", e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formBasicProfessionInformation">
        <Form.Label>
          <i className="fas fa-briefcase"></i>{" "}
          <strong>Profession Information</strong>
        </Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={formData.proInfo}
          placeholder="Enter profession information"
          onChange={(e) => handleFormDataChange("proInfo", e.target.value)}
        />
      </Form.Group>
    </div>
  );
}

export default PopUpModelBody;
