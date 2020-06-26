import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

const LogIn = () => {
  {
    return (
      <div className={"container"}>
        <h1 className={"logInh1"}>Log In</h1>
        <div className={"logInPlace"}>
          <div className="email">
            <input placeholder={"Enter your E-mail"} type={"email"} />
          </div>
          <div className="password">
            <input placeholder={"Enter your password"} type={"password"} />
          </div>
          <div className="buttons">
            <button>Log In</button>
            <Link to={"/registration"}>
              <button>Registration</button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
};

export default LogIn;
