import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";
const firebaseConfig = {
  apiKey: "AIzaSyDrhw96hHSwOw4EIH9Eup3MiVRyUVIeTNc",
  authDomain: "netflix-clone-d1c1d.firebaseapp.com",
  projectId: "netflix-clone-d1c1d",
  storageBucket: "netflix-clone-d1c1d.firebasestorage.app",
  messagingSenderId: "1064440461530",
  appId: "1:1064440461530:web:1a1af85e8be5f5f0664de3",
  measurementId: "G-CQ2PV3HQWF",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
  try {
    const response = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = response.user;
    await addDoc(collection(db, "user"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (error) {
    console.log(`Error Occurred : ${error}`);
    toast.error(error.code.split('/')[1].split('-').join(" "));
  }
};

const login = async (email, passowrd) => {
  try {
    await signInWithEmailAndPassword(auth, email, passowrd);
  } catch (error) {
    console.log(error);
    toast.error(error.code.split("/")[1].split("-").join(" "));
  }
};

const logout = async () => {
  signOut(auth);
};

export { auth, db, login, logout, signup };
