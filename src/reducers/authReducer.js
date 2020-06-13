export function authReducer(state,action){

    switch(action.type){
        case 'LOG_IN':
            return {...state,
                name: action.name,
                token: action.token,
                logged: true,
                extension: action.extension
            }
        case 'LOG_OUT':
            return {...state,
                logged: false,
            }
        default:
            return state
    }
}