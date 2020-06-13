export function ConnectionReducer(state, action){
    switch(action.type){    
        case 'SET':
            return {...state, ip: `http://${action.ip}:3001`}
        default:
            return state
    }
}

