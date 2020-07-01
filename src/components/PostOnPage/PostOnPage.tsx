import React,{useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import './style.css'
import axios from 'axios'
import {toast} from "react-toastify";


const PostOnPage:React.FunctionComponent = () => {
    useEffect(() => {
        axios
            .get(`http://localhost:4000/`,{
                headers : {
                    "auth-token" : localStorage.getItem("auth-token")}
            })
            .then((res) => {
                console.log('--------res.data', res.data);
            })
            .catch((err) => {
                console.log("err", err);
                toast.info('You must Log In')
                history.push('/login')
            });
    })
    const LogOut = () => {
        localStorage.clear()
        history.push('/login')
    }

    const history = useHistory()
    return (
        <div id='card' className='card'>
            <div id = 'postButtons' className="buttons">
                <button onClick = {() => history.push('/homepage')}>Home</button>
                <button onClick = {() => history.push('/profile')}>My Profile</button>
                <button onClick = {() => LogOut()}>Log Out</button>
            </div>
            <div className="posts">
                <p>Title</p>

                <p>Description</p>
            </div>
        </div>
    )
}


export default PostOnPage;