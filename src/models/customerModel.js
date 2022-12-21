const mongoose  = require('mongoose');

const customerSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    mobileNumber: Number,
    DOB: Date,
    emailID: String,
    address: String,
    customerID: String,
    status:{
        type: String,
        default: "INACTIVE"
    }
},{timestaps:true});

module.exports = mongoose.model('Customer', customerSchema)