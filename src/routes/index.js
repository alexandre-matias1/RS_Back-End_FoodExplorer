const { Router } = require("express");

const usersRoutes = require("./users.Routes")

const routes = Router()

routes.use("/users", usersRoutes)

module.exports = routes;
