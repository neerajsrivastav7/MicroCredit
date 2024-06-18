import React, { useState } from "react";
import LoginButton from "./LoginButton";
import "./LoginComponentCss.css";
import TextBox from "../Common/TextBox";
import LoginHeader from "./LoginHeader";
import {JsonConverter} from "../Common/JsonConverter";
import SetError from "../Common/error";
import {HandleRequestForLogin} from "../server/ServerPost"
import { useNavigate } from "react-router-dom";
import { useAuth } from "../OauthComponent/AuthContext";
function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); 
  const { login } = useAuth();
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const result = JsonConverter(username, password);
    if (result === "Username and Password are required") {
      SetError(result);
    } else {
      try {
        const response = await HandleRequestForLogin(event, result);
        console.log(response.status)
        if (response && response.status === 200) {
          login()
          navigate("/microcredit/userDetail");
        }
      } catch (error) {
        console.error("There was a problem with the axios request:", error);
        SetError("Login failed. Please try again.");
      }
    }
  };
  return (
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="card login-container">
            <LoginHeader />
            <div class="card-body">
              <form onSubmit={handleSubmit}>
                <TextBox
                  TypeElement="text"
                  id="username"
                  label="Username"
                  placeholder="Enter username"
                  onChange={handleUsernameChange}
                />
                <TextBox
                  TypeElement="password"
                  id="password"
                  label="password"
                  placeholder="Enter password"
                  onChange={handlePasswordChange}
                />
                <LoginButton handleSubmit={handleSubmit} />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
