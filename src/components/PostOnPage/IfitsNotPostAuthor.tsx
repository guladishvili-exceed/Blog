import React, { Fragment, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useRouteMatch } from "react-router";
import { useDispatch, connect, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";

import * as actions from "../../Redux/actions/blogRelated";
import { v4 as uuidv4 } from "uuid";
import * as reusableFunction from "../reusable functions/reusablefunctions";
import Comments from "../CurrentPageComments/Comments";


const IfitsNotPostAuthor: React.FunctionComponent<any> = () => {

  const history = useHistory();
  const match: any = useRouteMatch();
  const dispatch = useDispatch();


  const topic: any = useSelector((state: any) => state.topic)
  const comments : any = useSelector((state : any) => state.comments)


  const username = localStorage.getItem("username")
  let commentRef = React.useRef<HTMLInputElement>(null);

  useEffect((): void => {
    reusableFunction.checkIfTokenIsPresented()
  });

  useEffect(() => {
    const getCurrentTopicDataFromBE = (): void => {
      axios.get(`http://localhost:4000/getTopic/${match.params.postId}`)
        .then((res) => {
          dispatch(actions.getTopic({...res.data}));
          console.log('--------res', res.data);
        })
    }
    getCurrentTopicDataFromBE()
  }, [])

  const LogOut = (): void => {
    localStorage.clear();
    history.push("/login");
  };

  const grabUsernameFromReduxStoreTopic = (): string => {
    return topic.username

  }

  const grabTitleFromReduxStoreTopic = (): string => {
    return topic.title

  };
  const grabDescriptionFromReduxStoreTopic = (): string => {
    return topic.description

  };

  const grabIdFromReduxStoreTopic = (): number => {
    return topic.id

  };

  const getAllCommentsOnCurrentPostFromBE = (id: Number): void => {
    axios
      .get(`http://localhost:4000/getComment/${id}`)
      .then((res) => {
        console.log("--------res,get", res.data);
        dispatch(actions.getComment(res.data));
      })
      .catch((err) => {
        console.log("--------err", err);
      });
  };

  const addComment = (id: Number): any => {
    let commentValue = commentRef.current;
    if (commentValue) {
      if (commentValue.value === "") {
        return toast.info("Can not add empty comment");
      } else {
        axios
          .post(`http://localhost:4000/addComment/${id}`, {
            comment: commentValue.value,
            username: localStorage.getItem("username"),
          })
          .then((res) => {
            if (commentValue) {
              getAllCommentsOnCurrentPostFromBE(grabIdFromReduxStoreTopic());
            }
            console.log("--------comment", res.data);
          })
          .catch((err) => {
            toast.info("Server error");
            console.log("--------err", err);
          });
      }
    }
  };



  return  (<div id="card" className="card">
      <div id="postButtons" className="buttons">
        <button onClick={() => history.push("/homepage")}>Home</button>
        <button onClick={() => LogOut()}>Log Out</button>
      </div>

      <div className="posts">
        <p>Author :{grabUsernameFromReduxStoreTopic()}</p>

        <p>Title :{grabTitleFromReduxStoreTopic()}</p>

        <p>Description :{grabDescriptionFromReduxStoreTopic()}</p>

        <div>
          <ul>
            {comments.map((comment: any) => {
              if (comment.username === username) {
                return (
                  <Comments
                  key={uuidv4()}
                  comment = {comment}
                  topicid = {grabIdFromReduxStoreTopic()}/>
                )
              } else {
               return <p key={uuidv4()}>Comment : {comment.comment}</p>
              }
            })}

          </ul>
        </div>

        <div className="comments">
          <input ref={commentRef} placeholder={"Write Comment"}/>
          <button
            onClick={() => {
              addComment(match.params.postId);
            }}
          >
            Add Comment
          </button>
        </div>
      </div>
    </div>
  )
};



export default IfitsNotPostAuthor;
