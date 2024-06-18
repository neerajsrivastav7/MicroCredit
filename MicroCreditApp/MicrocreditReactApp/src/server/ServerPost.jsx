// handleSubmit.js or the same file above PostRequestExample component
import axios from "axios";
import { LoginPath, AddUserPath, AddDetailPath } from "../External/path";
export const HandleRequestForLogin = async (event, data) => {
  event.preventDefault();
  const path = LoginPath();
  console.log(path)
  try {
    const response = await axios.post(
      path,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response
  } catch (error) {
    console.error("There was a problem with the axios request:", error);
    return error
  }
};


export const HandleRequestAddUser = async (event, data) => {
  event.preventDefault();
  const path = AddUserPath();
  console.log(path);
  try {
    const response = await axios.post(path, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    console.error("There was a problem with the axios request:", error);
    return error;
  }
};
