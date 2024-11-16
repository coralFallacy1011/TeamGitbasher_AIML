import React, { useState, useEffect } from 'react';
//import logo from './resources/logo.svg';
import './App.css';
import LoadingScreen from './components/LoadingScreen';
import { BrowserRouter as Router, Routes, Route }
    from "react-router-dom";
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import Register from './components/register';


const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate a delay for loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 4500); // Adjust the delay as needed

    return () => clearTimeout(timer); // Cleanup timer
  }, []);

  return (
    <>
      <LoadingScreen />
      <Router>
            <Routes>
                <Route path="/login"
                    element={<LoginPage />} />
                <Route path="/register"
                  element={<Register/>} />
                <Route path="/"
                    element={<HomePage />} />
            </Routes>
        </Router>
    </>
  );
};


/**function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
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
}*/

export default App;
