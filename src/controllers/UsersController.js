class usersControllers{
    create(request, response){
        const{ name, email, password, isAdmin } = request.body;

        response.json({name, email, password, isAdmin})
    }
}

module.exports = usersControllers