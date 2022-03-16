import 
{
    getAuth, 
    onAuthStateChanged,
    createUserWithEmailAndPassword, 
    updateProfile,
    signInWithEmailAndPassword, 
    signOut
} from "firebase/auth";

export const appAuthInstance = getAuth();

export async function createAccount(email, password, name)
{
    createUserWithEmailAndPassword(appAuthInstance, email, password)
    .then((userCredential) => {
        updateProfile(appAuthInstance.currentUser, {
            displayName: name,
        }).then(() => {
            console.log("User " + appAuthInstance.currentUser.displayName + " has been created successfully."); 
        }).catch((error) => {
            console.log("User account couldn't be named. See below.");
            console.log(error);
        });
        console.log("User " + appAuthInstance.currentUser.email + " has been created successfully."); 
    })
    .catch((error) => {
        console.log("User account couldn't be created. See below.");
        console.log(error);
    });
}

export async function login(email, password)
{
    signInWithEmailAndPassword(appAuthInstance, email, password)
    .then((userCredential) => {
        console.log("User " + userCredential.user.email + " has been signed in successfully."); 
    })
    .catch((error) => {
        console.log("You couldn't be signed in. See below");
        console.log(error);
    });
}

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