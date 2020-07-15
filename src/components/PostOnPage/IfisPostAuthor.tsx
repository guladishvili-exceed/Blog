import React, { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useHistory } from "react-router-dom";
import { useRouteMatch } from "react-router";
import { useDispatch, connect, useSelector } from "react-redux";
import axios from "axios";
import * as actions from "../../Redux/actions/blogRelated";
import { toast } from "react-toastify";
import * as reusableFunction from "../reusable functions/reusablefunctions";
import Comments from "../CurrentPageComments/Comments";

const IfisPostAuthor: React.FunctionComponent<any> = () => {
  let commentRef = React.useRef<HTMLInputElement>(null);
  let descriptionRef = React.useRef<HTMLTextAreaElement>(null);

  const [editMode, editModeSwitch] = React.useState<boolean>(false);

  const topic: any = useSelector((state: any) => state.topic)
  const comments : any = useSelector((state : any) => state.comments)

  const match : any = useRouteMatch();
  const dispatch = useDispatch();
  const history = useHistory();

  const username = localStorage.getItem("username")

  useEffect(() : void => {
    reusableFunction.checkIfTokenIsPresented()
  });

  useEffect(() : void => {
    const getCurrentTopicDataFromBE = () : void  => {
      axios.get(`http://localhost:4000/getTopic/${match.params.postId}`)
        .then((res) => {
          dispatch(actions.getTopic({...res.data}));
          console.log('--------res', res.data);
        })
    }
    getCurrentTopicDataFromBE()
  }, [])


  const LogOut = () : void  => {
    localStorage.clear();
    history.push("/login");
  };

  const grabUsernameFromReduxStoreTopic  = () : string => {
    return topic.username

  }

  const grabTitleFromReduxStoreTopic = () : string => {
    return topic.title

  };
  const grabDescriptionFromReduxStoreTopic  = () : string => {
    return topic.description

  };

  const grabIdFromReduxStoreTopic  = () : number => {
    return topic.id

  };

  const deletePost = (id: Number) : void  => {
      axios
        .delete(`http://localhost:4000/deleteTopic/${id}`)
        .then((post) => {
          history.push("/homepage");
          console.log("--------post", post);
        })
        .catch((err) => {
          console.log("--------err", err);
        });
  };

  const deleteCommentsWhenPostIsDeleted = (id: Number) : void  => {
    axios
      .delete(`http://localhost:4000/deleteAllComments/${id}`)
      .then((post) => {
        console.log("--------post", post);
        deletePost(id);
      })
      .catch((err) => {
        console.log("--------err", err);
      });
  };

  const submitPostEdit = (id: Number) : void => {
    let descriptionValue = descriptionRef.current;
      if (descriptionValue) {
        axios
          .put(`http://localhost:4000/updateTopic/${id}`, {
            description: descriptionValue.value,
          })
          .then((post) => {
            console.log("--------post", post);
            if (descriptionValue) {
              topic.description = descriptionValue.value;
            }
            editModeSwitch(false);
          })
          .catch((err) => {
            console.log("--------err", err);
          });
    }
  };

  const cancelEdit = () : void => {
    let descriptionValue = descriptionRef.current;
    if (descriptionValue) {
      descriptionValue.value = topic.description;
    }
    editModeSwitch(false);
  };

  const addComment = (id: Number) : any => {
    let commentValue : HTMLInputElement | null = commentRef.current;
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
              getAllCommentsOnCurrentPostFromBE(match.params.postId);
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



  const getAllCommentsOnCurrentPostFromBE = (id: Number) => {
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

  return editMode ? (
    <div id="card" className="card">
      <div id="postButtons" className="buttons">
        <button onClick={() => history.push("/homepage")}>Home</button>
        <button onClick={() => history.push("/profile")}>My Profile</button>
        <button onClick={() => LogOut()}>Log Out</button>
      </div>
      <div className="posts">
        <p>Title :{grabTitleFromReduxStoreTopic()}</p>

        <p>
          <textarea
            ref={descriptionRef}
            defaultValue={grabDescriptionFromReduxStoreTopic()}
            placeholder={"Enter Text"}
          />
        </p>
        <button
          onClick={() => {
            cancelEdit();
          }}
        >
          Cancel Edit
        </button>
        <button
          onClick={() => {
            submitPostEdit(grabIdFromReduxStoreTopic());
          }}
        >
          Submit Edit
        </button>
      </div>
    </div>
  ) : (
    <div id="card" className="card">
      <div id="postButtons" className="buttons">
        <button onClick={() => history.push("/homepage")}>Home</button>
        <button onClick={() => LogOut()}>Log Out</button>
      </div>

      <div className="posts">
        <p>Author :{grabUsernameFromReduxStoreTopic ()}</p>

        <p>Title :{grabTitleFromReduxStoreTopic ()}</p>

        <p>Description :{grabDescriptionFromReduxStoreTopic ()}</p>

        <div>
          <button onClick={() => editModeSwitch(true)}>Edit Post</button>
          <button onClick={() => {deleteCommentsWhenPostIsDeleted(grabIdFromReduxStoreTopic())}}>Delete Post</button>
        </div>

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
  );
};


export default IfisPostAuthor;
