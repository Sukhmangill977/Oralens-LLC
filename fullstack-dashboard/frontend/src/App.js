import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Use Routes instead of Switch
import './App.css';
import HomePage from './components/HomePage';
import OrganizationList from './components/OrganizationList';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Home page route */}
          <Route path="/" element={<HomePage />} />

          {/* Organization list page route */}
          <Route path="/dashboard" element={<OrganizationList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
