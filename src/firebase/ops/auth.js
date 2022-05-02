import 
{
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut
} from "firebase/auth";
import { createUserProfile, getRole } from "./profile";

export const appAuthInstance = getAuth();

// CREATE AN ACCOUNT
export async function createAccount(email, password, name)
{
    var userInfo = {};
    
    await createUserWithEmailAndPassword(appAuthInstance, email, password)
    .then((userCredential) => {
        
        // Obtain id of new user
        userInfo.id = userCredential.user.uid; 
        // By default, accounts created from a public page
        // will have the 'STUDENT' or non-admin role
        userInfo.role = "STUDENT";
        
        // For new accounts,
        // specify an associated user profile 
        // with the new user's id, name, and a
        // default major and concentration.
        createUserProfile({
            id: userCredential.user.uid,
            name: name,
            major: "Information Technology",
            concentration: "Data Science & Analytics",
            role: "STUDENT"
        })
        console.log("User " + appAuthInstance.currentUser.email + " has been created successfully."); 
    })
    .catch((error) => {
        console.log("User account couldn't be created. See below.");
        console.log(error);
    });

    return userInfo; 
}

// LOGIN A USER
export async function login(email, password)
{
    var userInfo = {};

    await signInWithEmailAndPassword(appAuthInstance, email, password)
    .then(async (userCredential) => {
        // Obtain user's id from here
        userInfo.id = userCredential.user.uid;
        // Fetch user's role
        // Wait to ensure that account role can be retrieved
        await getRole(userCredential.user.uid).then(role => {
            userInfo.role = role;
            console.log("User " + userCredential.user.email + " has been signed in successfully."); 
        }).catch(error => {
            console.log(error); 
        })
    })
    .catch((error) => {
        console.log("You couldn't be signed in. See below");
        console.log(error);
    });

    return userInfo;
}

// LOGOUT USER
export async function logout()
{
    signOut(appAuthInstance)
    .then(() => {
        console.log("User has been signed out successfully.");
    }).catch((error) => {
        console.log("Signout failed. See below.");
        console.log(error);
    });
}