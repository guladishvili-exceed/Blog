import React, { useEffect } from "react";
import { useHistory } from "react-router";
import UserList from "../userList/UserList";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import './style.css'
import * as reusableFunction from "../reusable functions/reusablefunctions";
import * as actions from "../../Redux/actions/blogRelated";

const AdminPanel:React.FunctionComponent = () => {

  let users : any = useSelector((state : any) => state.users)
  let allUsersExceptSuperAdmin = users.filter((user : any) => user.role !== "super admin")

  let [editMode,editModeSwitch] = React.useState(false)

  let dispatch = useDispatch()
  let history = useHistory()


  //Checks if token is presented
  useEffect(() : void => {
    reusableFunction.checkIfTokenIsPresented()
  });

  //Generates all users from DB and adds it to the storage Users
  useEffect(() : void => {
    axios
      .get("http://localhost:4000/getUsers")
      .then((res) => {
        dispatch(actions.getUsers(res.data));
        console.log("--------res", res.data);
      })
      .catch((err) => {
        console.log("--------err", err);
      });
  }, []);


  const LogOut = () : void  => {
    localStorage.clear();
    history.push("/login");
  };


  return  (
    <div className={'card'}>
      <div className={'buttons'}>
        <button onClick={() => {history.push('/homePage')}}>Home</button>
        <button onClick={() => {LogOut()}}>Log Out</button>
      </div>
      <ul>
        {allUsersExceptSuperAdmin.map((user : any) => {
          return  (<div key={uuidv4()}>
            <UserList
              users = {user}
            />
          </div>)
        })}
      </ul>
    </div>
  )
}

export default AdminPanel;