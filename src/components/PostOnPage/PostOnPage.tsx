import React, { useEffect } from "react";
import {  useRouteMatch } from "react-router";

import { useDispatch, connect, useSelector } from "react-redux";
import * as actions from "../../Redux/actions/blogRelated";

import "./style.css";
import axios from "axios";
import * as reusableFunction from '../../components/reusable functions/reusablefunctions'

import IfisPostAuthor from "./IfisPostAuthor";
import IfitsNotPostAuthor from "./IfitsNotPostAuthor";


const PostOnPage: React.FunctionComponent<any> = ({comments}) => {
  const dispatch = useDispatch();
  const match : any = useRouteMatch();
  const username = localStorage.getItem("username");

  const topic: any = useSelector((state: any) => state.topic)
  
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


  const checkPostAuthor = () : any => {
    if (username === topic.username || username === "admin") {
      return true
    } else {
      return false
    }
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
