import React from 'react';
import { useNavigate } from 'react-router-dom';
import './MainPage.css'; // Import CSS for styling

const MainPage = () => {
    const navigate = useNavigate();
  
    const handleGetStarted = () => {
      navigate('/login');
    };

const App = () => {
  return (
    <div className="container">
      <div className="content">
        <h1 className="title">Welcome To Signature Verification</h1>
        <p className="subtitle">Here every signature is genuine</p>
        <button className="get-started" onClick={handleGetStarted}>Get Started</button>
      </div>
    </div>
  );
};

export default App;


// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import './MainPage.css'; // Import CSS for styling

// const MainPage = () => {
//   const navigate = useNavigate();

//   const handleGetStarted = () => {
//     navigate('/login');
//   };

  return (
    <div className="main-page-container">
      <div className="main-content">
        <h1 className="welcome-title">Welcome to Signature Verification</h1>
        
        <button className="get-started-btn" onClick={handleGetStarted}>
          Get Started
        </button>
      </div>
    </div>
  );
};

export default MainPage;
