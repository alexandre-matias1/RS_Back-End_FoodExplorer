const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class requestsController{
    async create(request, response){
        const { menu, amount } = request.body
        const user_id = request.user.id
        
        const menuInsert = menu.map(menu =>{
            return {
                menu_id:menu,
                user_id,
                amount
            }
        })
        console.log(menuInsert)

        await knex("request").insert(menuInsert)
        return response.status(201).json(menuInsert)
    }
}


module.exports = requestsController