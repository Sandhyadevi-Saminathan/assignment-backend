
const express = require('express');
const router = express.Router();
const Team = require('../Models/teamModel'); // Assuming your Team model file is in a 'models' folder
const User = require('../Models/userModel'); // Assuming your User model file is in a 'models' folder

// Route to create a team
router.post('/create', async (req, res) => {
  const { teamName, users } = req.body;

  try {
    // Create a new team instance
    const newTeam = new Team({
      teamName,
      users, // Assuming 'users' contains an array of user IDs
    });

    // Save the team
    const savedTeam = await newTeam.save();

    // Add the team reference to the user documents
    await User.updateMany(
      { _id: { $in: users } },
      { $push: { teams: savedTeam._id } } // Assuming 'teams' is an array field in the User model
    );

    res.status(201).json(savedTeam);
  } catch (error) {
    console.error('Error creating team:', error);
    res.status(500).json({ error: 'Error creating team' });
  }
});

// Route to get specific team details
router.get('/teamdetails/:teamId', async (req, res) => {
    try {
      const team = await Team.findById(req.params.teamId).populate('users'); 
      res.json(team);
    } catch (error) {
      console.error('Error fetching team details:', error);
      res.status(500).json({ error: 'Error fetching team details' });
    }
  });

  // // Route to get all teams
  router.get('/teams', async (req, res) => {
    try {
      const teams = await Team.find({}, 'teamName'); // Fetching only team names
      res.json(teams);
    } catch (error) {
      console.error('Error fetching teams:', error);
      res.status(500).json({ error: 'Error fetching teams' });
    }
  });

module.exports = router;
