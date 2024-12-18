const { Router } = require("express");

const MenuController = require("../controllers/MenuController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated.js")

const menuRoutes = Router();


const menuController = new MenuController();

menuRoutes.use(ensureAuthenticated)

menuRoutes.post("/", menuController.create)
menuRoutes.put("/:id", menuController.update)
menuRoutes.delete("/:id",menuController.delete)
menuRoutes.get("/:id",menuController.show)
menuRoutes.get("/",menuController.index)

module.exports = menuRoutes