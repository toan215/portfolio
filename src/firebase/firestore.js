import firebaseApp from "./init";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { collection, addDoc, getDocs } from "@firebase/firestore";

const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

export { db, storage,collection, addDoc, getDocs };
