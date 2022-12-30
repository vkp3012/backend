const userModel = require("./models/userModel");

module.exports.getUser =  async function (req,res){
    // console.log(req.query);
    // let {name,age} = req.query;
    //get all users from data base...
    try {
        let id = req.id;
        let user = await userModel.findById(id);
        res.json({message: "users retrived" , user});
    }
    catch(err){
        res.json({
            message: err.message
        });
    }
}
    
// module.exports.postUser = function (req,res){
//     console.log(req.body.Name);
//     user.push(req.body);
//     res.json({
//         message: "Data received sucessfully",
//         user: req.body,
//     })
// }

module.exports.updateUser = async function (req,res){
    console.log(req.body);
    let id = req.params.id;
    let user = await userModel.findById(id);
    let dataToBeUpdated = req.body;
    // {
    //     name: 'viv',
    //     email:'xyz@gmail.com'
    // }
    try{
        if (user){
            const keys = []; //['name','email']
            for ( let key in dataToBeUpdated){
                keys.push(key);
            }

            for (let i = 0;i < keys.length; i++){
                user[keys[i]] = dataToBeUpdated[keys[i]];
            }

            const updatedData = await user.save();
            res.json({
                message: "Data updated Succesfully",
                updatedData, 
            });
        }else{
            // for(key in dataToBeUpdated){
            //     user[key] = dataToBeUpdated[key];
            // }
            // let doc = await userModel.findOneAndUpdate(,dataToBeUpdated)
            res.json({
                message: "user not found",
            });
        }
    }
    catch(err){
        res.json({
            message: err.message,
        });
    }
};

module.exports.deleteUser = async function (req,res){
    // user = {};
    // let doc = await userModel.deleteOne({email:"abcd@gmail.com"})
    // let doc = await userModel.findOneAndRemove({email:"abcdf@gmail.com"})
    // let doc = await userModel.findOne({email:"Versha1@gmail.com"})
        // console.log(doc);
        // let del = await doc.remove();
        // console.log(del)
    try{
        let id = req.params.id;
        let user = await userModel.findByIdAndDelete(id);
        res.json({
            message: "user has been deleted",
            user,
        });
    }
    catch(err){
        res.json({
            message: err.message,
        });
    }
};


module.exports.allUser = async function (req, res) {
    //let {id}=req.params;
    try{
        let allUsers = await userModel.find();
        res.json({ 
            msg: "user id is ", 
            allUsers,
        });
    }
    catch(err){
        res.json({
            message: err.message,
        });
    }
};


// module.exports.setCookies = function (req,res){
//     // res.setHeader("Set-Cookie",'isLoggedIn = true');
//     res.cookie('isLoggedIn',false,{maxAge:1000,secure:true});
//     res.cookie('password',12345678,{secure:true});
//     res.send("cookies has been set")
// }

// module.exports.getCookies = function (req,res){
//     // let cookies = req.cookies;
//     let cookies = req.cookies.password;
//     console.log(cookies);
//     res.send("cookies received");
// }


