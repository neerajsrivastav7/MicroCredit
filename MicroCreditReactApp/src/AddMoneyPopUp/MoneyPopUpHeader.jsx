import "./error.css"
function MoneyPopUpHeader({
  AddMoney,
  Name,
  MoneyMessage,
  handleCloseAndResetForAddMoney,
}) {
  return (
    <div class="modal-header">
      <h5 class="modal-title" id="staticBackdropLabel">
        {AddMoney} for {Name}
      </h5>
      {MoneyMessage && (
        <div className="header-error-message">
          <strong>{MoneyMessage}</strong>
        </div>
      )}
      <button
        type="button"
        class="close"
        data-dismiss="modal"
        aria-label="Close"
        onClick={handleCloseAndResetForAddMoney}
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  );
}

export default MoneyPopUpHeader;