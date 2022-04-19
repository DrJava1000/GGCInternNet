import { db } from "../firebase_init";

import { 
  doc, 
  documentId,
  collection, 
  getDocs, 
  setDoc, 
  where, 
  query, 
  orderBy,
  startAt,
  endAt,
  limit,
  deleteDoc 
} from "firebase/firestore";
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";

// MAIN FEED: FETCH ALL POSTS
export async function fetchAllPosts(filterOptions) {
  
  // Post Collection reference
  const postsRef = collection(db, "posts");
  // Post Collection Query
  var postsQuery;

  // Create a post query that searches for all posts
  // If a company filter has been applied, filter for company name
  switch(filterOptions.filterType){
    case 'company': 
      postsQuery = query(postsRef, orderBy("company"), startAt(filterOptions.companySearchQuery), 
      endAt(filterOptions.companySearchQuery + '\uf8ff')); break;
    default: 
      postsQuery = query(postsRef); 
  }
  
  // Search for all posts using applied filters (if any)
  const postsSnapshot = await getDocs(postsQuery);

  // List of posts to return
  const posts = [];
  
  // Loop through all retrieved posts, get poster's name from the userID in post,
  // and inject it into each post before it's returned
  for(const post of postsSnapshot.docs) {
  
    // Profile Collection reference
    const profileRef = collection(db, "profiles");
    // Profile Collection query
    var profileQuery; 

    // If major/concentration filter has been applied, 
    // use those when pulling the user's profile
    if(filterOptions.filterType === 'major/concentration'){
      profileQuery = query(profileRef, where(documentId(), "==", post.data().userId), 
      where("major", "==", filterOptions.major), 
      where("concentration", "==", filterOptions.concentration));
    }else{
      profileQuery = query(profileRef, where(documentId(), "==", post.data().userId), limit(1)); 
    }

    // Get user attached to post.
    // While the query will only actually bring back one 
    // attached profile (due to unique id), we still have to retrieve
    // using getDocs.
    const profileSnap = await getDocs(profileQuery);

    if (!profileSnap.empty) {
      // Add the post and inject the corresponding poster's name
      // and only do so if the profile passes all filters.
      posts.push({
        ...post.data(), posterName: profileSnap.docs[0].data().name, id: post.id
      });
    }
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

export async function changeLike(like, id, hide) {
  console.log("Entered 'changeLike' method within post.js: " + id + " " + like + " " + hide);
  
  var postRef = doc(db, "posts", id);

  var postDetails = null;

  {hide === false ? (
    postDetails = {like: like + 1}
  ) : (
    postDetails = {like: like}
  )}

  //var postDetails = {like: like + 1};

  await setDoc(postRef, postDetails, { merge: true });
}