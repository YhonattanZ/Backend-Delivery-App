const passport = require('passport');
const mercadoPagoCtrl = require('../controllers/mercado_pago_controller');

module.exports = (app) => {
    
    //GET - Obtener datos
    //POST - Almacenar datos
    //PUT - Actualizar datos 
    //DELETE - Eliminar datos 
    
    //Crear pago (POST)
    app.post('/api/payments/create',passport.authenticate('jwt',{session: false}),mercadoPagoCtrl.createPayment);
    

}