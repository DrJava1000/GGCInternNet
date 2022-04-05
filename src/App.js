import './firebase/firebase_init';
import 
{
    onAuthStateChanged,
} from "firebase/auth";
import { appAuthInstance } from './firebase/ops/auth.js';

import React, {useState} from "react";

import AuthContext from './context/AuthContext';

// Public Page Imports
import Portal from './page_specific_components/public_pages/login_portal/Portal';
import Signup from './page_specific_components/public_pages/signup/User-Provisioning'; 

// Private Page Imports 
import PageFeed from './page_specific_components/private_pages/page_feed/Page-Feed';
import PostModification from './page_specific_components/private_pages/post_modification/Post-Modification';
import Profile from './page_specific_components/private_pages/user_profile/User-Profile';
import {Route, Routes, useLocation} from 'react-router-dom'

import './App.css';

function App() {

  // Use React hooks with App functional component to give App state functionality
  // Used with AuthContext for Authentication 
  var [currentUserID, setCurrentUserID] = useState('Hello'); //

  onAuthStateChanged(appAuthInstance, (user) => 
  {
    if(user !== null)
      setCurrentUserID(user.uid); 
    if (appAuthInstance.currentUser) // if user is signed in
      {
          console.log("Currently Signed In: Current User's UID: " + user.uid); 
      }else // if user isn't signed in
      {
          console.log("No user is currently signed in.");
      }
  });

  return (
    <AuthContext.Provider
      value=
      {
        {
          currentUserID : currentUserID
        }
      }
    >
      <main className="App">
        <Routes>
          {/* Default Route is Login Portal*/}
          <Route exact path="/" element={<Portal />}/>
          <Route exact path="/Portal" element={<Portal />}/> 
          
          {/* Sign Up Page */ }
          <Route exact path="/Signup" element={<Signup />}/> 

          {/* Main Feed Page */}
          <Route exact path="/Main_Feed" element={<PageFeed feedType={"main_posts"}/>}/> 
          {/* My Posts Feed Page */}
          <Route exact path="/My_Posts_Feed" element={<PageFeed feedType={"my_posts"}/>}/> 
          
          {/* Post Modification is used for both post creation and editing/deletion of posts*/}
          {/* Create Post Page */}
          <Route exact path="/Post_Creation" element={<PostModification accessLevel={'create'}/>}/> 
          {/* Edit/Delete Post Page */}
          <Route exact path="/Post_Edit" element={<PostModification accessLevel={'edit_and_delete'} />}/> 
          
          {/* User Profile Page */}
          <Route exact path="/User_Profile" element={<Profile location={useLocation()}/>}/> 
        </Routes>
      </main>
    </AuthContext.Provider>
  );
}

export default App;

