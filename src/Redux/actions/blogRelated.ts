import {actionTypes} from "./actionTypes";

 export const LogedIn = () => {
    return {
        type:actionTypes.LOG_IN
    }
}

export const LogOut = () => {
    return {
        type:actionTypes.LOG_OUT
    }
}

export const addPost = (value : String) => {
     return {
         type:actionTypes.ADD_POST,
         value,
     }
}