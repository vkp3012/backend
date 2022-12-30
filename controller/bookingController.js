let SK = "sk_test_51MJvwgSFBfXVUq2bTwm7WRAxWRHNfAZ0CwszJxXlmefIMg51GF6D4IHVeQXwebwca4QlrwfzaRNkIEuCVwxiLtgb00nCFocEqb"
const stripe = require('stripe')(SK);
const planModel=require("/models/planModel")
const userModel = require("/models/userModel")

module.exports.createSession = async function (req, res) {
    try {
        // let userId = req.id;
        // let planId = req.params.id;
        // const user = await userModel.findById(userId);
        // const plan = await planModel.findById(planId);

        const session = await stripe.checkout.sessions.create({
        //   payment_method_type: ["card"],
        //   customer_email: user.email,
        //   client_reference_id: plan.id,
          line_items: [
            {
              // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
            //   name: plan.name,
                // amount:"1234",
                // currency: "inr",
                // name: "HealthyFood101",
                // description: "get yourself in shape",
            //   description: plan.description,
            //   price: plan.price * 100,
            //   quantity: 1,
            price_data: {
                currency: 'inr',
                unit_amount: 20000,
                product_data: {
                  name: 'HealthyFood101',
                  description: 'Good Food',
                  images: ['https://example.com/food.png'],
                },
              },
              quantity: 1,
            },
          ],
          mode: "payment",
          success_url: `${req.protocol}://${req.get("host")}/profile`,
          cancel_url: `${req.protocol}://${req.get("host")}/profile`,
        });
        // res.json({
        //     msg: "success",
        //     session
        // });
        res.redirect(303, session.url);
    }
    catch (err) {
        res.json({
            err:err.message
        })
    }
}