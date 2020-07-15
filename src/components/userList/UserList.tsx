import React from 'react'
import { v4 as uuidv4 } from "uuid";
import axios from 'axios'
import { useDispatch } from "react-redux";
import * as actions from "../../Redux/actions/blogRelated";
import { toast } from "react-toastify";

const UserList: React.FunctionComponent<any> = ({users}) => {

  let dispatch = useDispatch()

  let [editMode, switchEditMode] = React.useState(false)
  let inputRef = React.useRef<HTMLInputElement>(null)

  const getAllUsers = (): void => {
    axios
      .get("http://localhost:4000/getUsers")
      .then((res) => {
        dispatch(actions.getUsers(res.data));
        console.log("--------res", res.data);
      })
      .catch((err) => {
        console.log("--------err", err);
      });
  }

  const deleteUser = (id: Number): void => {
    axios
      .delete(`http://localhost:4000/deleteUser/${id}`)
      .then((res) => {
        console.log('--------res', res);
        getAllUsers()
      })
      .catch((err) => {
        console.log('--------err', err);
      })
  }

  const changeUserRole = (id : Number) : void => {
    let inputRefVallue = inputRef.current
    if (inputRefVallue) {
      if (inputRefVallue.value === "user" || "admin") {
        axios
          .put(`http://localhost:4000/updateUserRole/${id}`,{
            role : inputRefVallue.value
          })
          .then((user) => {
            console.log('--------role', user);
            getAllUsers()
            switchEditMode(!editMode)
          })
          .catch((err) => {
            console.log('--------err', err);
          })
      } else {
        toast.info('There are only 2 roles:admin and user')
      }
    }
  }

  const cancelEdit = () => {
    switchEditMode(!editMode)
  }

  return editMode ? (
    <div key={uuidv4()}>
      <li>{users.username}
        <button onClick={() => {
          deleteUser(users.id)
        }}>Delete
        </button>
      </li>
      <input ref={inputRef} placeholder={'Enter new role...'}/>
      <button onClick={() => {changeUserRole(users.id)}}>Submit edit</button>
      <button onClick={() => {cancelEdit()}}>Cancel edit</button>
    </div>
  ) : (
    <div key={uuidv4()}>
      <li>User Id : {users.id}
        <button onClick={() => {
          deleteUser(users.id)
        }}>Delete
        </button>
      </li>
      <p>Role : {users.role}
        <button onClick={() => {
          switchEditMode(!editMode)
        }}>Edit Role
        </button>
      </p>
    </div>
  )

}

export default UserList;