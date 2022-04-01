import { db } from '../firebase_init'; 

import { doc, collection, getDocs, setDoc } from "firebase/firestore"; 

export async function fetchAllPosts(){

    const postsSnapshot = await getDocs(collection(db, "posts"));
    
    const posts = [];
    postsSnapshot.forEach((doc) => {
        posts.push({
            id: doc.id,
            poster: doc.data().poster,
            title: doc.data().title, 
            description: doc.data().description,

            startDate: doc.data().startDate,
            endDate: doc.data().endDate,
            ratinig: doc.data().rating,

            mondayTime: doc.data().mondayTime,
            tuesdayTime: doc.data().tuesdayTime,
            wednesdayTime: doc.data().wednesdayTime,
            thursdayTime: doc.data().thursdayTime,
            fridayTime: doc.data().fridayTime,
            saturdayTime: doc.data().saturdayTime,
            sundayTime: doc.data().sundayTime,
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

        startDate: postDetails.startDate,
        endDate: postDetails.endDate,
        rating: postDetails.rating,

        mondayTime: postDetails.mondayTime,
        tuesdayTime: postDetails.tuesdayTime,
        wednesdayTime: postDetails.wednesdayTime,
        thursdayTime: postDetails.thursdayTime,
        fridayTime: postDetails.fridayTime,
        saturdayTime: postDetails.saturdayTime,
        sundayTime: postDetails. sundayTime,
    });
}