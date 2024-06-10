import "./UserError.css";
function PopUpHeader({ AddUser, UserMessage, ResetForm }) {
  return (
    <div class="modal-header">
      <h5 class="modal-title" id="staticBackdropLabel">
        {AddUser}
      </h5>
      {UserMessage && (
        <div className="header-error-message">
          <strong>{UserMessage}</strong>
        </div>
      )}
      <button
        type="button"
        class="close"
        data-dismiss="modal"
        aria-label="Close"
        onClick={ResetForm}
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  );
}

export default PopUpHeader;