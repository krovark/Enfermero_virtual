var express = require('express')
var router = express.Router()
var UserController = require('../../controllers/users.controller');
var Authorization = require('../../auth/authorization');


// Authorize each API with middleware and map to the Controller Functions
/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('Llegaste a la ruta de  api/user.routes');
  });
router.post('/registration', UserController.createUser)
router.post('/login', UserController.loginUser)
router.get('/users',Authorization, UserController.getUsers)
router.get('/allusers',Authorization, UserController.getAllUsers)
router.get('/profile', Authorization, UserController.getProfile);
router.put('/:id/update', Authorization, UserController.updateUser)
router.delete('/:id/delete', Authorization, UserController.removeUser)
router.post('/forgot-password', UserController.forgotPassword);
router.post('/reset_password', UserController.verifyAndUpdate);

// Export the Router
module.exports = router;


