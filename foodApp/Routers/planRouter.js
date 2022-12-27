const express = require("express");
const { isAuthorised, protectRoute } = require("../helper");
const planRouter = express.Router();

planRouter
    .route()
    .get(getAllPlans)

planRouter.use(protectRoute)
planRouter
    .route()
    .get(getPlan);

planRouter.use(isAuthorised(['admin','restaurantowner']))
planRouter
    .route()
    .post(createPlan)
    .patch(updatePlan)
    .delete(deletePlan)



module.exports = planRouter;