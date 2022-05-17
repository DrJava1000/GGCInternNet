import './firebase/firebase_init';
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUserID, setCurrentUserRole, setLoginStatus } from './react-redux/authentication/auth-slice';
import AuthContext from './context/authentication/AuthContext';
import Portal from './page_specific_components/public_pages/login_portal/Portal';
import Signup from './page_specific_components/public_pages/signup/User-Provisioning'; 
import PageFeed from './page_specific_components/private_pages/page_feed/Page-Feed';
import PostModification from './page_specific_components/private_pages/post_modification/Post-Modification';
import Profile from './page_specific_components/private_pages/user_profile/User-Profile';
import {Route, Routes, useLocation} from 'react-router-dom'
import PublicRoute from './high_order_components/public_route/Public-Route';
import AuthenticatedRoute from './high_order_components/authenticated_route/Authenticated-Route';
import './App.css';

function App() {

  // React-Redux Dispatch Hook
  const dispatch = useDispatch();

  // Login user locally and load 
  // relevant profile information
  // needed for routing or for access
  // application-wide
  const login = (id, role) => {
    dispatch(setCurrentUserID(id));
    dispatch(setCurrentUserRole(role));
    dispatch(setLoginStatus(true));
  }

  // Logout user locally
  const logout = () => {
    dispatch(setCurrentUserID(''));
    dispatch(setCurrentUserRole(''));
    dispatch(setLoginStatus(false));
  }
  
  return (
    <AuthContext.Provider
      value={{
        login: login,
        logout: logout,
        // Use AuthContext to provide id and role as useSelector hook
        // cannot be used in class components 
        currentUserID: useSelector((state) => state.auth.id),
        currentUserRole: useSelector((state) => state.auth.role),
        isLoggedIn: useSelector((state) => state.auth.isLoggedIn)
      }}
    >
      <main className="App">
        <Routes>
          {/* Default Route is Login Portal*/}
          <Route exact path="/" element={<PublicRoute wrappedComponent={Portal} />}/>
          <Route exact path="/Portal" element={<PublicRoute wrappedComponent={Portal} />}/> 
          {/* Sign Up Page */ }
          <Route exact path="/Signup" element={<PublicRoute wrappedComponent={Signup} />}/> 

          {/* Private Pages Shared Between Roles */}

          {/* Main Feed Page */}
          <Route exact path="/Main_Feed" element={
            // All Feed Pages need a key so that the feed component is mounted/unmounted
            // on page navigation using React Link
            // Without this key, navigation wouldn't unmount the component and, thus
            // a user's 'My Posts' feed wouldn't be loaded with their own posts. The link
            // would change but the posts wouldn't. 
            <AuthenticatedRoute wrappedComponent={PageFeed} wrappedComponentProps={{
              key: "main_posts", feedType: "main_posts"
            }}/>
          }/> 
          
          {/* My Posts Feed Page */}
          <Route exact path="/My_Posts_Feed" element={
            // All Feed Pages need a key so that the feed component is mounted/unmounted
            // on page navigation using React Link
            // Without this key, navigation wouldn't unmount the component and, thus
            // a user's 'My Posts' feed wouldn't be loaded with their own posts. The link
            // would change but the posts wouldn't. 
            <AuthenticatedRoute wrappedComponent={PageFeed} wrappedComponentProps={{
              key: "my_posts", feedType: "my_posts"
            }}/>
          }/> 
          
          {/* Post Modification is used for both post creation and editing/deletion of posts*/}
          {/* Create Post Page */}
          <Route exact path="/Post_Creation" element={
            <AuthenticatedRoute wrappedComponent={PostModification} wrappedComponentProps={{
              operation: 'create', location: useLocation()
            }}/>
          }/> 
          
          {/* Edit/Delete Post Page */}
          <Route exact path="/Post_Edit" element={
            <AuthenticatedRoute wrappedComponent={PostModification} wrappedComponentProps={{
              operation: 'edit_and_delete', location: useLocation()
            }}/>
          }/> 
          
          {/* User Profile Page */}
          <Route exact path="/User_Profile" element={
            <AuthenticatedRoute wrappedComponent={Profile} wrappedComponentProps={{
              location: useLocation()
            }}/>
          }/>
        </Routes>
      </main>
    </AuthContext.Provider>
  );
}

export default App;

