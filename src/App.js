import './firebase/firebase_init';
import Portal from './login_template/Portal';
import Signup from './login_template/User-Provisioning'; 
import InternalPage from './login_template/InternalPage';
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
      </Routes>
    </main>
  );
}

export default App;

