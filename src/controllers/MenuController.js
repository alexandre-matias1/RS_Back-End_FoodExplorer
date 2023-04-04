const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class menuController{
    async create(request, response){
        const { name, price, description, category } = request.body
        console.log("a")

        response.json({ name, price, description, category } )
    }
}



module.exports = menuController