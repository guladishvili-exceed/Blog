// @ts-ignore
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LogIn from "./components/LogIn/Login";
import Register from "./components/Register/Register";
import Homepage from './components/HomePage/HomePage'
import Profile from './components/Profile/Profile'
import "./app.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path={"/login"} component={LogIn} />
          <Route path={"/registration"} component={Register} />
          <Route path={'/homepage'} component={Homepage} />
          <Route path={'/profile'} component={Profile} />
          <Route path={"/"} component={LogIn} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
