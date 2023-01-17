const passport = require('passport');
const usersCtrl = require('../controllers/users_controller');

module.exports = (app, upload) => {
    
    //GET - Obtener datos
    //POST - Almacenar datos
    //PUT - Actualizar datos 
    //DELETE - Eliminar datos 
    
    //Crear usuarios
    app.post('/api/users/create',usersCtrl.register);
    //Crear usuario con imagen de perfil
    app.post('/api/users/createWithImage',upload.array('image', 1), usersCtrl.registerWithImage);
    //Login
    app.post('/api/users/login', usersCtrl.login);



    //Update con imagen (PUT)
    app.put('/api/users/update', passport.authenticate('jwt',{session:false}),upload.array('image', 1),usersCtrl.updateWithImage);
    //Update SIN imagen (PUT)
    app.put('/api/users/updateWithoutImage', passport.authenticate('jwt',{session:false}),usersCtrl.updateWithoutImage);

}