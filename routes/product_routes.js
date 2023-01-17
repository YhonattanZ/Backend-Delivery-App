const passport = require('passport');
const productsCtrl = require('../controllers/product_controller');

module.exports = (app,upload) => {
    
    //GET - Obtener datos
    //POST - Almacenar datos
    //PUT - Actualizar datos 
    //DELETE - Eliminar datos 
    
    //Crear usuarios
    app.post('/api/products/create',passport.authenticate('jwt',{session: false}),upload.array('image', 3), productsCtrl.create);
}