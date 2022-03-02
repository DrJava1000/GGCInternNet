import {db} from '../firebase_init'; 

import { collection, addDoc, getDocs } from "firebase/firestore"; 

export async function testFSAddOperation(){
    try {
    const docRef = await addDoc(collection(db, "users"), {
        first: "Ada",
        last: "Lovelace",
        born: 1815
    });
    console.log("Document written with ID: ", docRef.id);
    } catch (e) {
    console.error("Error adding document: ", e);
    }
}

export async function testFSReadOperation(){
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
    console.log(`Read from Firestore:  ${doc.id} => ${doc.data()}`);
    });
}