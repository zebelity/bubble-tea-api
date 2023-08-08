require('dotenv').config()
require('./index.js')

const User = require('../models/user');


// User.create({
//         email: 'chatkamon@ga.co',
//         username: 'Zebelity',
//         password_digest: 'mooham'
//       })
//   .then(res => console.log(res.rows[0]))
//   .catch(err => console.log(err))
  
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
    db.close();
  }
}
