const express = require('express');
const app = express();
const cors = require("cors");
const seedInitialData = require('./Models/initialLoad');
const User = require('./Models/userModel');
const userRoutes= require('./Routes/userRoutes')
const teamRoutes = require('./Routes/teamRoutes')

app.use(express.json());

app.use(cors({
    origin: "https://dancing-treacle-f470d0.netlify.app"
}))

seedInitialData(); 

app.use('/user', userRoutes);
app.use('/team', teamRoutes);












  
  
//   const User = mongoose.model('User', userSchema);

//   mongoose.connect(process.env.DB, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(async () => {
//     console.log('Connected to MongoDB');
//     await seedInitialData();
//   })
//     .catch(err => {
//         console.error('Error connecting to MongoDB:', err);
//       });
    

//       async function seedInitialData() {
//         try {
//           // Check if there's existing data to prevent duplication
//           const existingDataCount = await User.countDocuments();
//           if (existingDataCount === 0) {      
//             // Insert data only if no existing data is found
//             const docs = await User.insertMany(data);
//             console.log('Initial data seeded:', docs);
//           } else {
//             console.log('Database already contains data. Skipping seeding.');
//           }
//         } catch (err) {
//           console.error('Error seeding initial data:', err);
//         }
//       }
  




const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});