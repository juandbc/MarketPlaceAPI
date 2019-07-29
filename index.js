'use strict';

const mongoose = require('mongoose');
const dotenv = require('dotenv');

const app = require('./app');
const Category = require('./model/category');
dotenv.config();

const port = process.env.PORT || 3000;

const host = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`;

mongoose.set('debug', true);
mongoose.connect(host, { useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('Database connection established');
    
    app.listen(port, (err, res) => {
        console.log(`API REST running at ${port} port`);
    });
});
