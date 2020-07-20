import React, { useEffect } from "react";
import {  useRouteMatch } from "react-router";

import { useDispatch, connect, useSelector } from "react-redux";
import * as actions from "../../Redux/actions/blogRelated";

import "./postOnPage.css";
import axios from "axios";
import * as reusableFunction from '../../components/reusable functions/reusablefunctions'

import IfisPostAuthor from "./IfisPostAuthor";
import IfitsNotPostAuthor from "./IfitsNotPostAuthor";


const PostOnPage: React.FunctionComponent<any> = ({comments}) => {
  const dispatch = useDispatch();
  const match : any = useRouteMatch();
  const username = localStorage.getItem("username");

  const topic: any = useSelector((state: any) => state.topic)
  let users : any = useSelector((state : any) => state.users)

  let filterUsers = users.filter((user : any) => user.username === username)
console.log('--------filterUsers', filterUsers);


  //Checks if token is presented
  useEffect(() : void => {
    reusableFunction.checkIfTokenIsPresented()
  });

  useEffect(() : void => {
    const getAllCommentsOnCurrentPostFromBE = () => {
      axios.get(`http://localhost:4000/getComment/${match.params.postId}`)
        .then((res) => {
          console.log("--------res,get", res.data);
          dispatch(actions.getComment(res.data));
        })
        .catch((err) => {
          console.log("--------err", err);
        });
    };
    getAllCommentsOnCurrentPostFromBE();
  }, []);

  useEffect(() => {
    const getCurrentTopicDataFromBE = () : void => {
      axios.get(`http://localhost:4000/getTopic/${match.params.postId}`)
        .then((res) => {
          dispatch(actions.getTopic({...res.data}));
          console.log('--------res', res.data);
        })
    }
    getCurrentTopicDataFromBE()
  }, [])

  //Get All Users
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


  const checkPostAuthor = () : any => {
    return filterUsers.some((user : any) => {
      return username === topic.username || user.role === 'admin' || user.role === 'super admin';
    })
  };

  return (
     checkPostAuthor() ? (
       <IfisPostAuthor/>
     ) : (
       <IfitsNotPostAuthor/>
     )
  )
};


const mapStateToProps = ({comments}: any) => ({
  comments,
});

export default connect(mapStateToProps)(PostOnPage);
