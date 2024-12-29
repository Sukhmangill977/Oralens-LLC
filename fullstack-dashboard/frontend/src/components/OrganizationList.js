import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TeamList from './TeamList';
import './OrganizationList.css';

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
      setOrganizations((prevOrgs) => [newOrg, ...prevOrgs]); // Add new org at the top of the list

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

  return (
    <div>
      <h2>Organizations</h2>
      <button onClick={addOrganization}>Add Organization</button>
      <ul>
        {organizations.map((org) => (
          <li key={org.id}>
            <strong>{org.name}</strong> - {org.email} ({org.location})
            <TeamList teams={org.teams} orgIndex={organizations.indexOf(org)} setOrganizations={setOrganizations} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrganizationList;
