import './firebase/firebase_init';

// Public Page Imports
import Portal from './page_specific_components/public_pages/login_portal/Portal';
import Signup from './page_specific_components/public_pages/signup/User-Provisioning'; 

// Private Page Imports 
import InternalPage from './page_specific_components/private_pages/InternalPage';
import Profile from './page_specific_components/private_pages/user_profile/User-Profile';
import MainFeed from './page_specific_components/private_pages/main_forum_feed/Main-Feed';
import {Route, Routes} from 'react-router-dom'

import './App.css';

function App() {
  return (
    <main className="App">
      <Routes>
        {/* Default Route is Login Portal*/}
        <Route exact path="/" element={<Portal />}/>
        <Route exact path="/Portal" element={<Portal />}/> 
        
        {/* Template Sign Up Page */ }
        <Route exact path="/Signup" element={<Signup />}/> 

        {/* Template Internal Page */ }
        <Route exact path="/InternalPage" element={<InternalPage />}/> 

        {/* User Profile Page */}
        <Route exact path="/User_Profile" element={<Profile />}/> 
        <Route exact path="/Main_Feed" element={<MainFeed />}/> 
      </Routes>
    </main>
  );
}

export default App;

