// import React, { useState, Fragment } from "react";
// import { useNavigate } from "react-router-dom";

// function SideBar({ isOpen, toggleSidebar }) {
//   const navigate = useNavigate();

//   const handleTotalCollection = () => {
//     navigate(`/microcredit/userDetail/totalCollection`);
//   };
//   const handleSignOut = () => {
//     console.log("Sign Out clicked");
//   };

//   return (
//     <div className={`sidebar ${isOpen ? "open" : ""}`}>
//       <button className="close-btn" onClick={toggleSidebar}>
//         &times;
//       </button>
//       <div className="sidebar-content">
//         <div
//           className="sidebar-item"
//           onClick={() => console.log("Add User clicked")}
//         >
//           <i className="fas fa-user-plus"></i> Add User
//         </div>
//         <div className="sidebar-item" onClick={handleTotalCollection}>
//           <i className="fas fa-dollar-sign"></i> Today Total Collection
//         </div>
//         <div className="sidebar-item" onClick={handleSignOut}>
//           <i className="fas fa-sign-out-alt"></i> Sign Outa
//         </div>
//       </div>
//     </div>
//   );
// }

// export default SideBar;




import React, { useState, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import AddUserModal from "../AddUserPopUp/AddUserModal";

function SideBar({ isOpen, toggleSidebar }) {
  const navigate = useNavigate();
  const [isAddUserModalOpen, setAddUserModalOpen] = useState(false);
  const handleTotalCollection = () => {
    navigate(`/microcredit/userDetail/totalCollection`);
  };

  const handleSignOut = () => {
    
  };

  const openAddUser = () => {
    navigate(`/microcredit/userDetail/addUser`);
  };

  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <button className="close-btn" onClick={toggleSidebar}>
        &times;
      </button>
      <div className="sidebar-content">
        <div
          className="sidebar-item"
          onClick={openAddUser}
        >
          <i className="fas fa-user-plus"></i> Add User
        </div>
        <div className="sidebar-item" onClick={handleTotalCollection}>
          <i className="fas fa-dollar-sign"></i> Today Total Collection
        </div>
        <div className="sidebar-item" onClick={handleSignOut}>
          <i className="fas fa-sign-out-alt"></i> Sign Out
        </div>
      </div>
    </div>
  );
}

export default SideBar;


