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
    <div className="register-container">
      <h1 className={"registerH1"}>Registration</h1>
      <div className="registration-username">
        <label className={'label-name'}>
          <span className={'content-name'}>Username</span>
        </label>
        <input
          ref={emailEl}
          type={"text"}
          placeholder={"..."}
          onKeyPress = {handleKeyPress}
        />
      </div>
      <div className="registration-password">
        <label className={'label-name'}>
          <span className={'content-name'}>Password</span>
        </label>
        <input
          ref={passwordEl}
          type={"password"}
          placeholder={"..."}
          onKeyPress = {handleKeyPress}
        />
      </div>
      <div className="registration-confirmPassword">
        <label className={'label-name'}>
          <span className={'content-name'}>Confirm Password</span>
        </label>
        <input
          ref={confirmpasswordEl}
          type={"password"}
          placeholder={"..."}
          onKeyPress = {handleKeyPress}
        />
      </div>
      <div id={"buttons"} className="registration-buttons">
        <Link to={"/login"}>
          <button id={'register-login-button'}>Log In</button>
        </Link>
        <button onClick={() => registerUser()}>Register</button>
      </div>
    </div>
  );
};

export default withRouter(Register);
