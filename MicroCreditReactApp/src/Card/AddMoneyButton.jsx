import React, { Fragment, useState } from "react";
import AddMoneyModal from "../AddMoneyPopUp/AddMoneyModel";
import { Button } from "react-bootstrap";

function AddMoneyButton({ type, Name, onAddDailyPAmount, userName }) {
  const [moneyModalShow, setMoneyModalShow] = useState(false);
  const [Type, setType] = useState(type);
  const handleMoneyModalClose = () => {
    setMoneyModalShow(false);
  };

  const handleMoneyModalShow = () => {
    setMoneyModalShow(true);
  };

  return (
    <Fragment>
      <Button onClick={handleMoneyModalShow}>Add Money</Button>
      <AddMoneyModal
        moneyType={Type}
        Moneyshow={moneyModalShow}
        MoneyHandleClose={handleMoneyModalClose}
        Name={Name}
        DailyPaidAmount={onAddDailyPAmount}
        userName= {userName}
      />
    </Fragment>
  );
}

export default AddMoneyButton;
