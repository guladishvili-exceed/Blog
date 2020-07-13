import React, { useEffect, useState } from 'react'
import { useHistory, useRouteMatch } from 'react-router-dom'
import './style.css'
import picture from './profile.jpg'
import axios from "axios";
import * as reusableFunction from "../reusable functions/reusablefunctions";
import * as actions from "../../Redux/actions/blogRelated";
import { useDispatch, useSelector } from "react-redux";

const Profile = () => {

  const history = useHistory()
  const [img, newImg] = useState()
  const match : any = useRouteMatch()
  const dispatch = useDispatch()

  let user : any = useSelector((state : any) => state.singleUser)
  const fileRef = React.createRef<HTMLImageElement>()

  useEffect((): void => {
    reusableFunction.checkIfTokenIsPresented()
  });

  useEffect((): void => {
          axios
        .get(`http://localhost:4000/getUser/${match.params.userId}`)
        .then((users) => {
          dispatch(actions.getUser(users.data))
          console.log('--------img', img);
        })
        .catch((err) => {
          console.log('--------err', err);
        })
  },[])

  const fileselectedHandler = (event: any): void => {
    newImg(URL.createObjectURL(event.target.user.avatar[0]))
  }

  const fileuploadHandler = (): void => {
    const fd = new FormData()
    fd.append('avatar', img)
    axios.post(`http://localhost:4000/upload/${match.params.userId}`,fd)
      .then(res => {
        console.log(res)
        console.log('--------img', img);
      })
      .catch(err =>
        console.log('--------err', err)
      )
  }


  return (
    <div className={'card'}>
      <div className={'profile'}>
        <img ref={fileRef} src={user.avatar} width={'400'} alt={'picture'}/>
        <div>
          <input name='avatar' onChange={fileselectedHandler} type={'file'}/>
          <button onClick={fileuploadHandler}>Upload Picture</button>
        </div>
        <h1>Username:{localStorage.getItem('username')}</h1>
      </div>
      <div className={"navbar"}>
        <button onClick={() => history.push('/homepage')}>Home</button>
        <button onClick={() => history.push('/login')}>Log Out</button>
      </div>

    </div>
  )
}

export default Profile;