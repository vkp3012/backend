const express = require('express')
const app = express();
app.use(express.json());
app.listen(3000);

//middleware function -> post, front -> json

let users = {};
 
//get
app.get('/user',(req,res)=>{
    res.send(users);
})

//post
app.post('/user',(req,res)=>{
    console.log(req.body);
    users = req.body;
    res.json({
        message:"data received successfully",
        users: req.body
    });
});

//patch

app.patch('/user',(req,res)=>{
    console.log('req.body ->',req.body);

    //update data in user obj
    let dataToBeUpdated = req.body;
    for(key in dataToBeUpdated){
        users[key] = dataToBeUpdated[key];
    };
    res.json({
        message:"data update successfully"
    });
})

//to delete a data
app.delete('/user',(req,res)=>{
    users = {};
    res.json({
        message:"delete data successfully"
    });
})

