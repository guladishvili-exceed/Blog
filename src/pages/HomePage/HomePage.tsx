import React, { useEffect } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import {  useRouteMatch } from "react-router";
import { v4 as uuidv4 } from "uuid";

import * as actions from "../../Redux/actions/blogRelated";
import "react-toastify/dist/ReactToastify.css";
import "./style.css";

import * as reusableFunction from '../../components/reusable functions/reusablefunctions'

const HomePage: React.FC = () => {

  const dispatch = useDispatch();
  const history = useHistory();


  let posts: any = useSelector((state: any) => state.posts);
  toast.configure();

  //Checks if token is presented
  useEffect(() => {
    reusableFunction.checkIfTokenIsPresented()
  });

  //Generates all post from DB on page
  useEffect(() => {
    axios
      .get("http://localhost:4000/getPost")
      .then((res) => {
        dispatch(actions.getPost(res.data));
        console.log("--------res", res.data);
      })
      .catch((err) => {
        console.log("--------err", err);
      });
  }, []);

  const getPostById = (id: Number) => {
    axios
      .get(`http://localhost:4000/getTopic/${id}`)
      .then((post) => {
        console.log('--------post.data', post.data.title);
      })
      .catch((err) => {
        console.log('--------err', err);
      })
  }


  const LogOut = () => {
    localStorage.clear();
    history.push("/login");
  };

  return (
    <div className="card">
      <div className="navbar">
        <button onClick={() => history.push("/profile")}>My Profile</button>
        <button onClick={() => history.push("/posts")}>New Topic</button>
        <button onClick={() => LogOut()}>Log Out</button>
      </div>
      <div id="posts">
        <ul>
          {
            Array.isArray(posts) &&
            posts.map((post: any) => {
              return (
                <li
                  key={uuidv4()}
                  onClick={() => {
                    getPostById(post.id)
                  }}
                >
                  <Link to={`/postsOnPage/${post.id}`}>{post.title}</Link>
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
};

export default HomePage;
