const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class requestsController{
    async create(request, response){
        const { menu, amount } = request.body
        const user_id = request.user.id
        
        const separetor = ","

        const menuToString = menu.join(separetor)

        const requests = await knex("request").insert({
            menu_id:menuToString,
            user_id,
            amount
        })

        return response.status(201).json(requests)
    }

    async index(request, response){
        const user_id = request.user.id

        const clientRequests = await knex("request").where({user_id});

        console.log(clientRequests)

        return response.status(200).json(clientRequests)
    }

    async show(request, response){
        const { id } = request.params;
        const user_id = request.user.id;

        const [showRequest] = await knex("request").where({id})
        // const menuToArray = showRequest.menu_id.split(",")
        
        return response.json(showRequest)
    }
}


module.exports = requestsController