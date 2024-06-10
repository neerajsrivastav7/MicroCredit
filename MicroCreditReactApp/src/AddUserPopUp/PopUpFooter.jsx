function PopFooter({ handleSave, ResetForm }) {
  return (
    <div class="modal-footer">
      <button
        type="button"
        class="btn btn-secondary"
        onClick={ResetForm}
        data-dismiss="modal"
      >
        Close
      </button>
      <button type="submit" class="btn btn-primary" onClick={handleSave}>
        Submit
      </button>
    </div>
  );
}

export default PopFooter