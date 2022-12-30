const express = require("express")
const cookieParser = require('cookie-parser')
const cors = require("cors")
const app = express();
app.use(cors());
app.use(express.static('public/build'))
app.use(express.json());
app.use(cookieParser());

const userRouter = require('./Routers/userRouter')
const planRouter = require('./Routers/planRouter')
const reviewRouter = require('./Routers/reviewRouter')
const bookingRouter = require("./Routers/bookingRouter");

app.use("/user",userRouter);
app.use("/plan",planRouter);
app.use("/review",reviewRouter);
app.use('/booking', bookingRouter)

const port = process.env.PORT || 5000 ;
app.listen(port)

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
