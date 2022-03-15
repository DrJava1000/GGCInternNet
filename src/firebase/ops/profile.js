import { db } from '../firebase_init'; 

import { doc, getDoc } from "firebase/firestore"; 
import { getStorage, ref, getDownloadURL} from "firebase/storage";

export async function loadUserProfile(id){
    const docRef = doc(db, "profiles", "" + id);
    const docSnap = await getDoc(docRef); 

    if (docSnap.exists()) { 
        
        const firestoreProfInfo = docSnap.data(); 
        
        console.log("Document data:", firestoreProfInfo);
        
        const userDetails = {
            name: firestoreProfInfo.name,
            major: firestoreProfInfo.major,
            concentration: firestoreProfInfo.concentration
        }
        
        const storage = getStorage();
        
        // Get download link for profile pic
        await getDownloadURL(ref(storage, 'profile_pics/' + id + '/profile_pic.png'))
            .then((url) => {
                userDetails.pic = url; 
            })
        
        // Get download link for 
        await getDownloadURL(ref(storage, "resumes/" + id + "/resume.docx"))
            .then((url) => {
                userDetails.resume = url;
            })  
        
        return userDetails; 

    } else {
        console.log("No such document!");
    }
}