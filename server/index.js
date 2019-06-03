require('dotenv').config();
const express = require('express');
const {json} = require('body-parser');
const massive = require('massive');
const session = require('express-session');
const {SERVER_PORT, CONNECTION_STRING} = process.env;

const app = express();
app.use(json());

massive(CONNECTION_STRING).then(db => {
    app.set('db', db)
})

const port = SERVER_PORT || 5100;
app.listen(port, () => console.log(`Budgeting the things on ${port}`))