import { useState } from "react";
import { HandleDeleteBySubName } from "../server/ServerDelete";
import { useNavigate } from "react-router-dom";

function DeleteButton({ subName }) {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const deleteUser = async (subName) => {
    if (!subName) return;
    try {
      const status = await HandleDeleteBySubName(subName);
      console.log(status);
      if (status === 200) {
        setMessage("User Deleted");
        console.log("Navigating to /microcredit/userDetail");
        navigate(0); // Navigate after setting message
      } else {
        setMessage("User not Deleted");
      }
    } catch (error) {
      setMessage("Error deleting user");
      console.error("Error deleting user:", error);
    }
  };

  return (
    <button className="btn btn-danger" onClick={() => deleteUser(subName)}>
      Delete User
    </button>
  );
}

export default DeleteButton;
