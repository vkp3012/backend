const express = require("express");
const authRouter = express.Router();
const userModel = require('../models/userModel');
var jwt = require('jsonwebtoken');
const JWT_KEY = "adhjkha247gf8ur"


authRouter
    .route("/signup")
    .get(getSignup)
    .post(postSignup);

authRouter
    .route('/login')
    .post(loginUser)

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

async function loginUser(req,res){
    try{
        let {email,password} = req.body;
        let user = await userModel.findOne({email:email});

        if(user){
            //check id password matches
            if(password == user.password){
                let uid = user['_id']
                var token = jwt.sign({payload : uid},JWT_KEY);
                res.cookie('login',token)
                res.json({
                    message : "user logged in"
                })
            }else{
                res.json({
                    message : "wrong credentials"
                })
            }

        }else{
            res.json({
                message : "user not found"
            })
        }
    }
    catch(err){
        res.json({
            message: err.message
        })
    }
    
}

module.exports = authRouter;