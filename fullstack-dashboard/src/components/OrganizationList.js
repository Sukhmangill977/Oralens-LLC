import React, { useState } from 'react';
import TeamList from './TeamList';

const OrganizationList = () => {
  const [organizations, setOrganizations] = useState([]);

  const addOrganization = () => {
    const name = prompt("Enter Organization Name:");
    const email = prompt("Enter Organization Email:");
    const location = prompt("Enter Organization Location:");
    if (name && email && location) {
      setOrganizations([...organizations, { name, email, location, teams: [] }]);
    }
  };

  return (
    <div>
      <h2>Organizations</h2>
      <button onClick={addOrganization}>Add Organization</button>
      <ul>
        {organizations.map((org, index) => (
          <li key={index}>
            <strong>{org.name}</strong> - {org.email} ({org.location})
            <TeamList teams={org.teams} orgIndex={index} setOrganizations={setOrganizations} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrganizationList;
