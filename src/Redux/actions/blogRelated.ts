import { actionTypes } from "./actionTypes";


export const addPost = (payload: Object) => {
  return {
    type: actionTypes.ADD_POST,
    payload,
  }
}

export const getPost = (posts: Object[]) => {
  return {
    type: actionTypes.GET_POSTS,
    posts,
  }
}

export const getComment = (comments: Object[]) => {
  return {
    type: actionTypes.GET_COMMENT,
    comments
  }
}

export const addComment = (payload: any, id: any) => {
  return {
    type: actionTypes.ADD_COMMENT,
    payload,
    id
  }
}

export const editComment = (payload: any, id: any) => {
  return {
    type: actionTypes.EDIT_COMMENT,
    payload,
    id
  }
}

export const getTopic = (topic: Object[]) => {
  return {
    type: actionTypes.GET_TOPIC,
    topic,
  }
}

export const getUsers = (users: Object[]) => {
  return {
    type: actionTypes.GET_USERS,
    users,
  }
}

export const getUser = (singleUser: Object) => {
  return {
    type: actionTypes.GET_USER,
    singleUser,
  }
}

export const setPageCount = () => {
  return {
    type:actionTypes.PAGE_COUNT
  }
}

export const changePage = (page : any) => {
  return {
    type:actionTypes.CHANGE_PAGE,
    page
  }
}