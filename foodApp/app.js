
const express = require("express")
const app = express()
const mongoose = require('mongoose')
const db_link = require('./secrets')
app.use(express.json());

let user = [
    {
        id:1,
        name: "Vivek",
        age:100
    },
    {
        id:2,
        name: "Lalu",
        age:10
    },
    {
        id:1,
        name: "Sonu",
        age:150
    },
];

const userRouter = express.Router()
const authRouter = express.Router()

app.use("/user",userRouter);
app.use("/auth",authRouter);

userRouter
  .route("/")
  .get(getUsers)
  .post(postUser)
  .patch(updateUser)
  .delete(deleteUser);

userRouter.route("/:name").get(getUserById);

authRouter.route("/signup").get(getSignup).post(postSignup);

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

function getSignup(req, res) {
    res.sendFile("/public/index.html", { root: __dirname });
}

async function postSignup(req, res) {
    // let { email, name, password } = req.body;
    try {
        let data = req.body;
        let user = await userModel.create(data)
        console.log(data);
        res.json({
            msg: "user signed up",
            // email,
            // name,
            // password
            user
        })
    }
    catch (err){
        res.json({
            err:err.message
        })
    }
    
}
  

app.listen(5000)

mongoose.connect(db_link)
    .then(function(db){
        console.log("db connected");
        // console.log(db);
    })
    .catch(function(err){
        console.log(err);
    })

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    confirmpassword:{
        type:String,
        required:true,
    },
})

const userModel = mongoose.model("userModel",userSchema);

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
