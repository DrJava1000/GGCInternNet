import { db } from '../firebase_init'; 

import { doc, getDoc, setDoc } from "firebase/firestore"; 
import { getStorage, ref, getDownloadURL, uploadBytes} from "firebase/storage";

// CREATE USER PROFILE
// Wrapper for updateUserProfile (for naming convenience)
// The newAccount attribute is used to let updateUserProfile know
// that incoming information is for a new account. 
export async function createUserProfile(userDetails){
    userDetails.newAccount = true; 
    updateUserProfile(userDetails);
}

// UPDATE USER PROFILE
export async function updateUserProfile(userDetails){
    const profileRef = doc(db, "profiles", userDetails.id)
    
    // Update name, major, and concentration
    // on account first.
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
        // that are stored in Firebase already
        logoStoragePath = "profile_pics/default/grizzly_logo.PNG";
        resumeStoragePath = "resumes/default/resume_template.docx";
        
        picRef = ref(storage, logoStoragePath);
        resumeRef = ref(storage, resumeStoragePath);
        
        // Link to default profile picture
        await setDoc(profileRef, {
            picFileName : logoStoragePath
        }, { 
            merge: true 
        });

        // Link to default resume
        await setDoc(profileRef, {
            resumeFileName: resumeStoragePath
        }, { 
            merge: true 
        });
    // UPDATE AN ALREADY-EXISTING ACCOUNT
    }else{
        logoStoragePath = 'profile_pics/' + userDetails.id + '/' + userDetails.pic.name;
        resumeStoragePath = "resumes/" + userDetails.id + "/" + userDetails.resume.name;
        
        picRef = ref(storage, logoStoragePath);
        resumeRef = ref(storage, resumeStoragePath);
        
        // If a new profile picture is being uploaded, proceed
        // but don't assume that a picture is always being updated
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

        // If a new resume is being uploaded, proceed
        // but don't assume that a resume is always being updated
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
        
        // Get name, major, and concentration
        const userDetails = {
            name: firestoreProfInfo.name,
            major: firestoreProfInfo.major,
            concentration: firestoreProfInfo.concentration
        }
        
        const storage = getStorage();
        
        // Create a downloadable link for the profile picture
        // from the linked file name
        // stored in the profile
        await getDownloadURL(ref(storage, firestoreProfInfo.picFileName))
            .then((url) => {
                userDetails.pic = url; 
            })
        
        // Create a downloadable link for the resume
        // from the linked file name
        // stored in the profile
        await getDownloadURL(ref(storage, firestoreProfInfo.resumeFileName))
            .then((url) => {
                userDetails.resume = url;
            })  
        
        return userDetails; 

    } else {
        console.log("No such document!");
    }
}

// FETCH USER ROLE (FROM PROFILE)
// 
// Firebase doesn't support user roles
// and, thus, a user's role has to be saved
// in Firestore and retrieved separately
export async function getRole(id){
    const docRef = doc(db, "profiles", "" + id);
    const docSnap = await getDoc(docRef); 

    if (docSnap.exists()) { 
        
        const firestoreProfInfo = docSnap.data(); 
        return firestoreProfInfo.role; 

    } else {
        console.log("No such document!");
    }
}
