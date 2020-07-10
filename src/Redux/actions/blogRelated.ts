import {actionTypes} from "./actionTypes";


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

export const addComment = (payload: any, id : any) => {
    return {
        type: actionTypes.ADD_COMMENT,
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
