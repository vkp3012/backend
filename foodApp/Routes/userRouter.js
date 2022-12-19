const { append } = require("cheerio/lib/api/manipulation");
const express = require("express");
const userRouter = express.Router();
const { getUser,postUser,updateUser,deleteUser,getAllUser} = require('../controller/userController');
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

//user option
userRouter
    .route('/:id')
    .patch(updateUser)
    .delete(deleteUser)

//profile page
app.use(protectRoute)
userRouter
    .route('/userProfile')
    .get(getUser)

//admin specific function
app.use(isAuthorised(['admin']));
userRouter.route('')
    .get(getAllUser)

// let isLoggedIn = true;
// let isLoggedIn = false;
//is admin cookies can be used to identify b/w user and admin..
   

module.exports = userRouter;