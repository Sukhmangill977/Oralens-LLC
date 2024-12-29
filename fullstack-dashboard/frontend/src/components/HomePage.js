import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css'; // Make sure this is correctly imported

const HomePage = () => {
  const navigate = useNavigate();

  const goToDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <div className="home-page">
      <div className="content-box">
        <h1>Welcome to the Dashboard Creating Platform</h1>
        <p>Build and manage your organization's teams and members effortlessly.</p>
        <button className="dashboard-button" onClick={goToDashboard}>Go to Dashboard</button>
      </div>
    </div>
  );
};

export default HomePage;
