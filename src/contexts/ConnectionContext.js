
import React, { createContext, useReducer } from 'react'
import { ConnectionReducer } from '../reducers/connectionReducer'

export const ConnectionContext = createContext()

function ConnectionContextProvider({children}) {
    const [connection, dispatch] = useReducer(ConnectionReducer, {
        ip: 'http://192.168.1.16:3001'   
    })

    return (
        <ConnectionContext.Provider value={{connection, dispatch}}>
            {children}
        </ConnectionContext.Provider>
    )
}

export default ConnectionContextProvider