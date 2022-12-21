const customerModel = require('../models/customerModel');

const signUp = async function (req, res) {
    try {
        let customerDetail = req.body
        let {firstName, lastName, mobileNo, DOB, emailID, address, customerID, status} =customerDetail;
        res.status(201).send({ status: true, message: "You are register successfully", customerDetails: customerDetail });
    }
    catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}


module.exports = {
    signUp
}