function MoneyPopFooter({
  ModalValue,
  handleCloseAndResetForAddMoney,
  handleSaveForMoney,
}) {
  return (
    <div class="modal-footer">
      <button
        type="button"
        class="btn btn-secondary"
        onClick={handleCloseAndResetForAddMoney}
        data-dismiss="modal"
      >
        Close
      </button>
      <button
        type="button"
        class="btn btn-primary"
        onClick={handleSaveForMoney}
      >
        Add Money
      </button>
    </div>
  );
}

export default MoneyPopFooter;