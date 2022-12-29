// "use strict";
const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
module.exports.sendMail = async function sendMail(str,data) {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    // let testAccount = await nodemailer.createTestAccount();
    console.log("nodemailer called");
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
        user: "vivekece1116@gmail.com", // generated ethereal user
        pass: "", // generated ethereal password
        },
    });

    let esubj, eHtml;
    if(str == "signup"){
        esubj = `Thank You For signin ${data.name}`
        eHtml = `
            <h1>FoodApp.com</h1>
            Hope you have a great experience 
            Here are you details
            Name - ${data.name}
            Email - ${data.email}
        `
    }else if(str == "forgetpassword"){
        esubj = `Reset Password`
        eHtml = `
            <h1>FoodApp.com</h1>
            here is your link to reset password :
            ${data.resetPasswordLink }
        `
    }

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"FoodApp 🍕" <vivek221106@gmail.com>', // sender address
        to: data.email, // list of receivers
        subject: esubj, // Subject line
        // text: "Hello world?", // plain text body
        html: eHtml, // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

// main().catch(console.error);