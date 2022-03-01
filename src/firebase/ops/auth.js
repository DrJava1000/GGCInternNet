import 
{
    getAuth, 
    onAuthStateChanged,
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut
} from "firebase/auth";

const appAuthInstance = getAuth();

onAuthStateChanged(appAuthInstance, (user) => 
{
    user = appAuthInstance.currentUser; 
    if (user) // if user is signed in
    {
        console.log("Currently Signed In: Current User's UID: " + user.uid); 
    }else // if user isn't signed in
    {
        console.log("No user is currently signed in.");
    }
});


export async function createAccount(email, password)
{
    createUserWithEmailAndPassword(appAuthInstance, email, password)
    .then((userCredential) => {
        console.log("User " + userCredential.user.email + " has been created successfully."); 
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