import React, { useEffect, useState } from 'react'
import { useHistory, useRouteMatch } from 'react-router-dom'
import './profile.css'
import picture from './profile.jpg'
import axios from "axios";
import * as reusableFunction from "../reusable functions/reusablefunctions";
import * as actions from "../../Redux/actions/blogRelated";
import { useDispatch, useSelector } from "react-redux";

const Profile : React.FunctionComponent = () => {

  const history = useHistory()
  const [file, setFile] = useState()
  const [img,setImg] = useState()
  const match : any = useRouteMatch()
  const dispatch = useDispatch()

  let user : any = useSelector((state : any) => state.singleUser)
  let {avatar} = user
  let {role} = user
  const fileRef = React.createRef<HTMLImageElement>()

  useEffect((): void => {
    reusableFunction.checkIfTokenIsPresented()
  });
// Get Current User Information
  useEffect((): void => {
          axios
        .get(`http://localhost:4000/getUser/${match.params.userId}`)
        .then((users) => {
          dispatch(actions.getUser(users.data))
        })
        .catch((err) => {
          console.log('--------err', err);
        })
  },[])


  const fileselectedHandler = (event: any): void => {
    setFile((event.target.files[0]))
    setImg(URL.createObjectURL(event.target.files[0]))
  }
  const fileuploadHandler = (e : any)  => {
    e.preventDefault()
    const data = new FormData()
    data.append('avatar', file)
      axios.post(`http://localhost:4000/upload/${match.params.userId}`,data, {
        headers : {
          'Content-Type' : 'multipart/form-data'
        }
      })
        .then(res => {
          console.log(res)
          window.location.reload(false)
        })
        .catch(err =>
          console.log('--------err', err)
        )

  }
  
  const checkUser = () => {
    if (role === 'admin') {
      return true
    } else {
     return false
    }
  }


  return role === 'admin' ? (
      <div className={'card'}>
        <div className={'profile'}>
          <img ref={fileRef} src={`http://localhost:4000/uploads/${avatar}`} width={'350'} alt={'picture'}/>
          <div>
            <input name='avatar' onChange={fileselectedHandler} type={'file'}/>
            <button onClick={fileuploadHandler}>Upload Picture</button>
          </div>
          <h1>Username:{user.username}</h1>
        </div>
        <div className={"navbar"}>
          <button onClick={() => history.push('/adminPanel')}>Admin Panel</button>
          <button onClick={() => history.push('/homepage')}>Home</button>
          <button onClick={() => history.push('/login')}>Log Out</button>
        </div>

      </div>
    ):
  (
    <div className={'card'}>
      <div className={'profile'}>
        <img ref={fileRef} src={`http://localhost:4000/uploads/${avatar}`} width={'350'}  alt={'picture'}/>
        <div>
          <input name='avatar' onChange={fileselectedHandler} type={'file'}/>
          <button onClick={fileuploadHandler}>Upload Picture</button>
        </div>
        <h1>Username:{user.username}</h1>
      </div>
      <div className={"navbar"}>
        <button onClick={() => history.push('/homepage')}>Home</button>
        <button onClick={() => history.push('/login')}>Log Out</button>
      </div>

    </div>
  )
}

export default Profile;