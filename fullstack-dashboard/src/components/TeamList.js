import React, { useState } from 'react';
import MemberList from './MemberList';

const TeamList = ({ teams, orgIndex, setOrganizations }) => {
  const [localTeams, setLocalTeams] = useState(teams);

  const addTeam = () => {
    const name = prompt("Enter Team Name:");
    if (name) {
      const newTeams = [...localTeams, { name, members: [] }];
      setLocalTeams(newTeams);
      setOrganizations((prev) =>
        prev.map((org, index) =>
          index === orgIndex ? { ...org, teams: newTeams } : org
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
            {team.name}
            <MemberList members={team.members} teamIndex={index} orgIndex={orgIndex} setOrganizations={setOrganizations} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TeamList;
