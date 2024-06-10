import React from "react";
function TextBox({ TypeElement, id, label, placeholder, onChange }) {
  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      <input
        type={TypeElement}
        className="form-control"
        id={id}
        placeholder={placeholder}
        onChange={onChange}
        required
      />
    </div>
  );
}

export default TextBox;
