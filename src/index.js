const express = require('express');
const route = require('../src/route')

const app = express();

app.use('/', route);

app.listen(3000, function(){
    console.log('Express app is running on thr port 3000`')
})