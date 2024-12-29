import React, { useState } from 'react';
import FileUpload from './FileUpload';
import StatusIndicator from './StatusIndicator';

const MemberList = ({ members, teamIndex, orgIndex, setOrganizations }) => {
  const [localMembers, setLocalMembers] = useState(members);

  const addMember = () => {
    const name = prompt("Enter Member Name:");
    const id = prompt("Enter Member ID:");
    if (name && id) {
      const newMembers = [...localMembers, { name, id, image: null, fileUrl: null }];
      setLocalMembers(newMembers);
      setOrganizations((prev) =>
        prev.map((org, oIndex) =>
          oIndex === orgIndex
            ? {
                ...org,
                teams: org.teams.map((team, tIndex) =>
                  tIndex === teamIndex ? { ...team, members: newMembers } : team
                ),
              }
            : org
        )
      );
    }
  };

  const handleImageUpload = (index, fileName) => {
    const updatedMembers = [...localMembers];
    const fakeFileUrl = `https://example.com/files/${fileName}`; // Simulate a file URL
    updatedMembers[index].image = fileName;
    updatedMembers[index].fileUrl = fakeFileUrl;

    setLocalMembers(updatedMembers);
    setOrganizations((prev) =>
      prev.map((org, oIndex) =>
        oIndex === orgIndex
          ? {
              ...org,
              teams: org.teams.map((team, tIndex) =>
                tIndex === teamIndex ? { ...team, members: updatedMembers } : team
              ),
            }
          : org
      )
    );
  };

  return (
    <div style={{ marginLeft: '20px' }}>
      <h4>Members</h4>
      <button onClick={addMember}>Add Member</button>
      <ul>
        {localMembers.map((member, index) => (
          <li key={index}>
            {member.name} (ID: {member.id}) 
            <StatusIndicator status={member.image ? 'green' : 'red'} />
            <FileUpload onUpload={(fileName) => handleImageUpload(index, fileName)} />
            {member.fileUrl && (
              <a
                href={member.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ marginLeft: '10px', textDecoration: 'underline', color: 'blue' }}
              >
                Open File
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MemberList;
