import { db } from '../firebase_init'; 

import { doc, getDoc, setDoc } from "firebase/firestore"; 
import { getStorage, ref, getDownloadURL, uploadBytes} from "firebase/storage";

// CREATE USER PROFILE
export async function createUserProfile(userDetails){
    userDetails.newAccount = true; 
    updateUserProfile(userDetails);
}

// UPDATE USER PROFILE
export async function updateUserProfile(userDetails){
    const profileRef = doc(db, "profiles", userDetails.id)
    await setDoc(profileRef, {
        name: userDetails.name, 
        major: userDetails.major,
        concentration: userDetails.concentration,
    }, { 
        merge: true 
    });

    const storage = getStorage();
    var picRef;
    var resumeRef;
    var logoStoragePath; 
    var resumeStoragePath; 

    // NEW ACCOUNT SETUP 
    if(userDetails.newAccount)
    {
        // for new accounts, use default logo and resume
        logoStoragePath = "profile_pics/default/grizzly_logo.PNG";
        resumeStoragePath = "resumes/default/resume_template.docx";
        
        picRef = ref(storage, logoStoragePath);
        resumeRef = ref(storage, resumeStoragePath);
        
        await setDoc(profileRef, {
            picFileName : logoStoragePath
        }, { 
            merge: true 
        });

        await setDoc(profileRef, {
            resumeFileName: resumeStoragePath
        }, { 
            merge: true 
        });
    }else{
        logoStoragePath = 'profile_pics/' + userDetails.id + '/' + userDetails.pic.name;
        resumeStoragePath = "resumes/" + userDetails.id + "/" + userDetails.resume.name;
        
        picRef = ref(storage, logoStoragePath);
        resumeRef = ref(storage, resumeStoragePath);
        
        if(userDetails.pic.name !== undefined){
            await uploadBytes(picRef, userDetails.pic).then((snapshot) => {
                console.log('Uploaded a profile pic!');
            });
            
            await setDoc(profileRef, {
                picFileName : logoStoragePath
            }, { 
                merge: true 
            });
        }

        if(userDetails.resume.name !== undefined){
            await uploadBytes(resumeRef, userDetails.resume).then((snapshot) => {
                console.log('Uploaded a resume!');
            });

            await setDoc(profileRef, {
                resumeFileName: resumeStoragePath
            }, { 
                merge: true 
            });
        }
    }
}

// LOAD USER PROFILE
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
        
        await getDownloadURL(ref(storage, firestoreProfInfo.picFileName))
            .then((url) => {
                userDetails.pic = url; 
            })
        
        await getDownloadURL(ref(storage, firestoreProfInfo.resumeFileName))
            .then((url) => {
                userDetails.resume = url;
            })  
        
        return userDetails; 

    } else {
        console.log("No such document!");
    }
}
