import { Fragment } from "react";
import Navbar from "../NavigatorComponent/Navigator";
import TopNavBar from "../TopNavBar/TopNavBar";
import FooterRoot from "../Footer/FooterRoot";
import FormComponent from "./FormComponent";
function AddUserRoot() {
  return (
    <Fragment>
      <Navbar />
      <TopNavBar />
      <FormComponent/>
      <FooterRoot />
    </Fragment>
  );
}

export default AddUserRoot;
