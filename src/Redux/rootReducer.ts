import {actionTypes} from "./actions/actionTypes";
import {Reducer} from "redux";

interface IAppState {
    posts: object[];
    comments: object[];
    topic : object;
    users : object[];
    singleUser : object;
    currentPage : number;
    pageCount : number;
    itemsPerPage : number;
}

const initialState: IAppState = {
    posts: [],
    comments: [],
    topic : [],
    users : [],
    singleUser : {},
    currentPage: 1,
    pageCount: 1,
    itemsPerPage:4,
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

        case actionTypes.PAGE_COUNT:
            const setPageCount = Math.ceil(posts.length / 4)
            return {
                ...state,
                pageCount: setPageCount
            }

        case actionTypes.COMMENT_COUNT :
            const setCommentCount = Math.ceil(comments.length / 4)
            return {
                ...state,
                pageCount: setCommentCount
            }

        case actionTypes.CHANGE_PAGE:
            return {
                ...state,
                currentPage: action.page
            }

        default:
            return {
                ...state,
            }
    }
}

export default reducer;