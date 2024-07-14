import { createContext, useState, useContext } from "react";
const UserContext = createContext({});

export function UserContextProvider({children} ) {
    const [user,setUser] = useState(null);
    const login = (user) => {
        setUser(user);
    }
    const logout = () => {setUser(null);}
    return(
        <UserContext.Provider value = {{user,login,logout}}>
            {children}
        </UserContext.Provider>
    )
}
export const useUserContext = () =>{
    return useContext(UserContext);
}