import React, { useState, useEffect } from "react";
import "./AddUser.css";
import { ConvertIntoJson } from "./FormDataToJson";
import { useNavigate } from "react-router-dom";
import {HandleRequestAddUser} from "../server/ServerPost"
const initialFormData = {
  name: "",
  subName: "",
  givenAmount: "",
  dailyGivenAmount: "",
  noOfDays: "",
  registerDay: "",
  startDate: "",
  endDate: "",
  mobileNumber: "8707706731",
  address: "Basti UtterPradesh",
  emailId: "neerajsrivastav7@gmail.com",
  proInfo: "Farmer",
};

const FormComponent = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (formData.registerDay) {
      const registerDate = new Date(formData.registerDay);
      const nextDay = new Date(registerDate);
      nextDay.setDate(registerDate.getDate() + 1);
      const formattedNextDay = nextDay.toISOString().split("T")[0];
      if (formattedNextDay !== formData.startDate) {
        setFormData((prevData) => ({
          ...prevData,
          startDate: formattedNextDay,
        }));
      }
    }
  }, [formData.registerDay]);

  useEffect(() => {
    if (formData.startDate && formData.noOfDays) {
      const startDate = new Date(formData.startDate);
      const endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + parseInt(formData.noOfDays));
      const formattedEndDate = endDate.toISOString().split("T")[0];
      if (formattedEndDate !== formData.endDate) {
        setFormData((prevData) => ({
          ...prevData,
          endDate: formattedEndDate,
        }));
      }
    }
  }, [formData.startDate, formData.noOfDays]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    var JsonData = ConvertIntoJson(formData);
    console.log(JsonData);
    try {
      const response = await HandleRequestAddUser(e, JsonData);
      console.log(response)
      if (response && response.status === 201) {
        navigate("/microcredit/userDetail");
      } else {
        setFormData(initialFormData);
        setMessage("Name cannot be blank");
      }
    } catch (error) {
      setFormData(initialFormData);
      setMessage("Name cannot be blank");
    }
  };

  return (
    <div className="container mt-5 container_new">
      <div className="form-container form-container_new">
        <h2 className="form-header sticky-header form-header_new">Add User</h2>
        {message && <div className="message sticky-message">{message}</div>}
        <div className="form-scrollable">
          <form onSubmit={handleSubmit}>
            <div className="form-group form-group_new">
              <label htmlFor="name">
                <strong>Name</strong> <i className="fas fa-user"></i>
              </label>
              <input
                type="text"
                className="form-control white-text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="subName">
                <strong>Sub Name</strong> <i className="fas fa-user-tag"></i>
              </label>
              <input
                type="text"
                className="form-control white-text"
                id="subName"
                name="subName"
                value={formData.subName}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="givenAmount">
                <strong>Given Amount</strong> <i className="fas fa-coins"></i>
              </label>
              <input
                type="number"
                className="form-control"
                id="givenAmount"
                name="givenAmount"
                value={formData.givenAmount}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="dailyGivenAmount">
                <strong>Daily Given Amount</strong>{" "}
                <i className="fas fa-hand-holding-usd"></i>
              </label>
              <input
                type="number"
                className="form-control"
                id="dailyGivenAmount"
                name="dailyGivenAmount"
                value={formData.dailyGivenAmount}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="noOfDays">
                <strong>Number of Days</strong>{" "}
                <i className="fas fa-calendar"></i>
              </label>
              <input
                type="number"
                className="form-control"
                id="noOfDays"
                name="noOfDays"
                value={formData.noOfDays}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="registerDay">
                <strong>Register Day</strong>{" "}
                <i className="fas fa-calendar-plus"></i>
              </label>
              <input
                type="date"
                className="form-control"
                id="registerDay"
                name="registerDay"
                value={formData.registerDay}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="startDate">
                <strong>Start Date</strong>{" "}
                <i className="fas fa-calendar-day"></i>
              </label>
              <input
                type="date"
                className="form-control"
                id="startDate"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                disabled
              />
            </div>
            <div className="form-group">
              <label htmlFor="endDate">
                <strong>End Date</strong>{" "}
                <i className="fas fa-calendar-check"></i>
              </label>
              <input
                type="date"
                className="form-control"
                id="endDate"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                disabled
              />
            </div>
            <div className="form-group">
              <label htmlFor="mobileNumber">
                <strong>Mobile Number</strong> <i className="fas fa-phone"></i>
              </label>
              <input
                type="tel"
                className="form-control"
                id="mobileNumber"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="address">
                <strong>Address</strong>{" "}
                <i className="fas fa-map-marker-alt"></i>
              </label>
              <input
                type="text"
                className="form-control"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="emailId">
                <strong>Email ID</strong> <i className="fas fa-envelope"></i>
              </label>
              <input
                type="email"
                className="form-control"
                id="emailId"
                name="emailId"
                value={formData.emailId}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="proInfo">
                <strong>Professional Info</strong>{" "}
                <i className="fas fa-briefcase"></i>
              </label>
              <input
                type="text"
                className="form-control"
                id="proInfo"
                name="proInfo"
                value={formData.proInfo}
                onChange={handleChange}
              />
            </div>
            <div className="form-footer">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormComponent;
