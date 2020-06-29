import React, { useRef } from "react";
import { Link, withRouter, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./style.css";

const Register : React.FunctionComponent  = () => {
  toast.configure();



  let passwordEl = useRef<HTMLInputElement>(null);
  let confirmpasswordEl = useRef<HTMLInputElement>(null);
  let emailEl = useRef<HTMLInputElement>(null);

  let history = useHistory();

  const registerUser  = () => {
    let emailValue = emailEl.current;
    let passwordValue = passwordEl.current;
    let confirmPassword = confirmpasswordEl.current;

    if (emailValue && passwordValue && confirmPassword) {
      if (
        passwordValue.value !== confirmPassword.value
      ) {
        toast.info("Registration Error");
      } else if (passwordValue.value && confirmPassword.value === '') {
        toast.info("Registration Error");
      } else if (emailValue.value === '') {
        toast.info("Registration Error");
      } 
      else {
        toast.info('Registration Went Succesful') 
        history.push("/login");
      }
    }
  };

  const handleKeyPress = (event: { key: string; }) => {
    if (event.key === 'Enter') {
        {
            registerUser()
        }
    }
}


  return (
    <div className="container">
      <h1 className={"registerH1"}>Registration</h1>
      <div className="email">
        <input
          ref={emailEl}
          type={"text"}
          placeholder={"Enter your username"}
          onKeyPress = {handleKeyPress}
        />
      </div>
      <div className="password">
        <input
          ref={passwordEl}
          type={"password"}
          placeholder={"Enter your password"}
          onKeyPress = {handleKeyPress}
        />
      </div>
      <div className="confirmPassword">
        <input
          ref={confirmpasswordEl}
          type={"password"}
          placeholder={"Confirm your password"}
          onKeyPress = {handleKeyPress}
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
