const express = require('express');

const bodyParser = require('body-parser');
const mongodb = require('./data/database');
const app = express();

const port = process.env.PORT || 3000;
const dotentv = require(('dotenv'));
dotentv.config();

app.use(bodyParser.json());
app.use((req, res, next) =>{
    res.setHeader('Access-Control-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Header',
        'Origin, X-Requested-with, Content-Type, Accept, Z-Key'
    );
    res.setHeader('access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});
app.use('/', require('./routes'));

mongodb.initDb((err)=> {
    if(err){
        console.log(err);
    }
    else {
        app.listen(port, () => {console.log(`Database is listening and running on port  ${port} `)});
    }
}); 