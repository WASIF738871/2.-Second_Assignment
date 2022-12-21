const customerModel = require('../models/customerModel');

const signUp = async function (req, res) {
    try {
        let { firstName, lastName, mobileNumber, DOB, emailID } = req.body;

        if (!firstName) {
            return res.status(400).send({ status: false, message: "Please Enter First Name" })
        }
        if (!/^[a-z ,.'-]+$/i.test(firstName)) {
            return res.status(400).send({ status: false, message: "Please Enter First Name in right format" })
        }
        if (!lastName) {
            return res.status(400).send({ status: false, message: "Please Enter Last Name" })
        }
        if (!/^[a-z ,.'-]+$/i.test(lastName)) {
            return res.status(400).send({ status: false, message: "Please Enter Last Name in right format" })
        }
        if (!mobileNumber) {
            return res.status(400).send({ status: false, message: "Please Enter Mobile No" })
        }
        if (!/^(\+\d{1,3}[- ]?)?\d{10}$/.test(mobileNumber)) {
            return res.status(400).send({ status: false, message: "Please Enter Mobile No in right format.Number should be in 10 digits" })
        }
        if (!DOB) {
            return res.status(400).send({ status: false, message: "Please Enter Date of Birth" })
        }
        if (!emailID) {
            return res.status(400).send({ status: false, message: "Please Enter email ID" })
        }
        if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(emailID)) {
            return res.status(400).send({ status: false, message: "Please Enter email ID in correct format" })
        }
        let uniqueData = await customerModel.findOne({$or:[{ mobileNumber: mobileNumber },{ emailID: emailID }]});
        if (uniqueData) {
            return res.status(400).send({ status: false, message: "Mobile No or Email ID is already registered" });
        }
        
        let customerDetail = await customerModel.create(req.body);
        res.status(201).send({ status: true, message: "You are register successfully", customerDetails: customerDetail });
    }
    catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}


module.exports = {
    signUp
}