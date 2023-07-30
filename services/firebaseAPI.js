import {
  collection,
  addDoc,
  setDoc,
  getDocs,
  doc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { db } from "../Firebase/config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { auth } from "../Firebase/config";
import uuid from "react-native-uuid";

export const registerAPI = async ({ photoURL, login, email, password }) => {
  try {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await updateProfile(user, {
      displayName: login,
      photoURL,
    });
    return user;
  } catch (err) {
   console.log(err.message);
  }
};

export const loginAPI = async ({ email, password }) => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
   
    return user;
  } catch (err) {
   console.log(err.message);
  }
};

export const logoutAPI = async () => {
  try {
    await auth.signOut();
  } catch (err) {
    alert(err.message);
  }
};

export const getCurrentUserAPI = async (update) => {
  return auth.currentUser;
};

export const updateUserProfileAPI = async (update) => {
  const user = auth.currentUser;

  if (user) {
    try {
      const data = await updateProfile(user, update);
      return data;
    } catch (err) {
      throw err;
    }
  }
};

export const writePostToFirestoreAPI = async (postData) => {
  const postId = uuid.v4();

  try {
    await setDoc(doc(db, "posts", postId), {
      ...postData,
    });
    alert("The post was created successfully");
    return { ...postData, postId };
  } catch (err) {
    console.error("Error adding document: ", err);
    throw err;
  }
};

export const getPostsFromFirestoreAPI = async () => {
  try {
    const postList = [];
    const snapshot = await getDocs(collection(db, "posts"));

    snapshot.forEach((doc) => postList.push({ postId: doc.id, ...doc.data() }));

    return postList;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const updatePostInFirestoreAPI = async (collectionName, docId) => {
  try {
    const ref = doc(db, collectionName, docId);

    await updateDoc(ref, {
      age: 25,
    });
    console.log("document updated");
  } catch (err) {
    console.log(err);
  }
};

export const writeCommentInFirestoreAPI = async (data) => {
  const { postId } = data;

  try {
    const ref = doc(db, "posts", postId);

    await updateDoc(ref, { comments: arrayUnion(data) });

    console.log("comment created");
    return data;
  } catch (err) {
    console.log(err.message);
  }
};

export const getCommentInFirestoreAPI = async (postId) => {
  const snapshot = await getDocs(collection(db, "posts"));
};
