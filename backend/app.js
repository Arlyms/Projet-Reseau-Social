const express = require('express');
const path = require('path');
const helmet = require('helmet');

const routerUsers = require('./routes/user.routes');
const routerPosts = require('./routes/post.routes');

const app = express();

app.use((req, res, next) => {  
    res.setHeader('Access-Control-Allow-Origin','*'); 
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'); 
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.use(helmet());

app.use ('/images', express.static(path.join(__dirname,'images'))),
app.use(routerUsers);
app.use(routerPosts);

module.exports = app;