import { Fragment } from "react";
import Table from "./Table";
import Navbar from "../NavigatorComponent/Navigator";
import TopNavBar from "../TopNavBar/TopNavBar";
import FooterRoot from "../Footer/FooterRoot";
function TotalCollectionRoot() {
  return (
    <Fragment>
      <Navbar />
      <TopNavBar />
      <Table />
      <FooterRoot />
    </Fragment>
  );
}

export default TotalCollectionRoot;
