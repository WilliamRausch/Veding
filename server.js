const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const routes = require('./routes/index.js')


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(routes);

app.listen(3000, function(){
  console.log("running");
})