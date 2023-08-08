require("dotenv").config();

const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

const menuItemsRouter = require('./routes/menuItems');
// const usersRouter = require('./routes/users');



require('./db')

app.use(express.json());

app.use('/api/menuItems', menuItemsRouter);
// app.use('/api/login', usersRouter)






app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})