const express = require("express")
const app = express()
const cookieParser = require('cookie-parser')

app.use(express.json());
app.use(cookieParser());



const userRouter = require('./Routes/userRouter')
const authRouter = require('./Routes/authRouter')

app.use("/user",userRouter);
app.use("/auth",authRouter);


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
