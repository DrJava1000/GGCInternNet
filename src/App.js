import './firebase/firebase_init';
import Portal from './page_specific_components/public_pages/login_portal/Portal';
import Signup from './page_specific_components/public_pages/signup/User-Provisioning'; 
import ForumPost from './page_specific_components/private_pages/forum_post/ForumPost';
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
        <Route exact path="/ForumPost" element={<ForumPost />}/> 
      </Routes>
    </main>
  );
}

export default App;

