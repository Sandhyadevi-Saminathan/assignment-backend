
// const User = require('./userModel');
// const fs = require('fs');
// const rawData = fs.readFileSync('C:/Users/Sandhya Saminathan/Downloads/heliverse_mock_data.json');
// const data = JSON.parse(rawData);


// async function seedInitialData() {
//     try {
//       // Check if there's existing data to prevent duplication
//       const existingDataCount = await User.countDocuments();
//       if (existingDataCount === 0) {      
//         // Insert data only if no existing data is found
//         const docs = await User.insertMany(data);
//         console.log('Initial data seeded:', docs);
//       } else {
//         console.log('Database already contains data. Skipping seeding.');
//       }
//     } catch (err) {
//       console.error('Error seeding initial data:', err);
//     }
//   }

  

// module.exports = seedInitialData;
