import React, { createContext, useReducer, useEffect } from 'react'
import { authReducer } from '../reducers/authReducer'

export const AuthContext = createContext()

function AuthContextProvider({ children }) {
    const [user, dispatch] = useReducer(authReducer, [] ,() =>{
        const localData = localStorage.getItem('user')
        return localData !== null || localData !== undefined  ? JSON.parse(localData) : undefined
    })
    
    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(user))
    },[user])

    return (
        <AuthContext.Provider value={{user , dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider
