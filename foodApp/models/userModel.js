const mongoose = require('mongoose')
const db_link = require('../secrets')
const emailValidator = require("email-validator")
const bcrypt = require("bcrypt")

mongoose.connect(db_link)
    .then(function(db){
        console.log("db connected");
        // console.log(db);node
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
        unique:true,
        validate: function(){
            return emailValidator.validate(this.email)
        },
    },
    password:{
        type:String,
        required:true,
    },
    confirmpassword:{
        type:String,
        required:true,
        validate: function(){
            return this.confirmpassword == this.password
        }
    },
})
// learing hook.......................
// userSchema.pre('save',function () {
//     console.log('before saving in db');
// })

// userSchema.post('save',function () {
//     console.log('after saving in db');
// })

userSchema.pre('save',function () {
    // console.log('before saving in db');
    this.confirmpassword = undefined;
})


userSchema.pre('save',async function(){
    let salt = await bcrypt.genSalt();
    console.log(salt);
    let hashedString = await bcrypt.hash(this.password,salt);
    this.password = hashedString
    // console.log(hashedString);
})

//model
const userModel = mongoose.model("userModel",userSchema);
module.exports = userModel;