import React, { useRef} from "react";
import { Link, withRouter, useHistory } from "react-router-dom";
import axios from 'axios'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./style.css";

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
