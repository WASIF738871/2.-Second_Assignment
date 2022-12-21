const express = require('express');
const mongoose = require('mongoose');
const customerRouter = require('./routes/customerRoute');
const cardRouter = require('./routes/cardRoute');

const app = express();

app.use(express.json());

app.use('/', customerRouter);
app.use('/', cardRouter);

// Mongoose connection
mongoose.set('strictQuery',false)
mongoose.connect('mongodb+srv://WASIF321:Ansari738871@wasifdatabase.wdcjr.mongodb.net/vishWas')
.then(()=>{
    console.log('mongoDB is connected')
})
.catch(error=>{
    console.log(error)
})

// App is listening on the port 3000

app.listen(3000, function(){
    console.log('Express app is running on thr port 3000`')
})