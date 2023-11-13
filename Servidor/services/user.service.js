// Gettign the Newly created Mongoose Model we just created 
var User = require('../models/User.model');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

// Saving the context of this module inside the _the variable
_this = this

// Async function to get the User List
exports.getUsers = async function (query, page, limit) {

    // Options setup for the mongoose paginate
    var options = {
        page,
        limit
    }
    // Try Catch the awaited promise to handle the error 
    try {
        console.log("Query",query)
        var Users = await User.paginate(query, options)
        // Return the Userd list that was retured by the mongoose promise
        return Users;

    } catch (e) {
        // return a Error message describing the reason 
        console.log("error services",e)
        throw Error('Error while Paginating Users');
    }
}

exports.createUser = async function (user) {
    var hashedPassword = bcrypt.hashSync(user.password, 8);

    var newUser = new User({
        username: user.username,
        password: hashedPassword,
        fechaNacimiento: user.fechaNacimiento,
        email: user.email,
        perfil: {
            nombre: user.nombre,
            apellido: user.apellido,
            edad: user.edad,
            genero: user.genero,
            telefono: user.telefono,
            sangreTipo: user.sangreTipo,
            peso: user.peso,
            altura: user.altura,
            c_emergencia: user.c_emergencia,   
        },
        
    });

    try {
        var savedUser = await newUser.save();
        var token = jwt.sign({ id: savedUser._id }, process.env.SECRET, { expiresIn: 86400 });
        return token;
    } catch (e) {
        throw Error("Error al crear el usuario");
    }
}


// exports.updateUser = async function (user) {
    
//     var id = {name :user.name}
//     console.log(id)
//     try {
//         //Find the old User Object by the Id
//         var oldUser = await User.findOne(id);
//         console.log (oldUser)
//     } catch (e) {
//         throw Error("Error occured while Finding the User")
//     }
//     // If no old User Object exists return false
//     if (!oldUser) {
//         return false;
//     }
//     //Edit the User Object
//     var hashedPassword = bcrypt.hashSync(user.password, 8);
//     oldUser.name = user.name
//     oldUser.email = user.email
//     oldUser.password = hashedPassword
//     try {
//         var savedUser = await oldUser.save()
//         return savedUser;
//     } catch (e) {
//         throw Error("And Error occured while updating the User");
//     }
// }


exports.updateUser = async function (userId, userData) {
    try {
        var updatedUser = await User.findByIdAndUpdate(userId, userData, { new: true });
        return updatedUser;
    } catch (e) {
        throw Error("Error al actualizar el usuario");
    }
}


exports.deleteUser = async function (id) {
    console.log(id)
    // Delete the User
    try {
        var deleted = await User.remove({
            _id: id
        })
        if (deleted.n === 0 && deleted.ok === 1) {
            throw Error("User Could not be deleted")
        }
        return deleted;
    } catch (e) {
        throw Error("Error Occured while Deleting the User")
    }
}


exports.loginUser = async function (user) {
    try {
        var _details = await User.findOne({ email: user.email });
        var passwordIsValid = bcrypt.compareSync(user.password, _details.password);
        if (!passwordIsValid) return 0;

        var token = jwt.sign({ id: _details._id }, process.env.SECRET, { expiresIn: 86400 });
        return { token: token, user: _details };
    } catch (e) {
        throw Error("Error al iniciar sesión");
    }
}

exports.getAllUsers = async function () {
    try {
        var users = await User.find({});
        return users;
    } catch (e) {
        throw Error('Error al obtener todos los usuarios');
    }
}