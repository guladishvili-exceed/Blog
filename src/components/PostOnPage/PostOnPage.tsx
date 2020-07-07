import React, {useEffect} from "react";
import {useLocation} from "react-router"
import {Link, useHistory} from "react-router-dom";
import { useDispatch, useSelector} from 'react-redux'
import * as actions from '../../Redux/actions/blogRelated'
import {v4 as uuidv4} from "uuid";
import "./style.css";
import axios from "axios";
import {toast} from "react-toastify";


const PostOnPage: React.FunctionComponent<any> = () => {


    //Checks if token is presented
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

    useEffect(() => {
        console.log('-------hello');
    })

    const LogOut = () => {
        localStorage.clear();
        history.push("/login");
    };

    //Hooks

    const history = useHistory();
    const location: any = useLocation()
    const [editMode, editModeSwitch] = React.useState<boolean>(false)
    let descriptionRef = React.useRef<HTMLTextAreaElement>(null)
    let commentRef = React.useRef<HTMLInputElement>(null)
    const dispatch = useDispatch()
    let posts: any = useSelector((state: any) => state.posts);


    // - - - - - - - - - - - - - - - - - - -

    //Functions which grabs different values from "items" key in "state" object

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

    const grabUsernameFromLocation = () => {
        if (location.state) {
            return location.state.post.items.username
        }
    }

    const grabCommentsFromLocation = () => {
        if (location.state) {
            let commentArray = location.state.post.items.comment
            let listItems = commentArray.map((item: Object[]) => {return <p key={uuidv4()}>{item}</p>})
            return listItems
        }
    }

// - - - - - - -- - - - - - - -- - - - - - -- - -

    //Delete post from DB and Page
    const deletePost = (id: Number) => {
        if (location.state) {
            axios.delete(`http://localhost:4000/deleteTopic/${id}`)
                .then((post) => {
                    history.push('/homepage')
                    console.log('--------post', post);
                })
                .catch((err) => {
                    console.log('--------err', err);
                })
        }
    }

    //Update post in DB and Page
    const submitEdit = (id: Number) => {
        let descriptionValue = descriptionRef.current
        if (location.state) {
            if (descriptionValue) {
                axios.put(`http://localhost:4000/updateTopic/${id}`, {
                        description: descriptionValue.value
                    }
                )
                    .then((post) => {
                        console.log('--------post', post);
                        if (descriptionValue) {
                            location.state.post.items.description = descriptionValue.value
                        }
                        editModeSwitch(false)
                    })
                    .catch((err) => {
                        console.log('--------err', err);
                    })
            }
        }
    }

    //Add Comment
    let commentarr : Object[]  = []
    const addComment = (id: Number) => {
        let commentValue = commentRef.current
        if (commentValue) {
            if (commentValue.value === "") {
                return toast.info('Can not add empty comment')
            } else {
                commentarr.push(commentValue.value)
                axios.post(`http://localhost:4000/addComment/${id}`, {
                    comment: posts.comment
                })
                    .then((res) => {
                        if (commentValue) {
                            let commentVal = commentValue.value
                            console.log('--------commentVal', commentVal);
                            dispatch(actions.addComment({comment: commentVal}))
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

    //Get all comments on current post
    const getAllCommentsOnCurrentPostFromBE = (id: Number) => {
        axios.get(`http://localhost:4000/getComment/${id}`)
            .then(res => {
                console.log('--------posts', posts);
                console.log('--------res,get', res.data);
            })
            .catch(err => {
                console.log('--------err', err);
            })
    }

    getAllCommentsOnCurrentPostFromBE(grabIdFromLocation())


    const cancelEdit = () => {
        let descriptionValue = descriptionRef.current
        if (location.state && descriptionValue) {
            descriptionValue.value = location.state.post.items.description
        }
        editModeSwitch(false)
    }

    const checkUser = () => {
        if (location.state) {
            if (location.state.post.items.username === localStorage.getItem('username') || localStorage.getItem('username') === 'admin') {
                return true
            } else {
                return false
            }
        }
    }


    return (
        editMode ? (
            <div id="card" className="card">
                <div id="postButtons" className="buttons">
                    <button onClick={() => history.push("/homepage")}>Home</button>
                    <button onClick={() => history.push("/profile")}>My Profile</button>
                    <button onClick={() => LogOut()}>Log Out</button>
                </div>
                <div className="posts">
                    <p>
                        Title :
                        {grabTitleFromLocation()}
                    </p>

                    <p>
                        <textarea ref={descriptionRef} placeholder={'Enter Text'}/>
                    </p>
                    <button onClick={() => {
                        cancelEdit()
                    }}>Cancel Edit
                    </button>
                    <button onClick={() => {
                        submitEdit(grabIdFromLocation())
                    }}>Submit Edit
                    </button>
                </div>
            </div>
        ) : checkUser() ? (
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
                        <div>
                            <button onClick={() => {
                                deletePost(grabIdFromLocation())
                            }}>Delete Post
                            </button>
                            <button onClick={() => {
                                editModeSwitch(true)
                            }}>Edit Post
                            </button>
                        </div>
                        <ul>
                            {Array.isArray(posts) &&
                            posts.map((items: any) => {
                                return (
                                    <div>
                                        <p
                                            key={uuidv4()}
                                        >{items.comment}
                                            <button>Delete</button>
                                        </p>
                                    </div>
                                );
                            })}
                        </ul>
                    </div>

                    <div>

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

        ) : (
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

                    <div>
                        <ul>
                            {Array.isArray(posts) &&
                            posts.map((items: any) => {
                                return (
                                    <p
                                        key={uuidv4()}
                                    >{items.comment}
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
    );
};

export default PostOnPage;
