import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import "./style.css";
import axios from "axios";
import { toast } from "react-toastify";

const PostOnPage: React.FC = (props) => {
  // Dont let in without token
  useEffect(() => {
    axios
      .get(`http://localhost:4000/`, {
        headers: {
          "auth-token": localStorage.getItem("auth-token"),
        },
      })
      .then((res) => {
        console.log("--------res.data", res.data);
      })
      .catch((err) => {
        console.log("err", err);
        toast.info("You must Log In");
        history.push("/login");
      });
  }, []);

  //Get Post By Id
 // useEffect((id : Number) => {
 //     axios
 //         .get(`http://localhost:4000/getTopic/${id}`)
 //         .then((post) => {
 //           console.log('--------post.data', post.data.description);
 //         })
 //         .catch((err)=>{
 //           console.log('--------err', err);
 //         })
 // })

  const LogOut = () => {
    localStorage.clear();
    history.push("/login");
  };

  const history = useHistory();
  let posts: any = useSelector((state: any) => state.posts);

  return (
    <div id="card" className="card">
      <div id="postButtons" className="buttons">
        <button onClick={() => history.push("/homepage")}>Home</button>
        <button onClick={() => history.push("/profile")}>My Profile</button>
        <button onClick={() => LogOut()}>Log Out</button>
      </div>
      <div className="posts">
        <p>
          Title :
          {posts.map((title: any) => {
            return title.title;
          })}
        </p>

        <p>
          Description :
          {posts.map((item : any) => {return item.id})}
        </p>
      </div>
    </div>
  );
};

export default PostOnPage;
