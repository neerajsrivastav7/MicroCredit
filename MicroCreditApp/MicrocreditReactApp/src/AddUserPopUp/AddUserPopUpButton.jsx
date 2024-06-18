function AddUserPopUpButton({handleShow}) {
  return (
    <button
      type="button"
      class="btn btn-primary"
      data-toggle="modal"
      data-target="#staticBackdrop"
      onClick={handleShow}
    >
      Add User
    </button>
  );
}

export default AddUserPopUpButton;