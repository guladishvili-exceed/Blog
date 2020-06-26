import React, { useState, useRef } from "react";
import { Link, withRouter, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./style.css";

interface Props {
  userList: object;
  newUser: object;
}
const Register: React.FC = (Props) => {
  const [userList, newUser] = useState({
    username: "",
    password: "",
  });

  toast.configure();

  const errorToast = () => {
    toast.info("Registration Error");
  };

  let passwordEl = useRef<HTMLInputElement>(null);
  let confirmpasswordEl = useRef<HTMLInputElement>(null);
  let emailEl = useRef<HTMLInputElement>(null);

  let history = useHistory();

  const registerUser = () => {
    let emailValue = emailEl.current;
    let passwordValue = passwordEl.current;
    let confirmPassword = confirmpasswordEl.current;
    if (emailValue && passwordValue && confirmPassword) {
      if (
        passwordValue.value === confirmPassword.value &&
        emailValue.value !== ""
      ) {
        history.push("/login");
        newUser({ username: emailValue.value, password: passwordValue.value });
      } else {
        errorToast();
      }
    }
  };

  return (
    <div className="container">
      <h1 className={"registerH1"}>Registration</h1>
      <div className="email">
        <input
          ref={emailEl}
          type={"text"}
          placeholder={"Enter your username"}
        />
      </div>
      <div className="password">
        <input
          ref={passwordEl}
          type={"password"}
          placeholder={"Enter your password"}
        />
      </div>
      <div className="confirmPassword">
        <input
          ref={confirmpasswordEl}
          type={"password"}
          placeholder={"Confirm your password"}
        />
      </div>
      <div id={"buttons"} className="buttons">
        <Link to={"/login"}>
          <button>Log In</button>
        </Link>
        <button onClick={() => registerUser()}>Register</button>
      </div>
    </div>
  );
};

export default withRouter(Register);
