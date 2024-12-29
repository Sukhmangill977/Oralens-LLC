import React, { useState } from 'react';
import TeamList from './TeamList';

const Organization = () => {
  // Initialize the organizations with an empty array of teams
  const [organizations, setOrganizations] = useState([
    { name: 'Org 1', teams: [] },
    { name: 'Org 2', teams: [] },
  ]);

  // Function to add a new organization
  const addOrganization = () => {
    const name = prompt("Enter Organization Name:");
    if (name) {
      const newOrg = { name, teams: [] };
      setOrganizations([...organizations, newOrg]);
    }
  };

  return (
    <div>
      <h2>Organizations</h2>
      <button onClick={addOrganization}>Add Organization</button>
      {organizations.map((org, orgIndex) => (
        <div key={orgIndex}>
          <h3>{org.name}</h3>
          <TeamList
            teams={org.teams}
            orgIndex={orgIndex}
            setOrganizations={setOrganizations} // Passing setOrganizations to TeamList
          />
        </div>
      ))}
    </div>
  );
};

export default Organization;
