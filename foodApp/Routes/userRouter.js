const express = require("express");
const userRouter = express.Router();
const { getUsers,postUser,updateUser,deleteUser,getUserById,setCookies,getCookies} = require('../controller/userController');
const {protectRoute} = require('../helper');
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
    .get(protectRoute,getUsers)
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

// let isLoggedIn = true;
// let isLoggedIn = false;
//is admin cookies can be used to identify b/w user and admin..
   

module.exports = userRouter;