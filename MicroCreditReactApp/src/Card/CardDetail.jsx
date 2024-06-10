import React, { Fragment } from "react";
import Navbar from "../NavigatorComponent/Navigator";
import CardDataComponent from "./CardDataComponent"
import FooterRoot from "../Footer/FooterRoot";
import TopNavBar from "../TopNavBar/TopNavBar";
function CardDetail() {
  return <Fragment>
    <Navbar/>
    <TopNavBar/>
    {/* <MicroButton/> */}
    <CardDataComponent/>
    <FooterRoot/>
  </Fragment>
}

export default CardDetail;
