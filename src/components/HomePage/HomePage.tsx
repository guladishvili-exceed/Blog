import React, { useEffect } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Jumbotron from 'react-bootstrap/Jumbotron'
import Container from 'react-bootstrap/Container'
import {Navbar,Nav,Form,Button,FormControl} from "react-bootstrap";



import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";

import * as actions from "../../Redux/actions/blogRelated";
import "react-toastify/dist/ReactToastify.css";
import "./homepage.css";
import poster1 from "./poster1.jpg"
import poster2 from "./poster2.jpg"

import * as reusableFunction from '../../components/reusable functions/reusablefunctions'

const HomePage: React.FC = () => {

  const dispatch = useDispatch();
  const history = useHistory();


  let posts: any = useSelector((state: any) => state.posts);
  let users : any = useSelector((state : any) => state.users)
  let pageCount = useSelector((state:any) => state.pageCount)
  console.log('--------pageCount', pageCount);


  let username = localStorage.getItem("username")
  toast.configure();

  //Checks if token is presented
  useEffect(() : void => {
    reusableFunction.checkIfTokenIsPresented()
  });

  //Generates all post from DB on page
  useEffect(() : void => {
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

  const renderPagination = () => {
    const paging = []
    for (let i = 1; i <= pageCount; i++) {
      paging.push(
        <button
          key={uuidv4()}
          className={'btn btn-info'}
          onClick={() => {
            actions.changePage(i)
          }}>
          {i}
        </button>
      )
    }
    return paging
  }


  const getPostById = (id: Number) : void => {
    axios
      .get(`http://localhost:4000/getTopic/${id}`)
      .then((post) => {
        console.log('--------post', post);
      })
      .catch((err) => {
        console.log('--------err', err);
      })
  }

  //Filtering users to find which user is currently logged in
  const user = users.filter((user : any) => user.role === "admin")
  const superUser = users.filter((user:any)=>user.role === "super admin")
  console.log('--------superUser', superUser);






  const LogOut = () : void  => {
    localStorage.clear();
    history.push("/login");
  };




  return (
    <div className="home-page">
      <Jumbotron fluid>
        <Container>
          <h1>Welcome to Roffy's Forum User {localStorage.getItem('username')}</h1>
          <label>
            Place where you can discuss everything
          </label>
        </Container>
      </Jumbotron>
      <div className="topside">
        {superUser.map((user : any) => {
          if (user.username === username) {
            return  <div className={'case-buttons'} key={uuidv4()}>
              <Navbar bg="dark" className={'navBar'} variant="dark">
                <Nav className="mr-auto">
                  <Button className = {'bootstrapProfile'} variant="outline-info"><Link className={'link'} key={uuidv4()} to={`/profile/${user.id}`}>My Profile</Link> </Button>
                  <Button className={'bootstrapAdmin'} variant="outline-info" onClick={() => {history.push('/adminPanel')}}>Admin Panel</Button>
                  <Button className={'bootstrapNewTopic'} variant="outline-info" onClick={() => {history.push('/posts')}}>New Topic</Button>
                </Nav>
                <Button className={'bootstrapLogOut'}  variant="outline-info"  onClick={() => LogOut()}>Log Out</Button>
              </Navbar>
              <div className={'poster1'}>
                <img src={poster1} />
              </div>
              <div className={'poster2'}>
                <img src={poster2} />
              </div>
            </div>
          } else {
            return  <div className={'homepage-buttons'} key={uuidv4()}>
              <Navbar bg="dark" variant="dark">
                <Nav className="mr-auto">
                  <Button className = {'bootstrapProfile'} variant="outline-info"><Link key={uuidv4()} to={`/profile/${user.id}`}>My Profile</Link> </Button>
                  <Button className={'bootstrapNewTopic'} variant="outline-info" onClick={() => {history.push('/posts')}}>New Topic</Button>
                </Nav>
                <Button variant="outline-info"  onClick={() => LogOut()}>Log Out</Button>
              </Navbar>
            </div>
          }
        })}
      </div>
      <div id="posts">
        <h1>Posts</h1>
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
      {renderPagination()}
    </div>
  );
};

export default HomePage;
