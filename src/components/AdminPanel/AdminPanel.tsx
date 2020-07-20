import React, { useEffect } from "react";
import { useHistory } from "react-router";
import { useSelector, useDispatch } from "react-redux";

import UserList from "../userList/UserList";

import axios from "axios";
import { v4 as uuidv4 } from "uuid";

import './admin.css'
import home from './home.png'




import * as reusableFunction from "../reusable functions/reusablefunctions";
import * as actions from "../../Redux/actions/blogRelated";

const AdminPanel:React.FunctionComponent = () => {

  let users : any = useSelector((state : any) => state.users)
  let allUsersExceptSuperAdmin = users.filter((user : any) => user.role !== "super admin")

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
      })
      .catch((err) => {
        console.log("--------err", err);
      });
  }, []);



  return  (
    <div className={'adminbody'}>
      <div className={'buttons'}>
        <button className={'home'} onClick={() => {history.push('/homePage')}}><img src={home} /></button>
      </div>
      <div className="users">
        <ul>
          {allUsersExceptSuperAdmin.map((user : any) => {
            return  <div key={uuidv4()}>
              <UserList
                users = {user}
              />
            </div>
          })}
        </ul>
      </div>
    </div>
  )
}

export default AdminPanel;