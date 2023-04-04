const { Router } = require("express");

const usersRoutes = require("./users.Routes")
const menuRoutes = require("./menu.Routes")

const routes = Router()

routes.use("/users", usersRoutes)
routes.use("/menu", menuRoutes)

module.exports = routes;
