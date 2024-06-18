// SearchBox.jsx
import React from "react";

function SearchBox() {
  return (
    <form className="form-inline w-100">
      <input
        className="form-control w-75"
        type="search"
        placeholder="Search"
        aria-label="Search"
      />
      <button className="btn btn-outline-success w-25" type="submit">
        Search
      </button>
    </form>
  );
}

export default SearchBox;
