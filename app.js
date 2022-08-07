const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const notesRouter = require('./routes/notes');
require('dotenv').config()

const port = 3000;
const host = 'localhost';

const app = express();

app.use(bodyParser.json({ type: 'application/*+json' }));

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const client = mongoose.connection

client.on('open', () => {
    console.log('connected...')
})

app.use(express.json());
app.use(express.urlencoded({extended : true}));

app.use(express.static('public'));


app.use('/notes', notesRouter);

app.set('view engine', 'ejs');

app.listen(port, () => {
    console.log(`server is running in http://${host}:${port}`);
})


