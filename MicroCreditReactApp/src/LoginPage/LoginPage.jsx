import { Fragment } from "react";
import Login from "../LoginComponent/Login/";
import Navbar from "../NavigatorComponent/Navigator";
import TopNavBar from "../TopNavBar/TopNavBar";
function LoginPage() {
  return (
    <Fragment>
       <Navbar /> 
      <TopNavBar/>
      <Login />
    </Fragment>
  );
}

export default LoginPage;

