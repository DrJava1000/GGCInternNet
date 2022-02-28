import Portal from './login_template/Portal';
import {Route, Routes} from 'react-router-dom';
import './App.css';

function App() {
  return (
    <main className="App">
      <Routes>
        {/* Default Route is Login Portal*/}
        <Route exact path="/" element={<Portal />}/>
        <Route exact path="/Portal" element={<Portal />}/> 
      </Routes>
    </main>
  );
}

export default App;

