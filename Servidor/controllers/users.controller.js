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


exports.createUser = async function (req, res, next) {
    console.log("llegue al controller", req.body);
    var User = {
        username: req.body.username,
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
        edad: req.body.edad,
        resetPasswordToken: req.body.resetPasswordToken,
        resetPasswordExpires: req.body.resetPasswordExpires,
    };

    try {
        var createdUser = await UserService.createUser(User);
        return res.status(201).json({ createdUser, message: "Successfully Created User" });
    } catch (e) {
        console.log(e);
        console.error(e);

        // Manejo específico del error de correo electrónico ya registrado
        if (e.message === 'El correo electrónico ya está registrado.') {
            return res.status(409).json({ message: e.message });
        }

        // Manejo general de otros errores
        return res.status(400).json({ status: 400, message: "User Creation was Unsuccessful" });
    }
};



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

exports.getProfile = async function (req, res, next) {
    try {
        // Extraer el ID del usuario del token JWT
        var userId = req.userId; 
        console.log("user.controller", userId );
        var user = await UserService.getProfile(userId);
        return res.status(200).json({ status: 200, data: user, message: "Perfil obtenido exitosamente" });
    } catch (e) {
        console.error(e);
        return res.status(400).json({ status: 400, message: e.message });
    }
};



// Obtener todos los usuarios
exports.getAllUsers = async function (req, res, next) {
    try {
        var allUsers = await UserService.getAllUsers();
        return res.status(200).json({ status: 200, data: allUsers, message: "Todos los usuarios obtenidos exitosamente" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.forgotPassword = async function(req, res) {
    try {
        const email = req.body.email;
        const token = await UserService.forgotPassword(email);
        console.log(email);
        res.status(200).json({ message: 'Token sent to email', token }); 
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
    

exports.verifyAndUpdate = async function(req, res) {
    try {
        const { resetPasswordToken, password } = req.body;
        console.log('Token:', resetPasswordToken, 'Nueva Contraseña:', password);

        // Asegúrate de que los nombres de los argumentos coincidan con los esperados por el servicio
        const user = await UserService.verifyAndUpdate(resetPasswordToken, password);

        res.status(200).json({ message: 'Contraseña actualizada con éxito' });
    } catch (e) {
        console.error('Error en verifyAndUpdate:', e);
        res.status(500).json({ message: e.message });
    }
};

exports.getUpcomingMedicalVisits = async function(req, res, next) {
    try {
        const userId = req.userId; // Asegúrate de obtener el userId correctamente
        const visits = await UserService.getUpcomingMedicalVisits(userId);
        return res.status(200).json({ status: 200, data: visits, message: "Visitas médicas próximas obtenidas exitosamente" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
};