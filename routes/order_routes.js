const passport = require('passport');
const OrdersCtrl = require('../controllers/orders_controller');

module.exports = (app) => {
    
    //GET - Obtener datos
    //POST - Almacenar datos
    //PUT - Actualizar datos 
    //DELETE - Eliminar datos 
    
    //Traer todas los pedidos por status (GET)
    app.get('/api/orders/findByStatus/:status',passport.authenticate('jwt',{session: false}),OrdersCtrl.findByStatus);
    //Traer los pedidos por status y delivery
    app.get('/api/orders/findByDeliveryAndStatus/:id_delivery/:status',passport.authenticate('jwt',{session: false}),OrdersCtrl.findByDeliveryAndStatus);

    //Crear categorias (POST)
    app.post('/api/orders/create',passport.authenticate('jwt',{session: false}),OrdersCtrl.create);
    
    //Actualizar pedido a DESPACHADO
    app.put('/api/orders/updateToDispatched',passport.authenticate('jwt',{session: false}),OrdersCtrl.updateToDispatched);
    //Actualizar pedido a EN CAMINO
    app.put('/api/orders/updateToOnTheWay',passport.authenticate('jwt',{session: false}),OrdersCtrl.updateToOnTheWay);
    //Actualizar latitud y longitud
    app.put('/api/orders/updateLatLng',passport.authenticate('jwt',{session: false}),OrdersCtrl.updateLatLng);
   
}