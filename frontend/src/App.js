import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'; // Import the Navbar component
import MainPage from './components/MainPage';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import VerificationPage from './components/VerificationPage';
import AboutPage from './components/AboutPage';
import UploadPage from './components/UploadPage'; 
import Nav from './components/Nav';

const App = () => {
  return (
    <Router>
      {/* Place the Navbar component above the Routes */}
     

      {/* Add Routes for the different pages */}
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/verification" element={<VerificationPage />} />
        <Route path="/about-us" element={<AboutPage />} />
        <Route path="/UploadPage" element={<UploadPage />}/>
      </Routes>
    </Router>
  );
};

export default App;