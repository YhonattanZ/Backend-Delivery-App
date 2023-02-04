const passport = require('passport');
const productsCtrl = require('../controllers/product_controller');

module.exports = (app,upload) => {
    
    //GET - Obtener datos
    //POST - Almacenar datos
    //PUT - Actualizar datos 
    //DELETE - Eliminar datos 
    
    //Crear productos
    app.post('/api/products/create',passport.authenticate('jwt',{session: false}),upload.array('image', 3), productsCtrl.create);
    //Obtener productos de una categoria
    app.get('/api/products/findByCategory/:id_category',passport.authenticate('jwt',{session: false}), productsCtrl.findByCategory);
}