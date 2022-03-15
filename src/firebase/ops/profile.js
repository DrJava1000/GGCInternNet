import { db } from '../firebase_init'; 

import { doc, getDoc, setDoc } from "firebase/firestore"; 
import { getStorage, ref, getDownloadURL, uploadBytes} from "firebase/storage";

export async function loadUserProfile(id){
    const docRef = doc(db, "profiles", "" + id);
    const docSnap = await getDoc(docRef); 

    if (docSnap.exists()) { 
        
        const firestoreProfInfo = docSnap.data(); 
        
        console.log("Document data:", firestoreProfInfo);
        
        const userDetails = {
            name: firestoreProfInfo.name,
            major: firestoreProfInfo.major,
            concentration: firestoreProfInfo.concentration,
            picFileName : firestoreProfInfo.picFileName,
            resumeFileName: firestoreProfInfo.resumeFileName
        }
        
        const storage = getStorage();
        
        // Get download link for profile pic
        await getDownloadURL(ref(storage, 'profile_pics/' + id + '/' + userDetails.picFileName))
            .then((url) => {
                userDetails.pic = url; 
            })
        
        // Get download link for 
        await getDownloadURL(ref(storage, "resumes/" + id + "/" + userDetails.resumeFileName))
            .then((url) => {
                userDetails.resume = url;
            })  
        
        return userDetails; 

    } else {
        console.log("No such document!");
    }
}

export async function updateUserProfile(userDetails){
    const profileRef = doc(db, "profiles", userDetails.id)
    await setDoc(profileRef, {
        name: userDetails.name, 
        major: userDetails.major,
        concentration: userDetails.concentration,
        picFileName : userDetails.pic.name,
        resumeFileName: userDetails.resume.name
    }, { 
        merge: true 
    });

    console.log("Profile Updated");

    const storage = getStorage();
    const picRef = ref(storage, 'profile_pics/' + userDetails.id + '/' + userDetails.pic.name);
    const resumeRef = ref(storage, "resumes/" + userDetails.id + "/" + userDetails.resume.name);

    await uploadBytes(picRef, userDetails.pic).then((snapshot) => {
        console.log('Uploaded a profile pic!');
    });

    await uploadBytes(resumeRef, userDetails.resume).then((snapshot) => {
        console.log('Uploaded a resume!');
    });
}