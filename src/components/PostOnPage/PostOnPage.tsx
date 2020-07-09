import React, {useEffect} from "react";
import {useLocation} from "react-router"
import {useHistory} from "react-router-dom";
import {useDispatch, connect} from 'react-redux'
import * as actions from '../../Redux/actions/blogRelated'
import "./style.css";
import axios from "axios";
import {toast} from "react-toastify";
import IfitsNotPostAuthor from "./IfitsNotPostAuthor";
import IfisPostAuthor from "./IfisPostAuthor";
import IsCommentAuthor from "./IsCommentAuthor";


const PostOnPage: React.FunctionComponent<any> = ({comments}) => {

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

    // Render all comments when component did mount stuff happens
    useEffect(() => {
        const getAllCommentsOnCurrentPostFromBE = (id: Number) => {
            axios.get(`http://localhost:4000/getComment/${id}`)
                .then(res => {
                    console.log('--------res,get', res.data);
                    dispatch(actions.getComment(res.data))
                })
                .catch(err => {
                    console.log('--------err', err);
                })
        }
        getAllCommentsOnCurrentPostFromBE(grabIdFromLocation())
    }, [])

    const history = useHistory();
    const location: any = useLocation()
    const dispatch = useDispatch()


    const grabIdFromLocation = () => {
        if (location.state) {
            return location.state.post.items.id
        }
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
            checkUser() ? (
                <IfisPostAuthor/>
            ) : (
               <IfitsNotPostAuthor/>
            )
    );
};


const mapStateToProps = (state: any) => {
    return {
        comments: state.comments,
    }
};

export default connect(mapStateToProps)(PostOnPage);
