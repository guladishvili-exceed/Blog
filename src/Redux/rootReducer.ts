import {actionTypes} from "./actions/actionTypes";
import {Reducer} from "redux";

interface IAppState {
    posts: object[];
    comments: object[];
    topic : object;
    users : object[];
    singleUser : object
}

const initialState: IAppState = {
    posts: [],
    comments: [],
    topic : [],
    users : [],
    singleUser : {}
};
const reducer: Reducer = (state: IAppState = initialState, action: any) => {
    const {posts,comments,topic,singleUser} = state
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
        case actionTypes.EDIT_COMMENT:
            const editedItems = comments.map((item: any) =>
              item.commentid !== action.id ? item : {...item, comment: action.value}
            );
            return {
                ...state,
                comments: editedItems,
            }

        case actionTypes.GET_USERS:
            return {
                ...state,
                users: action.users
            }
        case actionTypes.GET_USER:
            return {
                ...state,
                singleUser: action.singleUser
            }
        default:
            return {
                ...state,
            }
    }
}

export default reducer;