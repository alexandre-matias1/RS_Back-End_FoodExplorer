const knex = require("../database/knex/");
const AppError = require("../utils/AppError");
const { hash, compare } = require ("bcryptjs");
class usersControllers{
    async create(request, response){
        const{ name, email, password, isAdmin } = request.body;
        
        const [checkUserExist] = await knex("users").select("email").where('email','=',email);
            if(checkUserExist){
            throw new AppError("Este email já está em uso");
        }

        const hashedPassword = await hash(password, 8);

        await knex("users").insert({
            name,
            email,
            password:hashedPassword,
            isAdmin
        });

        return response.status(201).json();
    }
    async update(request, response){
        const { name, email, oldPassword, newPassword } = request.body
        const user_id = request.user.id

        const [user] = await knex("users").select("*").where({id:user_id})
        if(!user){
            throw new AppError("Usuario nao encontrado")
        }

        const [userWithUpdatedEmail] = await knex("users").select("*").where({email})
        

        if(userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id){
            throw new AppError("Este e-mail já esta em uso")
        }
        
        user.name = name ?? user.name;
        user.email = email ?? user.email;

        if(!oldPassword && newPassword){
            throw new AppError("Você precisa informar a senha antiga")
         }

        if(newPassword && oldPassword){
            const checkPassword = await compare(oldPassword, user.password);

            if(!checkPassword){
                throw new AppError("Senha antiga incorreta")
            }
        }

        user.password = await hash(newPassword, 8)
        
        await knex("users").where({id:user_id}).update({
            name:user.name,
            email:user.email,
            password:user.password
        })

        return response.status(201).json();
    }
}

module.exports = usersControllers;