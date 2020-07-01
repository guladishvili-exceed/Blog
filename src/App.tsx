import React, {useReducer} from "react";
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import LogIn from "./components/LogIn/Login";
import Register from "./components/Register/Register";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Homepage from './components/HomePage/HomePage'
import Profile from './components/Profile/Profile'
import Posts from './components/addPostUI/Posts'
import PostOnPage from "./components/PostOnPage/PostOnPage";
import reducer from './Redux/rootReducer'
import "./app.css";

// @ts-ignore
export const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
const App : React.FunctionComponent = () => {


  toast.configure()
  return (
      <Provider store={store}>
            <Router>
              <div className="App">
                <Switch>
                  <Route path={"/"} exact
                     component={LogIn}    />
                  <Route path={"/login"}
                         component = {LogIn}  />
                  <Route path={"/registration"} component={Register} />
                  <Route
                      path={'/homepage'}
                      component = {Homepage}
                  />
                  <Route path={'/profile'}
                         component = {Profile}/>
                  <Route path={"/posts"}
                         component = {Posts}/>
                  <Route path={"/postsOnPage"}
                         component = {PostOnPage}/>
                </Switch>
              </div>
            </Router>
      </Provider>
  );
}

export default App;
