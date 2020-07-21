import React, { useRef} from "react";
import { Link, withRouter, useHistory } from "react-router-dom";
import axios from 'axios'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./register.css";

const Register : React.FunctionComponent  = () => {


  let passwordEl = useRef<HTMLInputElement>(null);
  let confirmpasswordEl = useRef<HTMLInputElement>(null);
  let emailEl = useRef<HTMLInputElement>(null);

  toast.configure();

  let history = useHistory();

  const registerUser  = () => {
    let emailValue : HTMLInputElement | null = emailEl.current;
    let passwordValue : HTMLInputElement | null  = passwordEl.current;
    let confirmPassword :  HTMLInputElement | null = confirmpasswordEl.current;

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
          //Axios Request
          axios.post(`http://localhost:4000/addUser`,{
              username:emailValue.value,
              password:passwordValue.value
          }).then(res=>{
              toast.info('Registration was Successful')
              history.push('/login')
              console.log('res',res)
          }).catch(err =>{
              console.log('--------err', err);
          })
      }
    }
  };

  const handleKeyPress = (event: { key: string; }) : void => {
    if (event.key === 'Enter') {
        {
            registerUser()
        }
    }
}


  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12 col-xs-12">
          <h1>Register</h1>
        </div>
        <div className="col-md-12 col-xs-12 registration-username">
          <label>Username : </label>
          <input
            ref={emailEl}
            type={"text"}
            placeholder={"..."}
            onKeyPress = {handleKeyPress}
          />
        </div>
        <div className="col-md-12 col-xs-12 registration-password">
          <label>Password : </label>
          <input
            ref={passwordEl}
            type={"password"}
            placeholder={"..."}
            onKeyPress = {handleKeyPress}
          />
        </div>
        <div className="col-lg-12  col-xs-12 registration-confirmPassword ">
          <label >Confirm Password : </label>
          <input
            ref={confirmpasswordEl}
            type={"password"}
            placeholder={"..."}
            onKeyPress = {handleKeyPress}
          />
        </div>
        <div className="col-md-6 col-xs-12">
          <Link to={"/login"}>
            <button id={'register-login-button'}>Log In</button>
          </Link>
        </div>
        <div className="col-md-6 col-xs-12">
            <button onClick={() => registerUser()}>Register</button>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Register);
