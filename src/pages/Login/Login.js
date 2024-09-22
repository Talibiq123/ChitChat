import React, { useState } from "react";
import "./Login.css";
import assets from "../../assets/assets";
import { signup } from "../../config/firebase";

const Login = () => {
  const [currState, setCurrState] = useState("Sign Up");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, SetPassword] = useState("");

  const onSubmitHandler = (event) => {
    event.preventDefault();
    console.log("Form Submitted", { userName, email, password });
    if (currState === "Sign Up") {
      signup(userName, email, password);
    }
  }  

  return (
    <div className="login">
      <img src={assets.logo_big} alt="logo" className="logo" />
      <form onSubmit={onSubmitHandler} className="login-form">
        <h2>{currState}</h2>
        {currState === "Sign Up" ? (
          <input
            onChange={(e) => setUserName(e.target.value)}
            value={userName}
            type="text"
            placeholder="username"
            className="form-input"
            required
          />
        ) : null}
        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="email"
          placeholder="Email Address"
          className="form-input"
          required
        />
        <input
          onChange={(e) => SetPassword(e.target.value)}
          value={password}
          type="password"
          placeholder="password"
          className="form-input"
          required
        />
        <button type="submit">
          {currState === "Sign Up" ? "Create Account" : "Login "}
        </button>
        <div className="login-term">
          <input type="checkbox" />
          <p>Agree to the terms of use & privacy policy.</p>
        </div>
        <div className="login-forgot">
          {currState === "Sign Up" ? (
            <p className="login-toggle">
              Already have an Account{" "}
              <span onClick={() => setCurrState("Log In")}>Login Here</span>
            </p>
          ) : (
            <p className="login-toggle">
              Create an Account{" "}
              <span onClick={() => setCurrState("Sign Up")}>click here</span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default Login;
