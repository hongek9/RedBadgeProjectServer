require('dotenv').config();
console.log(process.env.PASS)

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

app.listen('3000', () => console.log(`app is listening `));