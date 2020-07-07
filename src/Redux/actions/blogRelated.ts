import {actionTypes} from "./actionTypes";
import {act} from "react-dom/test-utils";


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

export const getComment = (comments : Object[]) => {
    return {
        type : actionTypes.GET_COMMENT,
        comments
    }
}

export const addComment = (payload : any) => {
    return {
        type: actionTypes.ADD_COMMENT,
        payload
    }
}