import React from 'react'
import {v4 as uuidv4} from "uuid";
import {useHistory} from "react-router-dom";
import {useLocation} from "react-router"
import {useDispatch, connect} from 'react-redux'
import axios from "axios";
import * as actions from "../../Redux/actions/blogRelated";
import {toast} from "react-toastify";


const IsNotNotCommentAuthor: React.FunctionComponent<any> = ({comments}) => {
    const history = useHistory();
    const location: any = useLocation()
    let commentRef = React.useRef<HTMLInputElement>(null)
    const dispatch = useDispatch()

    const LogOut = () => {
        localStorage.clear();
        history.push("/login");
    };


    const grabUsernameFromLocation = () => {
        if (location.state) {
            return location.state.post.items.username
        }
    }

    const grabTitleFromLocation = () => {
        if (location.state) {
            return location.state.post.items.title
        }
    }

    const grabDescriptionFromLocation = () => {
        if (location.state) {
            return location.state.post.items.description
        }
    }

    const grabIdFromLocation = () => {
        if (location.state) {
            return location.state.post.items.id
        }
    }

    const addComment = (id: Number) => {
        let commentValue = commentRef.current
        if (commentValue) {
            if (commentValue.value === "") {
                return toast.info('Can not add empty comment')
            } else {
                axios.post(`http://localhost:4000/addComment/${id}`, {
                    comment: commentValue.value,
                    username: localStorage.getItem('username')
                })
                    .then((res) => {
                        if (commentValue) {
                            let commentVal = commentValue.value
                            const {commentid} = res.data
                            dispatch(actions.addComment(commentVal, commentid))
                        }
                        console.log('--------comment', res.data);
                    })
                    .catch((err) => {
                        toast.info("Server error")
                        console.log('--------err', err);
                    })
            }
        }
    }



    return (

                <div id="card" className="card">
                    <div id="postButtons" className="buttons">
                        <button onClick={() => history.push("/homepage")}>Home</button>
                        <button onClick={() => history.push("/profile")}>My Profile</button>
                        <button onClick={() => LogOut()}>Log Out</button>
                    </div>
                    <div className="posts">
                        <p>
                            Author :
                            {grabUsernameFromLocation()}
                        </p>
                        <p>
                            Title :
                            {grabTitleFromLocation()}
                        </p>

                        <p>
                            Description :
                            {grabDescriptionFromLocation()}
                        </p>

                        <div>
                            <ul>
                                {
                                    comments.map((items: any) => {
                                        return (
                                            <p
                                                key={uuidv4()}
                                            >Comment :
                                                {items.comment}
                                            </p>
                                        );
                                    })}
                            </ul>
                        </div>
                        <div className="comments">
                            <input ref={commentRef} placeholder={'Write Comment'}/>
                            <button onClick={() => {
                                addComment(grabIdFromLocation())
                            }}>Add Comment
                            </button>
                        </div>
                    </div>
                </div>
    )
}

const mapStateToProps = (state: any) => {
    return {
        comments: state.comments,
    }
};

export default connect(mapStateToProps)(IsNotNotCommentAuthor)