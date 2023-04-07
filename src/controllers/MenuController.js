const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class menuController{
    async create(request, response){
        const { name, preco, description, category, ingredients } = request.body

        const dishExists= await knex("menu").where({name}).first()

        if(dishExists){
            throw new AppError("O prato já existe")
        }


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

    async update(request, response){
            const { name, preco, description, category, ingredients } = request.body;
            const { id } = request.params         



            await knex("menu").where({id}).update({
                name,
                preco,
                description,
                category,
            })


            const updateIngredients = ingredients.map(ingredient =>{
                return{
                    menu_id: id,
                    name: ingredient
                }
            })

            await knex("ingredients").where({menu_id:id}).delete()
            await knex("ingredients").insert(updateIngredients)


            response.json({name, preco, description, category, ingredients})

    }

    async delete(request, response){
        const { id } = request.params;


        await knex("menu").where({ id }).delete();
        await knex("ingredients").where({menu_id: id}).delete();

        return response.status(204).json()
    }
}



module.exports = menuController