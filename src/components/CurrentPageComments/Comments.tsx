import React from 'react'
import { v4 as uuidv4 } from "uuid";
import axios from 'axios'
import { useDispatch} from "react-redux";
import * as actions from "../../Redux/actions/blogRelated";



const Comments : React.FunctionComponent<any> = ({comment,topicid}) => {
  const [commentMode, commentEditModeSwitch] = React.useState<boolean>(false)

  const editModeCommentRef  = React.useRef<HTMLInputElement>(null)


  const dispatch = useDispatch()


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

  const deleteComment = (id: Number): void => {
    axios
      .delete(`http://localhost:4000/deleteComment/${id}`)
      .then((res) => {
        getAllCommentsOnCurrentPostFromBE(topicid);
        console.log("--------res", res);
      })
      .catch((err) => {
        console.log("--------err", err);
      });
  };

  const submitCommentEdit = (id: Number): void => {
    let commentEditModeValue = editModeCommentRef.current
    if (commentEditModeValue) {
      axios.put(`http://localhost:4000/editComment/${id}`, {
        comment: commentEditModeValue.value
      })
        .then((res) => {
          commentEditModeSwitch(!commentMode)
          getAllCommentsOnCurrentPostFromBE(topicid);
          console.log('--------res', res);
        })
        .catch((err) => {
          console.log('--------err', err);
        })
    }
  }

  const cancelCommentEdit = () : void => {
    commentEditModeSwitch(!commentMode)
  }


  return commentMode ? (
    <div>
      <input ref={editModeCommentRef} defaultValue={comment.comment} />
      <button onClick={() => {cancelCommentEdit()}}>Cancel edit</button>
      <button onClick={() => {submitCommentEdit(comment.commentid)}}>Submit edit</button>
    </div>

  ) : (
    <div>
      <ul>
              <div key={uuidv4()}>
                <label>{comment.comment}</label>
                <button onClick={() => commentEditModeSwitch(!commentMode)}>Edit</button>
                <button onClick={() => {
                  deleteComment(comment.commentid)
                }}>Delete
                </button>
              </div>
      </ul>
    </div>
  )
}

export default Comments;