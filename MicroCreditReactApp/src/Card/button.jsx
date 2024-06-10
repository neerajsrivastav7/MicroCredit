import React from "react";
import { addUser, viewCollection } from "../Common/ButtonFunctions"; // Importing functions from ButtonFunctions.jsx
import "./commonCss.css";
import { Fragment } from "react";
import AddUserButton from "./AddUserButton";
import SearchBox from "../Common/SearchBox";
function MicroButton() {
  return (
    <div className="container mt-4 buttonCss">
      <div className="button-group">
        <AddUserButton />
        <button
          type="button"
          className="btn btn-success"
          onClick={viewCollection}
        >
          Todays's Collection
        </button>
      </div>
    </div>
  );
}

export default MicroButton;



// App.jsx


