import React, {useRef} from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./style.css";

const LogIn : React.FunctionComponent  = () => {

  const mockUser : {
    username : string;
    password : string;
  } = {
    username : 'admin',
    password : '123'
  }

  let usernameEl = useRef<HTMLInputElement>(null)
  let passwordEl = useRef<HTMLInputElement>(null)
  let history  = useHistory()
  toast.configure()

  const submitLogin = () => {
    let usernameValue  = usernameEl.current
    let passwordValue = passwordEl.current

    if (usernameValue && passwordValue) {
      if (usernameValue.value  !== mockUser.username ) {
        toast.info('Invalid Login')
      } else if (passwordValue.value !== mockUser.password) {
        toast.info('Invalid Login')
      } 
      else {
        toast.info('Succesful Login')
        localStorage.setItem('username',mockUser.username)
        history.push('/homepage')
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
