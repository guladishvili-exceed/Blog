import React, {useEffect, useRef} from 'react'
import {useHistory} from 'react-router-dom'
import axios from 'axios'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './style.css'
import { useDispatch, useSelector} from 'react-redux'
import * as actions from '../../Redux/actions/blogRelated'
import * as reusableFunction from "../reusable functions/reusablefunctions";

const Posts : React.FunctionComponent = () => {


    let titleRef = useRef<HTMLInputElement>(null)
    let descriptionRef = useRef<HTMLTextAreaElement>(null)
    const history = useHistory()
    const dispatch = useDispatch()
    let posts : any = useSelector((state : any)  => state.posts)
    toast.configure()

    //Checks if token is presented
    useEffect(() => {
        reusableFunction.checkIfTokenIsPresented()
    });



    //Add Post to the page
    const submitPost = () => {
        let titleValue  = titleRef.current
        let descriptionValue = descriptionRef.current
        if (titleValue && descriptionValue) {
            if ( titleValue.value  === '' || descriptionValue.value === '' ) {
                toast.info('Could not add new topic')
            } else {
                axios.post(`http://localhost:4000/addPost`, {
                    title : titleValue.value,
                    description : descriptionValue.value,
                    username : localStorage.getItem('username')
                })
                    .then((res) => {
                        toast.info('Topic added succesfuly')
                        history.push('/homepage')
                        const { title,description,username } = res.data
                        if (titleValue && descriptionValue) {
                            dispatch(actions.addPost({title,description,username}))
                        }
                        console.log('--------res', res);
                        console.log('--------posts', posts.id);
                    })
                    .catch((err) => {
                        console.log('--------err', err);
                    })
            }
        }
    }

    return (
        <div className={'flex-box-container'}>
            <div className="card">
                <div className="buttons">
                    <button onClick={() => {history.push('/homepage')}}>Home</button>
                    <button onClick={() => {history.push('/login')}}>Log Out</button>
                </div>
                <div className="inputs">
                    <p>Topic Title</p>
                    <input type={'text'} ref = {titleRef} placeholder={'Topic Title'} />
                    <p>Topic Description  </p>
                    <textarea  ref = {descriptionRef}  placeholder={'Topic Description'}/>
                </div>
                <div >
                    <button onClick={() => submitPost()} id={'submit'}>Add Topic</button>
                </div>
            </div>
        </div>
    )
}


export default Posts;

