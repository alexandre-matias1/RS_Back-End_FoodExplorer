const { Router } = require("express");

const usersRoutes = require("./users.Routes")
const menuRoutes = require("./menu.Routes")
const sessionRoutes = require("./sessions.Routes")

const routes = Router()

routes.use("/users", usersRoutes)
routes.use("/menu", menuRoutes)
routes.use("/sessions", sessionRoutes)

module.exports = routes;
