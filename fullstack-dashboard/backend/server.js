import express from 'express';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import { db, storage } from './firebase'; // Import Firebase setup

const app = express();

// Enable CORS for all origins
app.use(cors());

// Middleware to parse incoming JSON requests
app.use(express.json());

// Set up Multer for file upload
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => cb(null, './uploads'),
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
  }),
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const mimeType = fileTypes.test(file.mimetype);
    const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
    mimeType && extName ? cb(null, true) : cb('Error: Only images are allowed');
  },
});

// POST API to add a new organization (storing data in Firebase Firestore)
app.post('/api/organizations', async (req, res) => {
  const { name, email, location } = req.body;

  try {
    const newOrgRef = db.collection('organizations').doc();
    await newOrgRef.set({
      name,
      email,
      location,
      teams: [],
    });

    res.status(201).json({ id: newOrgRef.id, name, email, location });
  } catch (error) {
    console.error('Error adding organization:', error);
    res.status(500).json({ error: 'Error adding organization' });
  }
});

// GET API for all organizations (fetch from Firebase Firestore)
app.get('/api/organizations', async (req, res) => {
  try {
    const organizationsSnapshot = await db.collection('organizations').get();
    const organizationsList = organizationsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.json(organizationsList);
  } catch (error) {
    console.error('Error fetching organizations:', error);
    res.status(500).json({ error: 'Error fetching organizations' });
  }
});

// POST API to upload an image for a specific member (upload to Firebase Storage)
app.post('/api/organizations/:orgId/teams/:teamId/members/:memberId/upload', upload.single('image'), async (req, res) => {
  const { orgId, teamId, memberId } = req.params;

  try {
    const orgRef = db.collection('organizations').doc(orgId);
    const orgDoc = await orgRef.get();

    if (!orgDoc.exists) {
      return res.status(404).send('Organization not found');
    }

    const team = orgDoc.data().teams.find(t => t.id === parseInt(teamId));
    if (!team) {
      return res.status(404).send('Team not found');
    }

    const member = team.members.find(m => m.id === parseInt(memberId));
    if (!member) {
      return res.status(404).send('Member not found');
    }

    // Upload image to Firebase Storage
    const file = req.file;
    const fileRef = storage.ref().child(`members/${orgId}/${teamId}/${memberId}/${file.filename}`);
    await fileRef.put(file.buffer);

    const imageUrl = await fileRef.getDownloadURL();

    // Update member with the image URL
    const memberIndex = team.members.findIndex(m => m.id === parseInt(memberId));
    team.members[memberIndex].image = imageUrl;

    // Update the organization data in Firestore
    await orgRef.update({
      teams: orgDoc.data().teams,
    });

    res.status(200).json({ message: 'Image uploaded successfully', image: imageUrl });
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ error: 'Error uploading image' });
  }
});

// DELETE API to delete an organization (delete from Firebase Firestore)
app.delete('/api/organizations/:id', async (req, res) => {
  const orgId = req.params.id;

  try {
    const orgRef = db.collection('organizations').doc(orgId);
    const orgDoc = await orgRef.get();

    if (!orgDoc.exists) {
      return res.status(404).send('Organization not found');
    }

    // Delete the organization from Firestore
    await orgRef.delete();

    res.status(200).json({ message: 'Organization deleted successfully' });
  } catch (error) {
    console.error('Error deleting organization:', error);
    res.status(500).json({ error: 'Error deleting organization' });
  }
});

// POST API to add a new team to an organization (add to Firebase Firestore)
app.post('/api/organizations/:orgId/teams', async (req, res) => {
  const { orgId } = req.params;
  const { name } = req.body;

  try {
    const orgRef = db.collection('organizations').doc(orgId);
    const orgDoc = await orgRef.get();

    if (!orgDoc.exists) {
      return res.status(404).send('Organization not found');
    }

    const teamId = orgDoc.data().teams.length + 1;
    const newTeam = { id: teamId, name, members: [] };

    // Add the new team to the organization
    await orgRef.update({
      teams: [...orgDoc.data().teams, newTeam],
    });

    res.status(201).json({ message: 'Team added successfully', team: newTeam });
  } catch (error) {
    console.error('Error adding team:', error);
    res.status(500).json({ error: 'Error adding team' });
  }
});

// POST API to add a new member to a team (add to Firebase Firestore)
app.post('/api/organizations/:orgId/teams/:teamId/members', async (req, res) => {
  const { orgId, teamId } = req.params;
  const { name } = req.body;

  try {
    const orgRef = db.collection('organizations').doc(orgId);
    const orgDoc = await orgRef.get();

    if (!orgDoc.exists) {
      return res.status(404).send('Organization not found');
    }

    const team = orgDoc.data().teams.find(t => t.id === parseInt(teamId));
    if (!team) {
      return res.status(404).send('Team not found');
    }

    const memberId = team.members.length + 1;
    const newMember = { id: memberId, name, image: null };

    // Add the new member to the team
    team.members.push(newMember);

    // Update the team in Firestore
    await orgRef.update({
      teams: orgDoc.data().teams,
    });

    res.status(201).json({ message: 'Member added successfully', member: newMember });
  } catch (error) {
    console.error('Error adding member:', error);
    res.status(500).json({ error: 'Error adding member' });
  }
});

// Start the server on port 5001
app.listen(5001, () => {
  console.log('Backend server is running on http://localhost:5001');
});
