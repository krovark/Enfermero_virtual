var UserService = require('../services/user.service');

_this = this;

// Obtener lista de usuarios
exports.getUsers = async function (req, res, next) {
    var page = req.query.page ? req.query.page : 1;
    var limit = req.query.limit ? req.query.limit : 10;

    try {
        var Users = await UserService.getUsers({}, page, limit);
        return res.status(200).json({ status: 200, data: Users, message: "Usuarios obtenidos exitosamente" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

// Crear usuario
// exports.createUser = async function (req, res, next) {
//     var newUser = req.body; 

//     try {
//         var createdUser = await UserService.createUser(newUser);
//         return res.status(201).json({ token: createdUser, message: "Usuario creado exitosamente" });
//     } catch (e) {
//         return res.status(400).json({ status: 400, message: "Error al crear el usuario" });
//     }
// }

exports.createUser = async function (req, res, next) {
    // Req.Body contains the form submit values.
    console.log("llegue al controller",req.body)
    var User = {
        username:req.body.username,
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        email: req.body.email,
        telefono: req.body.telefono,
        password: req.body.password, 
        sangreTipo: req.body.sangreTipo,
        peso: req.body.peso,
        altura: req.body.altura,
        c_emergencia: req.body.c_emergencia,
        genero: req.body.genero,
        edad: req.body.edad
    }
    try {
        // Calling the Service function with the new object from the Request Body
        var createdUser = await UserService.createUser(User)
        return res.status(201).json({createdUser, message: "Succesfully Created User"})
    } catch (e) {
        if (e.message === 'El email ya se encuentra registrado.') {
            // Devolver un código de estado HTTP 409 si el email ya está registrado
            return res.status(409).json({ message: e.message });
        }
        //Return an Error Response Message with Code and the Error Message.
        console.log(e)
        console.error(e)
        return res.status(400).json({status: 400, message: "User Creation was Unsuccesfull"})
    }
}



// Actualizar usuario
exports.updateUser = async function (req, res, next) {
    var userId = req.params.id; // Asumiendo que el ID se envía como parámetro
    var userData = req.body;

    try {
        var updatedUser = await UserService.updateUser(userId, userData);
        return res.status(200).json({ status: 200, data: updatedUser, message: "Usuario actualizado exitosamente" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

// Eliminar usuario
exports.removeUser = async function (req, res, next) {
    var id = req.params.id; // Asumiendo que el ID se envía como parámetro

    try {
        await UserService.deleteUser(id);
        return res.status(200).json({ status: 200, message: "Usuario eliminado exitosamente" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

// Iniciar sesión
// exports.loginUser = async function (req, res, next) {
//     var userCredentials = req.body;

//     try {
//         var loginUser = await UserService.loginUser(userCredentials);
//         if (!loginUser) {
//             return res.status(400).json({ message: "Error en las credenciales" });
//         }
//         return res.status(200).json({ loginUser, message: "Inicio de sesión exitoso" });
//     } catch (e) {
//         return res.status(400).json({ status: 400, message: "Error al iniciar sesión" });
//     }
// }

exports.loginUser = async function (req, res, next) {
    // Req.Body contains the form submit values.
    console.log("body",req.body)
    var User = {
        email: req.body.email,
        password: req.body.password
    }
    try {
        // Calling the Service function with the new object from the Request Body
        var loginUser = await UserService.loginUser(User);
        if (loginUser===0)
            return res.status(400).json({message: "Error en la contraseña"})
        else
           
            //res.cookie('jwt', loginResult.token, { httpOnly: true, secure: true });
            res.cookie('jwt', loginUser.token, { httpOnly: true});
            return res.status(201).json({loginUser, message: "Inicio de sesión exitoso"})
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        console.log(e)
        console.error(e)
        return res.status(400).json({status: 400, message: "Invalid username or password"})
        
    }
}



// Obtener todos los usuarios
exports.getAllUsers = async function (req, res, next) {
    try {
        var allUsers = await UserService.getAllUsers();
        return res.status(200).json({ status: 200, data: allUsers, message: "Todos los usuarios obtenidos exitosamente" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}


    
    
