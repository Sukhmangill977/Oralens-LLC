import React from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate instead of useHistory

const HomePage = () => {
  const navigate = useNavigate(); // useNavigate instead of useHistory

  const goToDashboard = () => {
    // Navigate to the OrganizationList page
    navigate('/dashboard');
  };

  return (
    <div className="home-page">
      <h1>Welcome to the Dashboard Creating Platform</h1>
      <button onClick={goToDashboard}>Go to Dashboard</button>
    </div>
  );
};

export default HomePage;
