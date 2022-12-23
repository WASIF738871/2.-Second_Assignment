const customerModel = require('../models/customerModel');


//===============================CUSTOMER SIGNUP=============================================
const signUp = async function (req, res) {
    try {
        let { firstName, lastName, mobileNumber, DOB, emailID } = req.body;
        // if(Object.keys(req.body).length ==0){

        // }
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

//=====================================GET ALL CUSTOMER===================================

const getActiveUsers = async function(req, res){
    try{
        let isActive = req.query.status;
        let allActiveUsers = await customerModel.find({status:isActive});
        if(!allActiveUsers.length){
            return res.status(404).send({status:false, message: "No active users found"});
        }
        return res.status(200).send({status: true, message:`${allActiveUsers.length} user found`, allActiveUsers:allActiveUsers});

    }
    catch(error){
        return res.status(500).send({status:false, message: error.message});
    }
}

//==================================DELETE USERS===============================================

const deleteCustomer = async function(req, res){
    try{
        let customerID = req.params.customerID;
        let customerDeleted = await customerModel.findByIdAndUpdate(customerID,{$set:{status:"INACTIVE"}},{new: true});
       
        return res.status(200).send({status:false, message:`${customerDeleted.firstName+" "+customerDeleted.lastName} is deleted succssfully`, customerDeleted})
    }
    catch(error){
        return res.status(500).send({status: false, message:error.message});
    }
}


module.exports = {
    signUp,
    getActiveUsers,
    deleteCustomer
}