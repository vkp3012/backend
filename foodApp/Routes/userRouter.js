const express = require("express");
const userRouter = express.Router();
const userModel = require('../models/userModel')

// let user = [
//     {
//         id:1,
//         name: "Vivek",
//         age:100
//     },
//     {
//         id:2,
//         name: "Lalu",
//         age:10
//     },
//     {
//         id:1,
//         name: "Sonu",
//         age:150
//     },
// ];

userRouter
    .route("/")
    .get(getUsers)
    .post(postUser)
    .patch(updateUser)
    .delete(deleteUser);

userRouter
    .route("/setCookies")
    .get(setCookies);

userRouter
    .route("/getCookies")
    .get(getCookies);

userRouter
    .route("/:name")
    .get(getUserById);

async function getUsers(req,res){
    console.log(req.query);
    let {name,age} = req.query;
    //get all users from data base...
    let allUsers = await userModel.find();
    res.json({message: "users retrived" , allUsers});
}
    
function postUser(req,res){
    console.log(req.body.Name);
    user.push(req.body);
    res.json({
        message: "Data received sucessfully",
        user: req.body,
    })
}

async function updateUser(req,res){
    console.log(req.body);
    let dataToBeUpdated = req.body;
    // for(key in dataToBeUpdated){
    //     user[key] = dataToBeUpdated[key];
    // }
    let doc = await userModel.findOneAndUpdate({email:"abc@gmail.com"},dataToBeUpdated)
    res.json({
        message: "Data updated Succesfully"
    });
}

async function deleteUser(req,res){
    // user = {};
    // let doc = await userModel.deleteOne({email:"abcd@gmail.com"})
    // let doc = await userModel.findOneAndRemove({email:"abcdf@gmail.com"})
    let doc = await userModel.findOne({email:"Versha1@gmail.com"})
    console.log(doc);
    let del = await doc.remove();
    console.log(del);
    res.json({
        message: "user has been deleted",
    });
}


function getUserById(req, res) {
    console.log(req.params.name);
    //let {id}=req.params;
    // let user = db.findOne(id);
    res.json({ msg: "user id is ", obj: req.params });
}


function setCookies(req,res){
    // res.setHeader("Set-Cookie",'isLoggedIn = true');
    res.cookie('isLoggedIn',false,{maxAge:1000,secure:true});
    res.cookie('password',12345678,{secure:true});
    res.send("cookies has been set")
}

function getCookies(req,res){
    // let cookies = req.cookies;
    let cookies = req.cookies.password;
    console.log(cookies);
    res.send("cookies received");
}

module.exports = userRouter;