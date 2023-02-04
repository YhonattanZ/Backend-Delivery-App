const passport = require('passport');
const addressCtrl = require('../controllers/address_controller');

module.exports = (app) => {
    
    //GET - Obtener datos
    //POST - Almacenar datos
    //PUT - Actualizar datos 
    //DELETE - Eliminar datos 
    
    //Crear direcciones (POST)
    app.post('/api/address/create',passport.authenticate('jwt',{session: false}),addressCtrl.create);
    //Traer todas las direcciones (GET)
    app.get('/api/address/findByUser/:id_user',passport.authenticate('jwt',{session: false}),addressCtrl.findByUser);

}