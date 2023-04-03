const knex = require("../database/knex/");
const AppError = require("../utils/AppError");
const { hash, compare } = require ("bcryptjs");
class usersControllers{
    async create(request, response){
        const{ name, email, password, isAdmin } = request.body;
        
        const checkUserExist = await knex("users").select("email").where('email','=',email);
            if(checkUserExist != 0){
            throw new AppError("Este email já está em uso");
        }

        const hashedPassword = await hash(password, 8);

        const createUser = await knex("users").insert({
            name,
            email,
            password:hashedPassword,
            isAdmin
        });

        return response.status(201).json();
    }

}

module.exports = usersControllers;