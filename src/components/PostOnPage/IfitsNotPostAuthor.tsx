import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useRouteMatch } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";

import * as actions from "../../Redux/actions/blogRelated";
import { v4 as uuidv4 } from "uuid";
import * as reusableFunction from "../reusable functions/reusablefunctions";
import Comments from "../CurrentPageComments/Comments";

import accept from './accept.png'
import home from './home.png'
import './ifItsNotPostAuthor.css'


const IfitsNotPostAuthor: React.FunctionComponent<any> = () => {

  const history = useHistory();
  const match: any = useRouteMatch();
  const dispatch = useDispatch();


  const topic: any = useSelector((state: any) => state.topic)
  const comments: any = useSelector((state: any) => state.comments)
  let pageCount = useSelector((state:any) => state.pageCount)
  let currentPage = useSelector((state : any) => state.currentPage)
  let itemsPerPage = useSelector((state : any) => state.itemsPerPage)

  const indexOfLasttItem = currentPage * itemsPerPage
  const indexOfFirstItem = (indexOfLasttItem - itemsPerPage)
  const currentComments = comments.slice(indexOfFirstItem, indexOfLasttItem)


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
              getAllCommentsOnCurrentPostFromBE(grabIdFromReduxStoreTopic());

          })
          .catch((err) => {
            toast.info("Server error");
            console.log("--------err", err);
          });
      }
    }
  };


  return (<div className="postBody1">

      <div className="postBtn1">
        <button onClick={() => history.push("/homepage")}><img src={home}/></button>
      </div>

      <div className="posts1">
        <p>Author :{grabUsernameFromReduxStoreTopic()}</p>

        <p>Title :{grabTitleFromReduxStoreTopic()}</p>

        <p>Description :{grabDescriptionFromReduxStoreTopic()}</p>

        <div>
          <ul>
            {currentComments.map((comment: any) => {
              if (comment.username === username) {
                return (
                  <Comments
                    key={uuidv4()}
                    comment={comment}
                    topicid={grabIdFromReduxStoreTopic()}/>
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
  )
};


export default IfitsNotPostAuthor;
