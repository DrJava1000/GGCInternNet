import { db } from "../firebase_init";

import { doc, collection, getDocs, setDoc, getDoc } from "firebase/firestore";
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";

// MAIN FEED: FETCH ALL POSTS
export async function fetchAllPosts() {
  const postsSnapshot = await getDocs(collection(db, "posts"));
  const posts = [];
  
  // get all posts 
  for(const post of postsSnapshot.docs) {
    // get poster's name from the ID stored in the post
    const profileRef = doc(db, "profiles", "" + post.data().userId);
    const profileSnap = await getDoc(profileRef);
    var name;

    if (profileSnap.exists()) {
      name = profileSnap.data().name;
    } else {
      console.log("No such document!");
    }

    // add each post to a list
    posts.push({
      ...post.data(), posterName: name, id: post.id
    });
  };

  // return list of posts
  return posts;
}

// POST CREATION: CREATE A POST
export async function createPost({ logoFile, ...postDetails }) {
  const postRef = doc(collection(db, "posts"));

  const storage = getStorage();
  const fileName = logoFile.name;
  if (fileName) {
    try {
      const logoRef = ref(
        storage,
        "logos/" + postDetails.userId + "/" + fileName
      );
      await uploadBytes(logoRef, logoFile);
      const uploadUrl = await getDownloadURL(logoRef);
      postDetails.logoUrl = uploadUrl;
    } catch (err) {
      console.log("errrrr==>>", err);
    }
  }

  await setDoc(postRef, postDetails);
}
