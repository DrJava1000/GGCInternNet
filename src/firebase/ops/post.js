import { db } from '../firebase_init'; 

import { doc, collection, getDocs, setDoc } from "firebase/firestore"; 

export async function fetchAllPosts(){

    const postsSnapshot = await getDocs(collection(db, "posts"));
    return postsSnapshot; 
}

export async function createPost(postDetails){
    const postRef = doc(db, "posts");
    await setDoc(postRef, {
        poster: postDetails.poster,
        title: postDetails.title, 
        description: userDetails.description,
    });
}