const passport = require('passport');
const categoriesCtrl = require('../controllers/categories_controller');

module.exports = (app) => {
    
    //GET - Obtener datos
    //POST - Almacenar datos
    //PUT - Actualizar datos 
    //DELETE - Eliminar datos 
    
    //Crear categorias (POST)
    app.post('/api/categories/create',passport.authenticate('jwt',{session: false}),categoriesCtrl.create);
    //Traer todas las categorias (GET)
    app.get('/api/categories/getAll',passport.authenticate('jwt',{session: false}),categoriesCtrl.getAll);

}