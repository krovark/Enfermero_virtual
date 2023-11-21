// Gettign the Newly created Mongoose Model we just created 
var User = require('../models/User.model');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const crypto = require('crypto');
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);


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
    // Verificar si ya existe un usuario con el mismo correo electrónico
    const existingUser = await User.findOne({ email: user.email });
    if (existingUser) {
        throw new Error('El correo electrónico ya está registrado.');
    }

    // Continúa con la creación del usuario si el correo electrónico no está en uso
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
        console.error(e)
        throw new Error("Error al crear el usuario");
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



exports.forgotPassword = async function(email) {
    const user = await User.findOne({ email: email });
    if (!user) {
        throw new Error('No existe una cuenta con ese email.');
    }

    // Crear un token único
    const token = crypto.randomBytes(10).toString('hex');

    // Establecer token y su expiración en el usuario
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 7200000; // 2 horas
    console.log(email);
    console.log(token);
    console.log('Fecha actual:', new Date().toISOString());
    console.log('Fecha de expiración:', new Date(user.resetPasswordExpires).toISOString());
    await user.save();
    console.log(process.env.SENDGRID_API_KEY);
    // Enviar email con el token

    const msg = {
        to: email,
        from: 'santiagojgonzalez@uade.edu.ar',
        subject: 'Password Reset',
        text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
               Please use the following token for password reset: ${token}\n\n
               If you did not request this, please ignore this email and your password will remain unchanged.\n`
    };

    //await sgMail.send(msg);

    sgMail
  .send(msg)
  .then(() => {
    console.log('Email sent')
  })
  .catch((error) => {
    console.error(error)
    
  })


    return {token} ; 
};


// exports.forgotPassword = async function(email) {
//     try {
//         const user = await User.findOne({ email: email });
//         if (!user) {
//             throw new Error('No existe una cuenta con ese email.');
//         }

//         const token = crypto.randomBytes(4).toString('hex');
//         user.resetPasswordToken = token;
//         user.resetPasswordExpires = Date.now() + 3600000; // 1 hora
//         await user.save();

//         return { token };  // Envía el token como respuesta
//     } catch (error) {
//         throw error;
//     }
// };


// exports.forgotPassword = async function(email) {
//     try {
//         const user = await User.findOne({ email: email });
//         if (!user) {
//             throw new Error('No existe una cuenta con ese email.');
//         }

//         // Crear un token único
//         const token = crypto.randomBytes(10).toString('hex');

//         // Establecer token y su expiración en el usuario
//         user.resetPasswordToken = token;
//         user.resetPasswordExpires = Date.now() + 3600000; // 1 hora
//         await user.save();
//         console.log(email);
//         console.log(token);
//         console.log(process.env.SENDGRID_API_KEY);
//         // Preparar el mensaje de correo electrónico
//         const msg = {
//             to: email,
//             from: 'santiagojgonzalez@uade.edu.ar', // Reemplaza con tu dirección de correo verificada en SendGrid
//             subject: 'Password Reset',
//             text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
//                    Please use the following token for password reset: ${token}\n\n
//                    If you did not request this, please ignore this email and your password will remain unchanged.\n`
//         };

//         // Enviar el correo electrónico
//         await sgMail.send(msg);

//         return token;
//     } catch (error) {
//         console.error('Error en forgotPassword:', error);
//         throw error; // Propagar el error para que pueda ser manejado por el llamador
//     }
// };

exports.verifyAndUpdate = async function(resetPasswordToken, password) {
    try {
        // Primero, buscar usuario por token
        const user = await User.findOne({ resetPasswordToken: resetPasswordToken });

        // Luego, verificar si el usuario existe y si el token no ha expirado
        if (!user || user.resetPasswordExpires < Date.now()) {
            throw new Error('Token inválido o expirado');
        }

        // Actualizar contraseña
        console.log('Nueva contraseña:', password);
        console.log('Token recibido:', resetPasswordToken);
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;

        await user.save();

        return user;
    } catch (e) {
        throw new Error('Error al verificar y actualizar: ' + e.message);
        console.error(e);
    }
};