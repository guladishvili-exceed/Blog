import React, {useEffect, useRef} from 'react'
import {useHistory} from 'react-router-dom'
import axios from 'axios'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './style.css'
import {bindActionCreators} from 'redux'
import {connect,useDispatch,useSelector} from 'react-redux'
import * as actions from '../../Redux/actions/blogRelated'

const Posts : React.FunctionComponent = () => {


    let titleRef = useRef<HTMLInputElement>(null)
    let descriptionRef = useRef<HTMLTextAreaElement>(null)
    const history = useHistory()
    const dispatch = useDispatch()
    const currentUser = useSelector(state => state)
    toast.configure()

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
                        if (titleValue) {
                            dispatch(actions.addPost(titleValue.value))
                        }

                        console.log('--------res', res);
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
                    <p>Topic Description</p>
                    <textarea  ref = {descriptionRef}  placeholder={'Topic Description'}/>
                </div>
                <div >
                    <button onClick={() => submitPost()} id={'submit'}>Add Topic</button>
                </div>
            </div>
        </div>
    )
}
// const mapStateToProps = (state : any) => {
//     return {
//         posts : state.posts
//     }
// }
//
// const mapDispatchToProps = (dispatch : any ) => {
//     return {
//         actions: bindActionCreators(
//             {
//             },
//             dispatch
//         ),
//     };
// };

export default Posts;

