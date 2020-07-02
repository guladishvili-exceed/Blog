import {actionTypes} from "./actions/actionTypes";
import {Reducer} from "redux";

interface IAppState {
    posts : Object[];
}

const initialState : IAppState = {
    posts : []
};
const reducer:Reducer = (state:IAppState= initialState, action : any) => {
    const {posts} = state
    switch (action.type) {
        case actionTypes.ADD_POST:
            return {
                ...state,
                posts : [
                    ...posts,
                    {
                        title : action.payload.title,
                        description : action.payload.description,
                    }
                ]

            }
        case actionTypes.GET_POSTS:
            return {
                ...state,
                posts : action.posts
            }

        default:
            return {
                ...state,
            }
    }
}

export default reducer;