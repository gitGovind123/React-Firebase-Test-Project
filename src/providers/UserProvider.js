import React, {useState, useEffect,  createContext} from "react";
import { auth } from "../services/firebase"
export const UserContext = createContext({user: null})

export default (props) => {
    const [user, setuser] = useState(null)
    useEffect(() => {
        auth.onAuthStateChanged(async (user) => {
            console.log(user)
            if(user){
                const { displayName, email }  = user;
                setuser({
                   displayName,
                   email
               })
            }else {
                setuser(null)
            }
        })
    },[])
    return (
        <UserContext.Provider value={user}>{props.children}</UserContext.Provider>
    )
}