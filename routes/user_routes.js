
const usersCtrl = require('../controllers/users_controller');

module.exports = (app) => {
    
    //GET - Obtener datos
    //POST - Almacenar datos
    //PUT - Actualizar datos 
    //DELETE - Eliminar datos 
    
    app.post('/api/users/create', usersCtrl.register);
    app.post('/api/users/login', usersCtrl.login);
}