export function JsonConverter(username, password) {
  if (!username || !password) {
    return "Username and Password are required";
  }

  const loginData = {
    username: username,
    password: password,
  };

  return JSON.stringify(loginData);
}

export function ConvertUserFormToJson(
  name,
  subName,
  mobileNumber,
  address,
  emailId,
  startDate,
  endDate,
  noOfDays,
  registerDay,
  givenAmount,
  dailyGivenAmount,
  profession
) {
  const AddUserJson = {
    name: name,
    subName: subName,
    mobileNumber: mobileNumber,
    address: address,
    emailId: emailId,
    startDate: startDate,
    endDate: endDate,
    noOfDays: parseInt(noOfDays),
    registerDay: registerDay,
    givenAmount: parseInt(givenAmount),
    dailyGivenAmount: parseInt(dailyGivenAmount),
    profession: profession,
  };
  return JSON.stringify(AddUserJson);
}

export function ConvertAddMoneyDataToJson(
  MoneyType,
  name,
  userName,
  noOfDays,
  TotalMoney
) {
  if (MoneyType === "subName") {
    const AddMoney = {
      mType: MoneyType,
      subName: name,
      name: userName,
      noOfDays: noOfDays,
      totalPaidAmount: TotalMoney,
    };
    return JSON.stringify(AddMoney);
  } else {
    const AddMoney = {
      mType: MoneyType,
      name: name,
      noOfDays: noOfDays,
      totalPaidAmount: TotalMoney,
    };
    return JSON.stringify(AddMoney);
  }
}
