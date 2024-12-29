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

// GET API for organizations
app.get('/api/organizations', (req, res) => {
  res.json(organizations);
});

// POST API to add an organization
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

// GET API for a single organization's teams and members
app.get('/api/organizations/:id', (req, res) => {
  const orgId = parseInt(req.params.id);
  const org = organizations.find(o => o.id === orgId);
  if (org) {
    res.json(org);
  } else {
    res.status(404).send('Organization not found');
  }
});

// Start the server on port 5001
app.listen(5001, () => {
  console.log('Backend server is running on http://localhost:5001');
});
