const express = require("express")
const cookieParser = require('cookie-parser')
const app = express();
app.use(express.json());
app.use(cookieParser());

const userRouter = require('./Routers/userRouter')
const planRouter = require('./Routers/planRouter')
const reviewRouter = require('./Routers/reviewRouter')

app.use("/user",userRouter);
app.use("/plan",planRouter);
app.use("/review",reviewRouter);

app.listen(5000)

//model
// const userModel = mongoose.model("userModel",userSchema);

// (async function createUser() {
//     let user = {
//         name:"Versha",
//         email:"Versha@gmail.com",
//         password : "12345678",
//         confirmpassword :"12345678"
//     };
//     let data = await userModel.create(user);
//     console.log(data) ;
// })() 
