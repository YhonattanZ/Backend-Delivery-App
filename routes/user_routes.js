
const usersCtrl = require('../controllers/users_controller');

module.exports = (app, upload) => {
    
    //GET - Obtener datos
    //POST - Almacenar datos
    //PUT - Actualizar datos 
    //DELETE - Eliminar datos 
    
    app.post('/api/users/create',usersCtrl.register);
    app.post('/api/users/createWithImage',upload.array('image', 1), usersCtrl.registerWithImage);
    app.post('/api/users/login', usersCtrl.login);

}