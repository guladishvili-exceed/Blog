import React, { useEffect } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Container from 'react-bootstrap/Container'
import {Navbar,Nav,Button,Row} from "react-bootstrap";

import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";

import * as actions from "../../Redux/actions/blogRelated";
import "react-toastify/dist/ReactToastify.css";
import "./homepage.css";
import poster1 from "./poster1.jpg"
import poster2 from "./poster2.jpg"
import poster3 from "./street.jpg"
import poster4 from "./poster4.jpg"


import * as reusableFunction from '../../components/reusable functions/reusablefunctions'
import { Jumbotron } from "react-bootstrap";

interface IUser {
  id: number;
  username: string;
  role: string;
  password: string;
  avatar: string
}


const HomePage: React.FC = () => {

  const dispatch = useDispatch();
  const history = useHistory();


  let posts: any = useSelector((state: any) => state.posts);
  let users: any = useSelector((state: any) => state.users)
  let pageCount = useSelector((state: any) => state.pageCount)
  let currentPage = useSelector((state: any) => state.currentPage)
  let itemsPerPage = useSelector((state: any) => state.itemsPerPage)

  const indexOfLasttItem = currentPage * itemsPerPage
  const indexOfFirstItem = (indexOfLasttItem - itemsPerPage)
  const currentPosts = posts.slice(indexOfFirstItem, indexOfLasttItem)


  let username = localStorage.getItem("username")
  toast.configure();

  //Checks if token is presented
  useEffect((): void => {
    reusableFunction.checkIfTokenIsPresented()
  });

  //Generates all post from DB on page
  useEffect((): void => {
    axios
      .get("http://localhost:4000/getPost")
      .then((res) => {
        dispatch(actions.getPost(res.data));
        dispatch(actions.setPageCount())
      })
      .catch((err) => {
        console.log("--------err", err);
      });
  }, []);


  //Generates all users from DB and adds it to the storage Users
  useEffect((): void => {
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
          className={'container1'}
          onClick={() => {
            dispatch(actions.changePage(i))
          }}>
          {i}
        </button>
      )
    }
    return paging
  }


  const getPostById = (id: Number): void => {
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
  const superUser = users.filter((user: any) => user.role === "super admin")
  console.log('--------superUser,username', superUser, username);
  const currentUser = users.filter((user: any) => user.username === username)


  const grabCurrentUserId = (): number => {
    return currentUser.map((user: any) => {
      return user.id
    })
  }

  const grabCurrentUserUsername = (): string => {
    return currentUser.map((user: any) => {
      return user.username
    })
  }


  const LogOut = (): void => {
    localStorage.clear();
    history.push("/login");
  };


  return (
    <div className="home-page">
      <Jumbotron fluid>
        <Container>
          <h1>Welcome Back to Roffy's Forum User {localStorage.getItem('username')}</h1>
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
                  <Button className = {'bootstrapProfile'} variant="outline-info"><Link className={'link'} key={uuidv4()} to={`/profile/${user.id}/${user.username}`}>My Profile</Link> </Button>
                  <Button className={'bootstrapAdmin'} variant="outline-info" onClick={() => {history.push('/adminPanel')}}>Admin Panel</Button>
                  <Button className={'bootstrapNewTopic'} variant="outline-info" onClick={() => {history.push('/posts')}}>New Topic</Button>
                </Nav>
                <Button className={'bootstrapLogOut'}  variant="outline-info"  onClick={() => LogOut()}>Log Out</Button>
              </Navbar>
              <img  className={'poster1'} src={poster1} />
              <img className={'poster2'} src={poster2} />
              <img className={'poster3'} src={poster3} />
              <img className={'poster4'} src={poster4} />

            </div>
          } else {
            return  <div className={'case-buttons'} key={uuidv4()}>
              <Navbar bg="dark" className={'navBar'} variant="dark">
                <Nav className="mr-auto">
                  <Button className = {'bootstrapProfile'} variant="outline-info"><Link className={'link'} key={uuidv4()} to={`/profile/${grabCurrentUserId()}/${grabCurrentUserUsername()}`}>My Profile</Link> </Button>
                  <Button className={'bootstrapNewTopic'} variant="outline-info" onClick={() => {history.push('/posts')}}>New Topic</Button>
                </Nav>
                <Button className={'bootstrapLogOut'}  variant="outline-info"  onClick={() => LogOut()}>Log Out</Button>
              </Navbar>
              <img  className={'poster1'} src={poster1} />
              <img className={'poster2'} src={poster2} />
              <img className={'poster3'} src={poster3} />
              <img className={'poster4'} src={poster4} />

            </div>
          }
        })}
      </div>
      <div  id="posts">
        <h1  id={'postsH1'}>Posts</h1>
        <ul  id={'ul'}>
          {
            Array.isArray(currentPosts) &&
            currentPosts.map((post: any) => {
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
          {renderPagination()}
        </ul>
      </div>
    </div>
  );
};

export default HomePage;
