import {actionTypes} from "./actionTypes";


export const addPost = (payload: Object) => {
    return {
        type: actionTypes.ADD_POST,
        payload,
    }
}

export const getPost = (posts : Object[] ) => {
    return {
        type : actionTypes.GET_POSTS,
        posts,
    }
}