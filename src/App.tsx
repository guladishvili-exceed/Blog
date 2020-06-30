import React from "react";
import { BrowserRouter as Router, Switch, Route,Redirect } from "react-router-dom";
import LogIn from "./components/LogIn/Login";
import Register from "./components/Register/Register";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Homepage from './components/HomePage/HomePage'
import Profile from './components/Profile/Profile'
import Posts from './components/addPostUI/Posts'
import "./app.css";

const App : React.FunctionComponent = () => {
  toast.configure()
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path={"/"} exact
                 render = {() => {
                   if (localStorage.getItem("auth-token") === null) {
                     return <LogIn />
                   } else {
                     return <Homepage/>
                   }
                 }}/>
          <Route path={"/login"}
                 render = {() => {
                  if (localStorage.getItem("auth-token") === null) {
                    return <LogIn />
                  } else {
                    return <Homepage/>
                  }
                }} />
          <Route path={"/registration"} component={Register} />
          <Route
              path={'/homepage'}
              render = {() => {
                if (localStorage.getItem("auth-token") === null) {
                  return <LogIn />
                } else {
                  return <Homepage/>
                }
              }}
          />
          <Route path={'/profile'}
                 render = {() => {
                   if (localStorage.getItem("auth-token") === null) {
                     return <LogIn />
                   } else {
                     return <Profile/>
                   }
                 }}/>
          <Route path={"/posts"}
                 render = {() => {
                   if (localStorage.getItem("auth-token") === null) {
                     return <LogIn />
                   } else {
                     return <Posts/>
                   }
                 }}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
