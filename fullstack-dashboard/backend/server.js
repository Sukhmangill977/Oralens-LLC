const express = require('express');
const cors = require('cors');
const app = express();

// Enable CORS for all origins
app.use(cors());

// Middleware to parse incoming JSON requests
app.use(express.json());

// Dummy data for organizations, teams, and members
let organizations = [
  {
    id: 1,
    name: "Organization 1",
    email: "org1@example.com",
    location: "New York",
    teams: [
      {
        id: 1,
        name: "Team A",
        members: [
          { id: 1, name: "Member 1", image: null },
          { id: 2, name: "Member 2", image: "image2.jpg" }
        ]
      },
      {
        id: 2,
        name: "Team B",
        members: [
          { id: 3, name: "Member 3", image: null },
          { id: 4, name: "Member 4", image: "image4.jpg" }
        ]
      }
    ]
  }
];

// GET API for all organizations
app.get('/api/organizations', (req, res) => {
  res.json(organizations);
});

// POST API to add a new organization
app.post('/api/organizations', (req, res) => {
  const { name, email, location } = req.body;
  const newOrg = {
    id: organizations.length + 1,
    name,
    email,
    location,
    teams: []
  };
  organizations.push(newOrg);
  res.status(201).json(newOrg);
});

// GET API for a single organization by ID
app.get('/api/organizations/:id', (req, res) => {
  const orgId = parseInt(req.params.id);
  const org = organizations.find(o => o.id === orgId);
  if (org) {
    res.json(org);
  } else {
    res.status(404).send('Organization not found');
  }
});

// GET API for all teams of a specific organization
app.get('/api/organizations/:id/teams', (req, res) => {
  const orgId = parseInt(req.params.id);
  const org = organizations.find(o => o.id === orgId);
  if (org) {
    res.json(org.teams);
  } else {
    res.status(404).send('Organization not found');
  }
});

// GET API for a single team by ID within an organization
app.get('/api/organizations/:orgId/teams/:teamId', (req, res) => {
  const { orgId, teamId } = req.params;
  const org = organizations.find(o => o.id === parseInt(orgId));
  if (org) {
    const team = org.teams.find(t => t.id === parseInt(teamId));
    if (team) {
      res.json(team);
    } else {
      res.status(404).send('Team not found');
    }
  } else {
    res.status(404).send('Organization not found');
  }
});

// GET API for all members of a specific team
app.get('/api/organizations/:orgId/teams/:teamId/members', (req, res) => {
  const { orgId, teamId } = req.params;
  const org = organizations.find(o => o.id === parseInt(orgId));
  if (org) {
    const team = org.teams.find(t => t.id === parseInt(teamId));
    if (team) {
      res.json(team.members);
    } else {
      res.status(404).send('Team not found');
    }
  } else {
    res.status(404).send('Organization not found');
  }
});

// GET API for a single member by ID within a team
app.get('/api/organizations/:orgId/teams/:teamId/members/:memberId', (req, res) => {
  const { orgId, teamId, memberId } = req.params;
  const org = organizations.find(o => o.id === parseInt(orgId));
  if (org) {
    const team = org.teams.find(t => t.id === parseInt(teamId));
    if (team) {
      const member = team.members.find(m => m.id === parseInt(memberId));
      if (member) {
        res.json(member);
      } else {
        res.status(404).send('Member not found');
      }
    } else {
      res.status(404).send('Team not found');
    }
  } else {
    res.status(404).send('Organization not found');
  }
});

// DELETE API to delete an organization by ID
app.delete('/api/organizations/:id', (req, res) => {
  const orgId = parseInt(req.params.id);
  const orgIndex = organizations.findIndex(o => o.id === orgId);
  
  if (orgIndex === -1) {
    return res.status(404).send('Organization not found');
  }

  // Remove the organization from the list
  organizations.splice(orgIndex, 1);
  res.status(200).json({ message: 'Organization deleted successfully' });
});

// Start the server on port 5001
app.listen(5001, () => {
  console.log('Backend server is running on http://localhost:5001');
});
