require('dotenv').config();
require('./index.js');

const User = require('../models/user');
  
async function createUser() {
  try {
    const newUser = await User.create({
      email: 'chatkamon@ga.co',
      username: 'Zebelity',
      password_digest: 'mooham', // 
    });
    
    console.log('New user created:', newUser);
  } catch (error) {
    console.error('Error creating user:', error);
  } finally {
    // Close the database connection
    console.log("Done");
  }
}
createUser();


async function getAllUsers() {
  try {
    const users = await User.find();
    console.log('All users:', users);
  } catch (error) {
    console.error('Error fetching users:', error);
  }
}

getAllUsers();

// async function deleteAllUsers() {
//   try {
//     const deleteResult = await User.deleteMany({});
//     console.log(`Deleted ${deleteResult.deletedCount} users`);
//   } catch (error) {
//     console.error('Error deleting users:', error);
//   }
// }

// deleteAllUsers();