import React, { useState } from 'react';
import MemberList from './MemberList';

const TeamList = ({ teams, orgIndex, setOrganizations }) => {
  const [localTeams, setLocalTeams] = useState(teams);

  // Add a new team to the organization
  const addTeam = () => {
    const name = prompt("Enter Team Name:");
    if (name) {
      const newTeam = { name, members: [] };
      const updatedTeams = [...localTeams, newTeam];
      setLocalTeams(updatedTeams);

      // Update the organization's teams with the new team
      setOrganizations((prevOrganizations) =>
        prevOrganizations.map((org, index) =>
          index === orgIndex ? { ...org, teams: updatedTeams } : org
        )
      );
    }
  };

  return (
    <div style={{ marginLeft: '20px' }}>
      <h3>Teams</h3>
      <button onClick={addTeam}>Add Team</button>
      <ul>
        {localTeams.map((team, index) => (
          <li key={index}>
            <strong>{team.name}</strong>
            <MemberList
              members={team.members}
              teamIndex={index}
              orgIndex={orgIndex}
              setOrganizations={setOrganizations}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TeamList;
