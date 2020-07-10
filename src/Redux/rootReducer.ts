import {actionTypes} from "./actions/actionTypes";
import {Reducer} from "redux";

interface IAppState {
    posts: Object[];
    comments: any;
    topic : any;
}

const initialState: IAppState = {
    posts: [],
    comments: [],
    topic : []
};
const reducer: Reducer = (state: IAppState = initialState, action: any) => {
    const {posts,comments,topic} = state
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
            return {
                ...state,
                comments: [...action.comments]
            }

        case actionTypes.ADD_COMMENT:
            return {
                ...state,
                comments : [
                    ...comments,
                    {
                        comment : action.payload,
                        commentid : action.id
                    }
                ]

            }

        case action.DELETE_COMMENT:
            return {
                ...state ,
                comments : comments.filter((item : any) => item.commentid !== action.id)
            }

        case actionTypes.GET_TOPIC:
            return {
                ...state,
                topic: {...action.topic}
            }

        default:
            return {
                ...state,
            }
    }
}

export default reducer;