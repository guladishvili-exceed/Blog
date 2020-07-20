import React, { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import { useHistory } from "react-router-dom";
import { useRouteMatch } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import { toast } from "react-toastify";
import axios from "axios";

import * as actions from "../../Redux/actions/blogRelated";
import * as reusableFunction from "../reusable functions/reusablefunctions";

import deleteIcon from './delete.png'
import accept from './accept.png'
import home from './home.png'
import cancelIcon from './cancel.png'
import editPost from './editPost.svg'
import './ifIsPostAuthor.css'

import Comments from "../CurrentPageComments/Comments";

const IfisPostAuthor: React.FunctionComponent<any> = () => {

  let commentRef = React.useRef<HTMLInputElement>(null);
  let titleRef = React.useRef<HTMLInputElement>(null)
  let descriptionRef = React.useRef<HTMLTextAreaElement>(null);

  const [editMode, editModeSwitch] = React.useState<boolean>(false);

  const topic: any = useSelector((state: any) => state.topic)
  const comments : any = useSelector((state : any) => state.comments)
  let pageCount = useSelector((state:any) => state.pageCount)
  let currentPage = useSelector((state : any) => state.currentPage)
  let itemsPerPage = useSelector((state : any) => state.itemsPerPage)

  const indexOfLasttItem = currentPage * itemsPerPage
  const indexOfFirstItem = (indexOfLasttItem - itemsPerPage)
  const currentComments = comments.slice(indexOfFirstItem, indexOfLasttItem)

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
          dispatch(actions.setCommentCount())
          console.log('--------res', res.data);
        })
    }
    getCurrentTopicDataFromBE()
  }, [])

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
    let titleValue = titleRef.current
      if (descriptionValue && titleValue) {
        axios
          .put(`http://localhost:4000/updateTopic/${id}`, {
            description: descriptionValue.value,
            title : titleValue.value
          })
          .then((post) => {
            window.location.reload(false);
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
              getAllCommentsOnCurrentPostFromBE(match.params.postId);
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
        dispatch(actions.getComment(res.data));
        dispatch(actions.setCommentCount())
      })
      .catch((err) => {
        console.log("--------err", err);
      });
  };

  return editMode ? (
    <div  className="postBody">
      <div className="postBtn">
        <button onClick={() => history.push("/homepage")}><img src={home} /></button>
      </div>
      <div className="posts">
        <p>Title : <input ref={titleRef} defaultValue={grabTitleFromReduxStoreTopic()}/></p>

        <p>
          <textarea
            ref={descriptionRef}
            defaultValue={grabDescriptionFromReduxStoreTopic()}
            placeholder={"Enter Description"}
          />
        </p>
        <button
          onClick={() => {
            cancelEdit();
          }}
        >
          <img src={cancelIcon}/>
        </button>
        <button
          onClick={() => {
            submitPostEdit(grabIdFromReduxStoreTopic());
          }}
        >
          <img src={accept}/>
        </button>
      </div>
    </div>
  ) : (
    <div  className="postBody">
      <div className="postBtn">
        <button onClick={() => history.push("/homepage")}><img src={home} /></button>
      </div>

      <div className="posts">
        <p>Author :{grabUsernameFromReduxStoreTopic ()}</p>

        <p>Title :{grabTitleFromReduxStoreTopic ()}</p>

        <p>Description :{grabDescriptionFromReduxStoreTopic ()}</p>

        <div>
          <button onClick={() => editModeSwitch(true)}><img src={editPost} /></button>
          <button onClick={() => {deleteCommentsWhenPostIsDeleted(grabIdFromReduxStoreTopic())}}><img src={deleteIcon}/></button>
        </div>

        <div>
          <ul>
            {currentComments.map((comment: any) => {
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
            {renderPagination()}
          </ul>
        </div>

        <div className="comments">
          <input ref={commentRef} placeholder={"Write Comment"}/>
          <button
            onClick={() => {
              addComment(match.params.postId);
            }}
          >
            <img src={accept} />
          </button>
        </div>
      </div>
    </div>
  );
};


export default IfisPostAuthor;
