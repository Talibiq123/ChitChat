import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { getFirestore, setDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyCVb7ORGlI8jyev8eTyRPnBvYM1k_xMDeE",
  authDomain: "chitchat-mt.firebaseapp.com",
  projectId: "chitchat-mt",
  storageBucket: "chitchat-mt.appspot.com",
  messagingSenderId: "605254540221",
  appId: "1:605254540221:web:3121e3b95ad0db3c6a50d4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Our code
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (username, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await setDoc(doc(db, "user", user.uid), {
            id: user.uid,
            username: username.toLowerCase(),
            email,
            name: "",
            avatar: "",
            bio: "Hey there! I'm using chitChat",
            lastSeen: Date.now()
        })

        await setDoc(doc(db, "chats", user.uid), {
            chatData: [],
        })
    } catch (error) {
        console.error(error)
        toast.error(error.code)
    }
}

export {signup}
