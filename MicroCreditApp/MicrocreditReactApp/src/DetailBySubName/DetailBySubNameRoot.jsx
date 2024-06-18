import { React, Fragment } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../NavigatorComponent/Navigator";
import UserDetailFor from "../DetailUserComponent/UserDetailFor";
import InfoBySubName from "./InfoBySubName";
import FooterRoot from "../Footer/FooterRoot";
import TopNavBar from "../TopNavBar/TopNavBar";
const BySubName = () => {
  const { name } = useParams();
  const { subName } = useParams();
  return (
    <Fragment>
      <Navbar />
      <TopNavBar/>
      <UserDetailFor UserName={subName} />
      <InfoBySubName name={name} subName={subName} />
      <FooterRoot/>
    </Fragment>
  );
};

export default BySubName;
