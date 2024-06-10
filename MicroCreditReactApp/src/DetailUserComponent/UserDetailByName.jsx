import {React, Fragment} from "react";
import { useParams } from "react-router-dom";
import Navbar from "../NavigatorComponent/Navigator"
import DetailUserByNameCard from "../DetailUserComponent/DetailUserByNameCard"
import UserDetailFor from "../DetailUserComponent/UserDetailFor"
import FooterRoot from "../Footer/FooterRoot";
import TopNavBar from "../TopNavBar/TopNavBar";
const UserDetailBySubName = () => {
  const { name } = useParams();
  return (
    <Fragment>
      <Navbar />
      <TopNavBar/>
      <UserDetailFor UserName={name} />
      <DetailUserByNameCard UserName={name} />
      <FooterRoot />
    </Fragment>
  );
};

export default UserDetailBySubName;
