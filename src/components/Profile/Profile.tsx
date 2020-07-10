import React, {useEffect,useState} from 'react'
import {useHistory} from 'react-router-dom'
import './style.css'
import picture from './profile.jpg'
import axios from "axios";
import {toast} from "react-toastify";
import * as reusableFunction from "../reusable functions/reusablefunctions";

const Profile = () => {

  useEffect(() => {
    reusableFunction.checkIfTokenIsPresented()
  });


    const fileselectedHandler = (event : any) => {
            newImg(URL.createObjectURL(event.target.files[0]))
        console.log('--------img', img);
    }


    const fileuploadHandler = () => {
        const fd = new FormData()
        fd.append('avatar',img)
        axios.post(`http://localhost:4000/upload`,fd)
            .then(res => {
                console.log(res)
                console.log('--------img', img);
            })
            .catch(err =>
                console.log('--------err', err)
            )
    }

    const history = useHistory()
    const [img,newImg] = useState()
    const fileRef = React.createRef<HTMLImageElement>()

    return (
        <div className={'card'}>
            <div className = {'profile'}>
            <img ref={fileRef} src={img} width={'400'} alt={'picture'} />
            <div>
                <input  name = 'avatar' onChange={fileselectedHandler} type={'file'} />
                <button onClick={fileuploadHandler}>Upload Picture</button>
            </div>
            <h1>Username:{localStorage.getItem('username')}</h1>
            </div>
            <div className={"navbar"}>
              <button onClick = {() => history.push('/homepage')}>Home</button>
              <button onClick = {() => history.push('/login')}>Log Out</button>
          </div>

        </div>
    )
}

export default Profile;