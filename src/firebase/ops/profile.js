import { db } from '../firebase_init'; 

import { doc, getDoc, setDoc } from "firebase/firestore"; 
import { getStorage, ref, getDownloadURL, uploadBytes} from "firebase/storage";

export async function loadUserProfile(id){
    const docRef = doc(db, "profiles", "" + id);
    const docSnap = await getDoc(docRef); 

    if (docSnap.exists()) { 
        
        const firestoreProfInfo = docSnap.data(); 
        
        const userDetails = {
            name: firestoreProfInfo.name,
            major: firestoreProfInfo.major,
            concentration: firestoreProfInfo.concentration
        }
        
        const storage = getStorage();
        
        await getDownloadURL(ref(storage, 'profile_pics/' + id + '/' +firestoreProfInfo.picFileName))
            .then((url) => {
                userDetails.pic = url; 
            })
        
        await getDownloadURL(ref(storage, "resumes/" + id + "/" + firestoreProfInfo.resumeFileName))
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
    }, { 
        merge: true 
    });

    console.log("Profile Updated");

    const storage = getStorage();
    const picRef = ref(storage, 'profile_pics/' + userDetails.id + '/' + userDetails.pic.name);
    const resumeRef = ref(storage, "resumes/" + userDetails.id + "/" + userDetails.resume.name);

    if(userDetails.pic.name !== undefined){
        await uploadBytes(picRef, userDetails.pic).then((snapshot) => {
            console.log('Uploaded a profile pic!');
        });
        
        await setDoc(profileRef, {
            picFileName : userDetails.pic.name,
        }, { 
            merge: true 
        });
    }

    if(userDetails.resume.name !== undefined){
        await uploadBytes(resumeRef, userDetails.resume).then((snapshot) => {
            console.log('Uploaded a resume!');
        });

        await setDoc(profileRef, {
            resumeFileName: userDetails.resume.name
        }, { 
            merge: true 
        });
    }
}