import { db } from '../firebase_init'; 

import { doc, collection, getDocs, setDoc } from "firebase/firestore"; 

export async function fetchAllPosts(){

    const postsSnapshot = await getDocs(collection(db, "posts"));
    
    const posts = [];
    postsSnapshot.forEach((doc) => {
        posts.push({
            poster: doc.data().poster,
            title: doc.data().title, 
            description: doc.data().description,
        })
      });
    
    return posts; 
}

export async function createPost(postDetails){
    const postRef = doc(collection(db, "posts"));
    await setDoc(postRef, {
        poster: postDetails.poster,
        title: postDetails.title, 
        description: postDetails.description,
    });
}