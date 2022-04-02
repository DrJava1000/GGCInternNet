import { db } from "../firebase_init";

import { doc, collection, getDocs, setDoc } from "firebase/firestore";
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";

export async function fetchAllPosts() {
  const postsSnapshot = await getDocs(collection(db, "posts"));
  /*console.log("map==>>", postsSnapshot.map, "doc==>>", postsSnapshot.docs);
  const posts = [];
  postsSnapshot.forEach((doc) => {
    posts.push({
      id: doc.id,
      poster: doc.data().poster,
      title: doc.data().title,
      description: doc.data().description,
    });
  });*/

  return postsSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
}

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
