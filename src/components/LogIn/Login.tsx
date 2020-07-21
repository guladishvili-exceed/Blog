import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from 'axios'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./login.css";

const LogIn: React.FunctionComponent = () => {

  let usernameEl = useRef<HTMLInputElement>(null)
  let passwordEl = useRef<HTMLInputElement>(null)
  let history = useHistory()
  toast.configure()

  const submitLogin = () => {
    let usernameValue = usernameEl.current
    let passwordValue = passwordEl.current

    if (usernameValue && passwordValue) {
      if (usernameValue.value === "" || passwordValue.value === "") {
        toast.info('Invalid login')
      } else {
        //Axios Request
        localStorage.setItem("username", usernameValue.value)
        axios.post(`http://localhost:4000/logIn/${localStorage.getItem("auth-token")}`, {
          username: usernameValue.value,
          password: passwordValue.value
        })
          .then(
            res => {
              console.log('--------res', res);
              localStorage.setItem('auth-token', res.data)
              history.push('/homepage')
              toast.info('Successful login')
            })
          .catch(
            err => {
              console.log('--------err', err)
              toast.info('Invalid Login')
            }
          )
      }
    }
  }

  const handleKeyPress = (event: { key: string; }) => {
    if (event.key === 'Enter') {
      {
        submitLogin()
      }
    }
  }

  return (
    <div className={"container"}>
      <div className="row">
        <div className="col-md-12 col-xs-12">
          <h1>Log In</h1>
        </div>
        <div className="col-md-12 col-xs-12 login-username">
          <label>Username : </label>
          <input onKeyPress={handleKeyPress} autoComplete={'off'} name={'username'}
                 placeholder={"..."}
                 type={"text"} ref={usernameEl}/>
        </div>
        <div className="col-md-12 col-xs-12 username-password">
          <label>Password : </label>
          <input onKeyPress={handleKeyPress} type={"password"} placeholder={"..."}
                 ref={passwordEl}/>
        </div>
        <div className="col-md-6 col-xs-12">
          <button onClick={() => submitLogin()}>Log In</button>
        </div>
        <div className="col-md-6 col-xs-12">
          <button id={'login-registration'} onClick={() => history.push('/registration')}>Registration</button>
        </div>
      </div>
    </div>
  );
};


export default LogIn;
