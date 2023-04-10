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
                ingredient
            }
        })

        await knex("ingredients").insert(ingredientsInsert)

        return response.status(201).json();
    }

    async update(request, response){
            const { name, preco, description, category, ingredients } = request.body;
            const { id } = request.params         

            const dishExists= await knex("menu").where({name}).first()

            if(dishExists){
                throw new AppError("O prato já existe")
            }
    

            await knex("menu").where({id}).update({
                name,
                preco,
                description,
                category,
            })


            const updateIngredients = ingredients.map(ingredient =>{
                return{
                    menu_id: id,
                    ingredient
                }
            })

            await knex("ingredients").where({menu_id:id}).delete()
            await knex("ingredients").insert(updateIngredients)


            response.json({name, preco, description, category, ingredients})

    }

    async delete(request, response){
        const { id } = request.params;


        await knex("menu").where({ id }).delete();
        //await knex("ingredients").where({menu_id: id}).delete();

        return response.status(204).json()
    }

    async show(request, response){
        const { id } = request.params;

        const menu = await knex("menu").where({ id }).first();
        const ingredients = await knex("ingredients").where({ menu_id: id }).orderBy("ingredient")


        return response.json({
            ...menu,
            ingredients
        })
    }

    async index(request, response){
        const { name, ingredients } = request.query

        let menu;

        if(ingredients){
            const filterIngredients = ingredients.split(',').map(ingredient => ingredient.trim()) 

            menu = await knex("ingredients")
            .select([
              "menu.id",
              "menu.name",
            ])
            .whereLike("menu.name", `%${name}%`)
            .whereIn("ingredient", filterIngredients) 
            .innerJoin("menu", "menu.id", "ingredients.menu_id")
            .orderBy("menu.name")
        
            console.log(menu)
        }else{
            menu = await knex("menu")
            .whereLike("name", `%${name}%`)
            .orderBy("name")
        }

        const ingredientsMenu = await knex("ingredients")
        const menuWithIngredients = menu.map(menu =>{
            const menuIngredient = ingredientsMenu.filter(ingredient => ingredient.menu_id === menu.id)
            
            return{
                ...menu,
                ingredients: menuIngredient
            }
        
        
        })


        return response.json(menuWithIngredients)
    }
}



module.exports = menuController