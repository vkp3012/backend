var jwt = require('jsonwebtoken');
const userModel = require('/models/userModel');
const { JWT_KEY } = require('/secrets')

module.exports.protectRoute = async function (req, res, next){
    let token;
    if(req.cookies.login){
        token = req.cookies.login;
        let payloadObj = jwt.verify(token,JWT_KEY);
        const user = await userModel.findById(payloadObj.payload);
        req.id = user.id;
        req.role = user.role;
        if (payloadObj) next();
        else {
            req.json({
                message : "user not verified"
            });
        }
    }else{
        return res.json({
            message : 'opertion not allowed'
        });
    }
}; 

//isAutorised - ? check the user role......
//client will send role key in req obj..

module.exports.isAuthorised = function (roles){
    return function (req,res,next){
        let role = req.role;
        if(roles.includes(role)){
            next();
        }else{
            res.status(401).json({
                message : "role invalid",
            });
        }
    };
};