const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class menuController{
    async create(request, response){
        const { name, preco, description, category, ingredients } = request.body
        console.log("a")

        const [menu_id] = await knex("menu").insert({
            name,
            preco,
            description,
            category
        })

        const ingredientsInsert = ingredients.map(ingredient =>{
            return {
                menu_id,
                name:ingredient
            }
        })
        await knex("ingredients").insert(ingredientsInsert)

        return response.status(201).json();
    }
}



module.exports = menuController