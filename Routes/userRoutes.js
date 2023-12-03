const express = require('express');
const router = express.Router();
const User = require('../Models/userModel');

// Define a route to retrieve user data
router.get('/users', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Get the requested page number or default to 1
    const limit = 20; // Number of users per page
    const skip = (page - 1) * limit; // Calculate the number of users to skip

    const users = await User.find().skip(skip).limit(limit); // Retrieve users for the current page
    const totalUsersCount = await User.countDocuments(); // Get the total count of users

    res.json({
      users: users,
      totalPages: Math.ceil(totalUsersCount / limit), 
      
    });
  } catch (err) {
    console.error('Error retrieving user data:', err);
    res.status(500).send('Error retrieving user data');
  }
});

//Route to get particular user 
router.get('/users/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId); 
    res.json(user);
  } catch (error) {
    console.error('Error fetching user details:', error);
    res.status(500).json({ error: 'Error fetching user details' });
  }
});

//Route to add user

router.post('/users', async (req, res) => {
  try {
    const {  first_name, last_name, email, gender,
       avatar,
     domain,
     available } = req.body; 

    // Create a new user instance
    const newUser = new User({
      first_name, last_name, email, gender,
       avatar,
     domain,
     available
      // Other fields if present in your schema
    });

    // Save the new user to the database
    const savedUser = await newUser.save();

    res.status(201).json(savedUser); // Respond with the created user data
  } catch (err) {
    console.error('Error creating user:', err);
    res.status(500).send('Error creating user');
  }
});

//Route to handle user search
router.get('/search', async (req, res) => {
  try {
    const query = req.query.query;
    const regex = new RegExp(`\\b${query}`, 'i'); // Case-insensitive whole word search query

    // Search for users by name using the regex pattern
    const users = await User.find({
      $or: [{ first_name: regex }, { last_name: regex }]
    });

    res.json(users);
  } catch (error) {
    console.error('Error searching users:', error);
    res.status(500).json({ error: 'Error searching users' });
  }
});

//Route to handle user filter
router.get('/filter', async (req, res) => {
  
  try {
    const { domain, gender, available } = req.query;
   
    // Build the query based on filter parameters
    const filterQuery = {};
    if (domain) {
      filterQuery.domain = domain;
    }
    if (gender) {
      filterQuery.gender = gender;
    }
    if (available) {
      filterQuery.available = available 
    }

    // Fetch users based on the filtered criteria
    const users = await User.find(filterQuery);
    res.json(users);
  } catch (error) {
    console.error('Error filtering users:', error);
    res.status(500).json({ error: 'Error filtering users' });
  }
});

// PUT method to edit user details
router.put('/users/:userId', async (req, res) => {
  const { userId } = req.params;
  const { email, first_name, last_name, domain, gender, available, avatar } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { email, first_name, last_name, domain, gender, available, avatar },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(updatedUser);
  } catch (error) {
    console.error('Error updating user details:', error);
    res.status(500).json({ error: 'Error updating user details' });
  }
});


// DELETE method to remove a user
router.delete('/users/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Error deleting user' });
  }
});

module.exports = router;
