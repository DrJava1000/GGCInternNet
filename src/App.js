import './firebase/firebase_init';

// Public Page Imports
import Portal from './page_specific_components/public_pages/login_portal/Portal';
import Signup from './page_specific_components/public_pages/signup/User-Provisioning'; 

// Private Page Imports 
import InternalPage from './page_specific_components/private_pages/InternalPage';
import MainFeed from './page_specific_components/private_pages/main_forum_feed/Main-Feed';
import PostCreation from './page_specific_components/private_pages/post_creation/Post-Creation';
import Profile from './page_specific_components/private_pages/user_profile/User-Profile';
import {Route, Routes} from 'react-router-dom'

import './App.css';

function App() {
  return (
    <main className="App">
      <Routes>
        {/* Default Route is Login Portal*/}
        <Route exact path="/" element={<Portal />}/>
        <Route exact path="/Portal" element={<Portal />}/> 
        
        {/* Sign Up Page */ }
        <Route exact path="/Signup" element={<Signup />}/> 

        {/* Template Internal Page */ }
        <Route exact path="/InternalPage" element={<InternalPage />}/> 

        {/* Main Feed Page */}
        <Route exact path="/Main_Feed" element={<MainFeed />}/> 
        
        {/* Create Post Page */}
        <Route exact path="/Post_Creation" element={<PostCreation />}/> 
        
        {/* User Profile Page */}
        <Route exact path="/User_Profile" element={<Profile />}/> 
      </Routes>
    </main>
  );
}

export default App;

