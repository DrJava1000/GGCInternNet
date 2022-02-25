import logo from './logo.svg';
import './App.css';
import * as FirebaseOps from './firebase/firebase_ops';

function App() {
  FirebaseOps.testFSAddOperation(); 
  FirebaseOps.testFSReadOperation(); 
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
          To view Firebase Firestore connectivity, check this page's console log. 
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
