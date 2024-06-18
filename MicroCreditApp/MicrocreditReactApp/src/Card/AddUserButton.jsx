import React, { useState } from "react";
import { Button } from "react-bootstrap";
import AddUserModal from "../AddUserPopUp/AddUserModal";
import AddUserPopUpButton from "../AddUserPopUp/AddUserPopUpButton";

function AddUserButton() {
  //const [ErrorMessage, setErrorMessage] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const handleShow = () => setModalShow(true);
  const handleClose = () => {
    setModalShow(false);
  };
  return (
    <div className="App">
      <AddUserPopUpButton handleShow={handleShow} />
      <AddUserModal
        show={modalShow}
        handleClose={handleClose}
      />
    </div>
  );
}

export default AddUserButton;
