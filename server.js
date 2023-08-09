require("dotenv").config();

const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

const menuItemsRouter = require('./routes/menuItems');
const usersRouter = require('./routes/users');
const errorHandler = require("./middlewares/error_handeler");
const checkToken = require('./middlewares/check_token');
const ensureLoggedIn = require('./middlewares/ensure_logged_In');

require('./db')


app.use(express.json());
app.use(checkToken);
app.use('/api/menuItems', menuItemsRouter);
app.use('/api/login', usersRouter);

//handle error all page
app.use(errorHandler);




app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
})