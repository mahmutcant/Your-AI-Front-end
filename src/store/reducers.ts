import { AppState, AppActionTypes, SET_USER} from './types'

const initialState : AppState = {
    user : null
}

const rootReducer = (state = initialState, action : AppActionTypes) : AppState => {
    switch (action.type){
        case SET_USER:
            return {
                ...state,
                user : action.payload,
            };
        default:
            return state
    }
}

export default rootReducer;