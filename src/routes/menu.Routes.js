const { Router } = require("express");

const MenuController = require("../controllers/MenuController");

const menuRoutes = Router();


const menuController = new MenuController();


menuRoutes.post("/", menuController.create)
menuRoutes.put("/:id", menuController.update)
menuRoutes.delete("/:id",menuController.delete)

module.exports = menuRoutes