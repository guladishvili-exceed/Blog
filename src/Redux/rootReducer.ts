import {actionTypes} from "./actions/actionTypes";
import {Reducer} from "redux";

interface IAppState {
    posts: Object[];
    comments: Object[];
}

const initialState: IAppState = {
    posts: [],
    comments: []
};
const reducer: Reducer = (state: IAppState = initialState, action: any) => {
    const {posts,comments} = state
    switch (action.type) {
        case actionTypes.ADD_POST:
            return {
                ...state,
                posts: [
                    ...posts,
                    {
                        title: action.payload.title,
                        description: action.payload.description,
                    }
                ]

            }
        case actionTypes.GET_POSTS:
            return {
                ...state,
                posts: action.posts
            }
        case actionTypes.GET_COMMENT:
            console.log('--------action.comments', action.comments);
            return {
                ...state,
                comments: [...action.comments]
            }

        case actionTypes.ADD_COMMENT:
            return {
                ...state,
                posts : [
                    ...comments,
                    {
                        comment : action.payload.comment,
                    }
                ]

            }

        default:
            return {
                ...state,
            }
    }
}

export default reducer;