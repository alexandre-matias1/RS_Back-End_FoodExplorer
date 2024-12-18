const { Router } = require("express");

const RequestsController = require("../controllers/RequestsController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated.js");

const requestsRoutes = Router()

const requestsController = new RequestsController();

requestsRoutes.use(ensureAuthenticated)

requestsRoutes.post("/", requestsController.create)
requestsRoutes.get("/", requestsController.index)
requestsRoutes.get("/:id", requestsController.show)

module.exports = requestsRoutes;


