const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
var cors = require('cors');


app.use(cors());





/** Routes import */
var roleRoute = require('./routes/role');
var authRoute = require('./routes/auth');
var userRoute = require('./routes/user');
const path = require('path');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

/** connecting the database */
const connection = mongoose.connect(process.env.DB_CONNECTION);

/** request handler */
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);

    if(req.method ==='OPTIONS'){
        res.header('Access-Control-Allow-Methods','Put','Post','Patch','Delete');
        return res.status(200).json({});
    }
    next();
})

/** checking server */
app.get('/',(req,res,next)=>{
    res.status(200).json({
        message:"server is running",
    })
});

/** Routes */
app.use('/role',roleRoute);

/** auth route */
app.use('/auth',authRoute);

/**User route */
app.use('/user',userRoute);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));



/** Handling 404 errors */
app.use((req,res,next)=>{
    res.status(404).json({
        message:"Not Found"
    })
});

module.exports = app;