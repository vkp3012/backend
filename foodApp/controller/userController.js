const userModel = require("../models/userModel");


module.exports.getUsers =  async function (req,res){
    console.log(req.query);
    // let {name,age} = req.query;
    //get all users from data base...
    let allUsers = await userModel.find();
    res.json({message: "users retrived" , allUsers});
}
    
module.exports.postUser = function (req,res){
    console.log(req.body.Name);
    user.push(req.body);
    res.json({
        message: "Data received sucessfully",
        user: req.body,
    })
}

module.exports.updateUser = async function (req,res){
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

module.exports.deleteUser = async function (req,res){
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


module.exports.getUserById = function (req, res) {
    console.log(req.params.name);
    //let {id}=req.params;
    // let user = db.findOne(id);
    res.json({ msg: "user id is ", obj: req.params });
}


module.exports.setCookies = function (req,res){
    // res.setHeader("Set-Cookie",'isLoggedIn = true');
    res.cookie('isLoggedIn',false,{maxAge:1000,secure:true});
    res.cookie('password',12345678,{secure:true});
    res.send("cookies has been set")
}

module.exports.getCookies = function (req,res){
    // let cookies = req.cookies;
    let cookies = req.cookies.password;
    console.log(cookies);
    res.send("cookies received");
}


