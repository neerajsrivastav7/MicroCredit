import React from "react";
import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import PopUpHeader from "./PopUpHeader";
import PopFooter from "./PopUpFooter";
import PopUpModelBody from "./PopUpModelBody";
import SaveData from "./SaveData";
import { HandleRequestAddUser } from "../server/ServerPost";
import { ConvertUserFormToJson } from "../Common/JsonConverter";
const initialFormData = {
  name: "",
  subName: "",
  givenAmount: "",
  dailyGivenAmount: "",
  mobileNumber: "8707706731",
  address: "Basti UtterPradesh",
  emailId: "neerajsrivastav7@gmail.com",
  proInfo: "Farmer",
  registerDay: "",
  startDate: "",
  noOfDays: "",
  endDate: "",
};
function ConvertIntoJson(FormData) {
  // Example function to demonstrate JSON conversion and saving
  var JsonData = ConvertUserFormToJson(
    FormData.name,
    FormData.subName,
    FormData.mobileNumber,
    FormData.address,
    FormData.emailId,
    FormData.startDate,
    FormData.endDate,
    FormData.noOfDays,
    FormData.registerDay,
    FormData.givenAmount,
    FormData.dailyGivenAmount,
    FormData.proInfo
  );
  return JsonData;
}

function AddUserModal({ show, handleClose }) {
  const [formData, setFormData] = useState(initialFormData);
  const [UserMessage, setUserMessage] = useState();
  const handleFormDataChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    var JsonData = ConvertIntoJson(formData);
    try {
      const response = await HandleRequestAddUser(e, JsonData);
      if (response && response.status === 201) {
        setUserMessage("User Created");
      } else {
        setFormData(initialFormData);
        setUserMessage("Name can not be blank");
      }
    } catch (error) {
      setFormData(initialFormData);
      setUserMessage("Name can not be blank");
    }
  };

  const handleCloseAndReset = () => {
    setFormData(initialFormData);
    setUserMessage("");
    handleClose();
  };

  return (
    <div
      class="modal fade"
      id="staticBackdrop"
      data-backdrop="static"
      data-keyboard="false"
      tabIndex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
      show={show}
      onHide={handleClose}
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <PopUpHeader
            AddUser="Add User"
            UserMessage={UserMessage}
            ResetForm={handleCloseAndReset}
          />
          <Form onSubmit={handleSubmit}>
            <PopUpModelBody
              formData={formData}
              handleFormDataChange={handleFormDataChange}
            />
            <PopFooter
              handleSave={handleSubmit}
              ResetForm={handleCloseAndReset}
            />
          </Form>
        </div>
      </div>
    </div>
  );
}

export default AddUserModal;
