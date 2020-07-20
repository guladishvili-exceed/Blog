import React, { useEffect, useState } from 'react'
import { useHistory, useRouteMatch } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";

import './profile.css'

import picture from './profile.jpg'
import icon from './icon.png'

import axios from "axios";

import * as reusableFunction from "../reusable functions/reusablefunctions";
import * as actions from "../../Redux/actions/blogRelated";


const Profile: React.FunctionComponent = () => {

  const history = useHistory()

  const [file, setFile] = useState()
  const [editMode, editModeSwitch] = useState()
  const [img, setImg] = useState()

  const match: any = useRouteMatch()
  const dispatch = useDispatch()

  let user: any = useSelector((state: any) => state.singleUser)
  console.log('--------user', user);
  let {avatar} = user

  const fileRef = React.createRef<HTMLImageElement>()
  const usernameRef = React.createRef<HTMLInputElement>()
  const ageRef = React.createRef<HTMLInputElement>()
  const genderRef = React.createRef<HTMLSelectElement>()


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
  }, [])


  const fileselectedHandler = (event: any): void => {
    setFile((event.target.files[0]))
    setImg(URL.createObjectURL(event.target.files[0]))
  }

  const fileuploadHandler = (e: any) => {
    e.preventDefault()
    const data = new FormData()
    data.append('avatar', file)
    axios.post(`http://localhost:4000/upload/${match.params.userId}`, data, {
      headers: {
        'Content-Type': 'multipart/form-data'
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

  const profileUpdateHandler = (id : Number) : void => {
    let usernameValue = usernameRef.current;
    let ageValue = ageRef.current;
    let genderValue = genderRef.current;
    
    if (usernameValue && ageValue && genderValue) {
      axios.put(`http://localhost:4000/updateProfile/${match.params.userId}`,{
        name : usernameValue.value,
        age : ageValue.value,
        gender : genderValue.value
      })
        .then((res) => {
          editModeSwitch(!editMode)
          window.location.reload(false);
          console.log('--------res', res);
        })
        .catch((err) => {
          console.log('--------err', err);
        })
    }
    
  }


  return editMode ? (
    <div className={'profileMain'}>
      <div className={'row'}>
        <div className={'container-left col-6'}>
          <img id={'avatar'} ref={fileRef} src={`http://localhost:4000/uploads/${avatar}`} width={'350'}
               alt={'picture'}/>
        </div>
        <div className={'container-right col-6 '}>
          <p>Username:<input ref={usernameRef} className={'editMode'} defaultValue={user.name}/></p>
          <p>Age :  <input ref={ageRef} className={'editMode'} defaultValue={user.age}/> </p>
          <p>Gender :  <select ref={genderRef} className={'editMode'}>
            <option>Male</option>
            <option>Female</option>
            <option>Other..</option>
          </select>
          </p>
          <button onClick={() => {profileUpdateHandler(match.params.id)}} className={'save'}>Save Changes</button>
          <button onClick={()=>{editModeSwitch(!editMode)}}>Cancel</button>
        </div>
      </div>
    </div>
  ) : (
    <div className={'profileMain'}>
      <div className={'row'}>
        <div className={'container-left col-6'}>
          <img id={'avatar'} ref={fileRef} src={`http://localhost:4000/uploads/${avatar}`} width={'350'}
               alt={'picture'}/>
        </div>
        <div className={'container-right col-6 '}>
          <p>Username:{user.name}</p>
          <p>Age : {user.age} </p>
          <p>Gender : {user.gender}</p>
          <label htmlFor="file-upload" className="custom-file-upload">
            Choose Picture
          </label>
          <input id={'file-upload'} name='avatar' onChange={fileselectedHandler} type={'file'}/>
          <button className={'uploadPicture'} onClick={fileuploadHandler}>Upload Picture</button>
          <button onClick={() => {
            editModeSwitch(!editMode)
          }} className={'edit'}>Edit Profile
          </button>
          <img className={'bootstrapHome'} src={icon} onClick={() => {history.push('/homePage')}}/>
        </div>
      </div>
    </div>
  )
}

export default Profile;