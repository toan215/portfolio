import firebaseApp from "./init";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc, getDoc } from "firebase/firestore";

const db = getFirestore(firebaseApp);
export { db, collection, addDoc, getDoc };
