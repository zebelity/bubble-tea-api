require('dotenv').config();
require('./index.js');

const User = require('../models/user');
  
async function createUser() {
  try {
    const newUser = await User.create({
      email: 'sei65@ga.co',
      username: 'Sei65',
      password_digest: 'pudding', // 
    });
    
    console.log('New user created:', newUser);
  } catch (error) {
    console.error('Error creating user:', error);
  } finally {
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

const myUser = [
  {
    'email': 'chatkamon@ga.co',
    'username': 'Zebelity',
    'password_digest': 'mooham'
  },
  {
    'email': 'sei65@ga.co',
    'username': 'Sei65',
    'password_digest': 'pudding'
  },
]
