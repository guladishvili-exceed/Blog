import {actionTypes} from "./actions/actionTypes";
import {Reducer} from "redux";

interface IAppState {
    logedIn : Boolean;
    posts : Object[];
}

const initialState : IAppState = {
    logedIn  : false,
    posts : [{
        title:"",
        description:""
    }]
};
const reducer:Reducer = (state:IAppState= initialState, action : any) => {
    const {posts} = state
    switch (action.type) {
        case actionTypes.LOG_IN:
            return {
                ...state,
                logedIn: true
            }
        case actionTypes.LOG_OUT:
            return {
                ...state,
                logedIn: false
            }
        case actionTypes.ADD_POST:
            return {
                ...state,
                posts : [
                    ...posts,
                    {
                        title: action.value,
                        description:action.value
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