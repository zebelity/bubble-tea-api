require("dotenv").config();

const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

const menuItemsRouter = require('./routes/menuItems');
const usersRouter = require('./routes/users');
const errorHandler = require("./middlewares/error_handeler");
const checkToken = require('./middlewares/check_token');

require('./db')

app.use(express.json());
app.use(checkToken);
app.use('/api/login', usersRouter);
app.use('/api/menuItems', menuItemsRouter);


//handle error all page
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
})