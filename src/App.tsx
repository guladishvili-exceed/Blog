// @ts-ignore
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LogIn from "./components/LogIn/Login";
import Register from "./components/Register/Register";
import "./app.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path={"/login"} component={LogIn} />
          <Route path={"/registration"} component={Register} />
          <Route path={"/"} component={LogIn} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
