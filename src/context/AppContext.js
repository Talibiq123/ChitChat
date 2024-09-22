import { doc, getDoc } from "firebase/firestore";
import { createContext, useState } from "react";
import { db } from "../config/firebase";

export const AppContext = createContext();

const AppContextProvider = (props) => {

    const [userData, setuserData] = useState(null);
    const [chatData, setChatData] = useState(null);

    const loadUserData = async (uid) => {
        try {
            const userRef = doc(db, 'user', uid);
            const userSnap = await getDoc(userRef);
            const userData = userSnap.data();
            // console.log(userData);
            setuserData(userData);
            
        } catch (error) {
            
        }
    }

    const value = {
        userData, setuserData,
        chatData, setChatData,
        loadUserData
    }

    return (
        <AppContext.Provider value={value}>
           {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;