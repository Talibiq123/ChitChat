import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore, setDoc, doc, collection, where, getDocs, query } from "firebase/firestore";
// import { db } from "./firebase";
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
        toast.error(error.code.split('/')[1].split('-').join(" "))
    }
}



const login = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.error(error);
        toast.error(error.code.split('/')[1].split('-').join(" "))
    }
}

const logout = async () => {
    try {
        await signOut(auth);
    } catch (error) {
        console.error(error);
        toast.error(error.code.split('/')[1].split('-').join(" "))
    }
}

const resetPass = async (email, error) => {
    if (!email) {
        toast.error(error.message);
        return null;
    }
    try {
        const userRef = collection(db, 'user');
        const q = query(userRef, where("email", "==", email));
        const querySnap = await getDocs(q);
        if (!querySnap.empty) {
            await sendPasswordResetEmail(auth, email);
            toast.success("Reset Email Sent");
        } else {
            toast.error("Email doesn't exists")
        }
    } catch (error) {
        console.error(error);
        toast.error(error.message)
    }
}

export {signup, login, logout, auth, db, resetPass}
