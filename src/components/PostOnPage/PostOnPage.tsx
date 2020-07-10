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
  const match = useRouteMatch();
  const username = localStorage.getItem("username");
  let posts: any = useSelector((state: any) => state.posts);

  //Checks if token is presented
  useEffect(() => {
    reusableFunction.checkIfTokenIsPresented()
  });

  useEffect(() => {
    const getAllCommentsOnCurrentPostFromBE = () => {
      // @ts-ignore
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



  const checkPostAuthor = () => {
    return posts.every(
      (item: any) => item.username === username || username === 'admin'
    );
  };

console.log('--------checkPostAuthor()', checkPostAuthor());

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
