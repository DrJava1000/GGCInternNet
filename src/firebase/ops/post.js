import { db } from "../firebase_init";

import { 
  doc, 
  collection, 
  getDocs, 
  setDoc, 
  getDoc, 
  where, 
  query, 
  orderBy,
  startAt,
  endAt,
  deleteDoc 
} from "firebase/firestore";
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

// MY POSTS FEED: FETCH CURRENT USER'S POSTS
export async function fetchMyPosts(userId, filterOptions) {
  const postsRef = collection(db, "posts");
  const myPosts = [];

  var myPostsQuery;

  // Create a post query that searches for posts tagged with the current
  // user's id and with a specific field filter
  switch(filterOptions.filterType){
    case 'company': 
      myPostsQuery = query(postsRef, where("userId", "==", userId), orderBy("company"), 
      startAt(filterOptions.companySearchQuery), endAt(filterOptions.companySearchQuery + '\uf8ff')); break;
    default: 
      myPostsQuery = query(postsRef, where("userId", "==", userId)); 
  }

  const myPostsQuerySnapshot = await getDocs(myPostsQuery);
  myPostsQuerySnapshot.forEach((post) => {
    // add each matching post to a list
    myPosts.push({
      ...post.data(), id: post.id
    });
  });
  
  // return list of my posts
  return myPosts;
}

// POST MODIFICATION: CREATE A POST OR EDIT A EXISTING ONE
export async function createOrEditPost({ logoFile, ...postDetails }) {
  var postRef; 

  if(postDetails.id){
    postRef = doc(db, "posts", postDetails.id);
  }else{
    postRef = doc(collection(db, "posts"));
  }

  const storage = getStorage();
  if (logoFile) {
    try {
      const logoRef = ref(
        storage,
        "logos/" + postDetails.userId + "/" + logoFile.name
      );
      await uploadBytes(logoRef, logoFile);
      const uploadUrl = await getDownloadURL(logoRef);
      postDetails.logoUrl = uploadUrl;
    } catch (err) {
      console.log("errrrr==>>", err);
    }
  }

  await setDoc(postRef, postDetails, { merge: true });
}

// POST DELETION: DELETE AN EXISTING POST
export async function deletePost(postID) {
  var postRef = doc(db, "posts", postID); 

  await deleteDoc(postRef).then((success) => {
    console.log(success);
  }).catch((error) => {
    console.log(error)
  });
}