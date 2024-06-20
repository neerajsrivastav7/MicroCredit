import axios from "axios";
import { AddPathByName, PathToAddTodayCollection } from "../External/path";

export const HandleAddMoney = async (event , data) => {
  const path = AddPathByName();
  console.log(path)
  console.log(data)
  try {
    const response = await axios.patch(path, data,{
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response)
    return response;
  } catch (error) {
    console.error("There was a problem with the axios request:", error);
    return error;
  }
};

export const HandleTodayCollection = async (event, data) => {
  const path = PathToAddTodayCollection();
  console.log(path);
  console.log(data);
  try {
    const response = await axios.patch(path, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response);
    return response;
  } catch (error) {
    console.error("There was a problem with the axios request:", error);
    return error;
  }
};

