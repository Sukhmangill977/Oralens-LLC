import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TeamList from './TeamList';
import './OrganizationList.css'; // Import the beautified CSS file

const OrganizationList = () => {
  const [organizations, setOrganizations] = useState([]);

  useEffect(() => {
    // Fetch organizations from the backend API
    axios.get('http://localhost:5001/api/organizations')
      .then(response => {
        setOrganizations(response.data);
      })
      .catch(error => {
        console.error('Error fetching organizations:', error);
      });
  }, []);

  const addOrganization = () => {
    const name = prompt("Enter Organization Name:", "Organization");
    const email = prompt("Enter Organization Email:");
    const location = prompt("Enter Organization Location:");

    if (name && email && location) {
      // Optimistic UI update: immediately add the new org to the top
      const newOrg = {
        id: organizations.length + 1, // This will be updated by backend, but we're just adding locally for now
        name: name || 'Organization', // Default name "Organization"
        email,
        location,
        teams: []
      };
      setOrganizations((prevOrgs) => [newOrg, ...prevOrgs]); // Add new org at the top

      // Now make the POST request to the backend
      axios.post('http://localhost:5001/api/organizations', { name, email, location })
        .then(response => {
          // On success, update the organization's ID from the backend response
          const updatedOrganizations = organizations.map(org => 
            org.id === newOrg.id ? { ...org, id: response.data.id } : org
          );
          setOrganizations(updatedOrganizations);
        })
        .catch(error => {
          console.error('Error adding organization:', error);
          // Revert the optimistic update if the API request fails
          setOrganizations((prevOrgs) => prevOrgs.filter(org => org.id !== newOrg.id));
        });
    }
  };

  const deleteOrganization = (id) => {
    if (window.confirm("Are you sure you want to delete this organization?")) {
      // Optimistic UI update: Remove the organization immediately from the list
      setOrganizations(prevOrgs => prevOrgs.filter(org => org.id !== id));

      // Send DELETE request to backend
      axios.delete(`http://localhost:5001/api/organizations/${id}`)
        .then(() => {
          console.log("Organization deleted successfully");
        })
        .catch(error => {
          console.error('Error deleting organization:', error);
          // Revert the optimistic update if the API request fails
          setOrganizations(prevOrgs => [...prevOrgs, organizations.find(org => org.id === id)]);
        });
    }
  };

  return (
    <div className="organization-list-container">
      <h2 className="title">Organizations</h2>
      <button className="add-org-button" onClick={addOrganization}>Add Organization</button>
      <ul className="organization-list">
        {organizations.map((org) => (
          <li key={org.id} className="organization-item">
            <div className="organization-info">
              <strong>{org.name}</strong> - {org.email} ({org.location})
            </div>
            <TeamList teams={org.teams} orgIndex={organizations.indexOf(org)} setOrganizations={setOrganizations} />
            {/* <button
              className="delete-org-button"
              onClick={() => deleteOrganization(org.id)}
            >
              Delete
            </button> */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrganizationList;
