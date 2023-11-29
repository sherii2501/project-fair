import React, { createContext, useState } from 'react'
export const addProjectResponseContext = createContext()
export const editProjectResponseContent = createContext()
function ContextShare({ children }) {
    const [addProjectResponse, setAddProjectResponse] = useState({})
    const [editProjectResponse,setEditProjectResponse]=useState({})
    return (
        <>
            <addProjectResponseContext.Provider value={{ addProjectResponse, setAddProjectResponse }}>
                <editProjectResponseContent.Provider value={{editProjectResponse,setEditProjectResponse}} >
                {children}
                </editProjectResponseContent.Provider>
            </addProjectResponseContext.Provider>
        </>
    )
}

export default ContextShare