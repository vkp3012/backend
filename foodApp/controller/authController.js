const userModel = require('../models/userModel');
var jwt = require('jsonwebtoken');
const {JWT_KEY} = require('../helper')

module.exports.signup = async function (req, res) {
    // let { email, name, password } = req.body;
    try {
        let data = req.body;
        let user = await userModel.create(data);
        if(user){
            res.json({
                msg: "user signed up", // email,name,password
                user
            })
        }else{
            res.json({
                msg: "user could not be signed up"
            })
        }
    }
    catch (err){
        res.json({
            err:err.message
        })
    }
    
}

module.exports.login = async function (req,res){
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