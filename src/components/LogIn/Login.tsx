import React, {useRef,useState} from "react";
import { useHistory } from "react-router-dom";
import axios from 'axios'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./style.css";

const LogIn : React.FunctionComponent  = () => {



  let usernameEl = useRef<HTMLInputElement>(null)
  let passwordEl = useRef<HTMLInputElement>(null)
  let history  = useHistory()
  toast.configure()

  const submitLogin = () => {
    let usernameValue  = usernameEl.current
    let passwordValue = passwordEl.current

    if (usernameValue && passwordValue) {
      if(usernameValue.value === "" || passwordValue.value === "") {
        toast.info('Invalid login')
      } else {
        //Axios Request
        localStorage.setItem("username",usernameValue.value)
        axios.post(`http://localhost:4000/logIn`,{
          username : usernameValue.value,
          password : passwordValue.value
        })
            .then(
                res => {
                console.log('--------res', res);
                localStorage.setItem('auth-token',res.data)
                toast.info('Successful Login')
                history.push('/homepage')
            })
            .catch(
                err => {
                  console.log('--------err', err)
                  toast.info('Invalid Login')}
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
        <h1 className={"logInh1"}>Log In</h1>
        <div className={"logInPlace"}>
          <div className="email">
            <input onKeyPress = {handleKeyPress}  placeholder={"Enter your Username"} type={"text"} ref = {usernameEl} />
          </div>
          <div className="password">
            <input onKeyPress = {handleKeyPress} placeholder={"Enter your password"} type={"password"} ref = {passwordEl} />
          </div>
          <div className="buttons">
            <button onClick ={() => submitLogin()}>Log In</button>
              <button onClick ={() => history.push('/registration')}>Registration</button>
          </div>
        </div>
      </div>
    );  
};

export default LogIn;
