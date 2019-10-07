require('dotenv').config();

const express = require('express');
const app = express();
const coffee = require('./controllers/coffeecontroller');
const user = require('./controllers/usercontroller');
const review = require('./controllers/reviewcontroller');
const sequelize = require('./db');

sequelize.sync();
app.use(express.json());
app.use(require('./middleware/headers'));

app.use('/coffee', coffee);
app.use('/user', user);
app.use('/review', review);

app.listen(process.env.PORT, () => console.log(`app is listening`));