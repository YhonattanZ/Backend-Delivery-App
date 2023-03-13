const Order = require('../models/order');
const OrderHasProducts = require('../models/order_has_products');
const user = require('../models/user');
const pushNotificationController = require('../controllers/push_notifications_controller');

module.exports = {

//Listar las ordenes por Status
    findByStatus(req,res){
        const status = req.params.status;

        Order.findByStatus(status,(err,data)=>{
            if(err){
                return res.status(501).json({
                    success:false,
                    message: 'Hubo un error al momento de listar las ordenes',
                    error: err
                });
            }
            for(const d of data){
                d.address = JSON.parse(d.address);
                d.delivery = JSON.parse(d.delivery)
                d.client = JSON.parse(d.client);
                d.products = JSON.parse(d.products);
            }
           
            return res.status(200).json(data);
        })
    },
//Listar las ordenes por status y delivery
    findByDeliveryAndStatus(req,res){
        const status = req.params.status;
        const id_delivery = req.params.id_delivery;

        Order.findByDeliveryAndStatus(id_delivery,status,(err,data)=>{
            if(err){
                return res.status(501).json({
                    success:false,
                    message: 'Hubo un error al momento de listar las ordenes',
                    error: err
                });
            }
            for(const d of data){
                d.delivery = JSON.parse(d.delivery)
                d.address = JSON.parse(d.address);
                d.client = JSON.parse(d.client);
                d.products = JSON.parse(d.products);
            }
           
            return res.status(200).json(data);
        })
    },
// Listar las ordenes por status y cliente
    findByClientAndStatus(req,res){
        const status = req.params.status;
        const id_client= req.params.id_client;

        Order.findByClientAndStatus(id_client,status,(err,data)=>{
            if(err){
                return res.status(501).json({
                    success:false,
                    message: 'Hubo un error al momento de listar las ordenes',
                    error: err
                });
            }
            for(const d of data){
                d.delivery = JSON.parse(d.delivery)
                d.address = JSON.parse(d.address);
                d.client = JSON.parse(d.client);
                d.products = JSON.parse(d.products);
            }
           
            return res.status(200).json(data);
        })
    },

//Crear orden
   create(req,res){
        const order = req.body;

        Order.create(order,async (err,id)=>{

            if(err){
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error al crear la orden',
                    error: err
                });
            }

            for(const product of order.products){
                await OrderHasProducts.create(id,product.id, product.quantity, (err,id_data)=> {
                    if(err){
                        return res.status(501).json({
                            success: false,
                            message: 'Hubo un error al crear los productos de la orden',
                            error: err
                        });
                    }                    
                });
            }

            return res.status(201).json({
                success:true,
                message: 'La orden ha sido creada',
                data: `${id}` //ID de la categoria creada
            });
        });
    },
//Actualizar orden a DESPACHADO
    updateToDispatched(req,res){
        const order = req.body;
        Order.updateToDispatched(order.id, order.id_delivery,(err, id_order)=> {
            if(err){
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error al actualizar la orden',
                    error: err
                });
            }

user.findById(order.id_delivery, (err,user) => {
    if(user !== undefined && user !== null){
        console.log('NOTIFICATION TOKEN', user.notification_token);
        pushNotificationController.sendNotification(user.notification_token, {
            title: 'PEDIDO ASIGNADO',
            body: 'Te ha sido asignado un pedido para entregar',
            id_notification: '1'
        });
    }

});

            return res.status(201).json({
                success:true,
                message: 'La orden ha sido actualizada',
                data: `${id_order}` //ID de la categoria creada
            }); });
    },
    //Actualizar orden a EN CAMINO
    updateToOnTheWay(req,res){
        const order = req.body;
        Order.updateToOnTheWay(order.id,(err, id_order)=> {
            if(err){
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error al actualizar la orden',
                    error: err
                });
            }
            return res.status(201).json({
                success:true,
                message: 'La orden ha sido actualizada',
                data: `${id_order}` //ID de la categoria creada
            }); });
    },
    //Actualizar orden a ENTREGADO
    updateToDelivered(req,res){
        const order = req.body;
        Order.updateToDelivered(order.id,(err, id_order)=> {
            if(err){
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error al actualizar la orden',
                    error: err
                });
            }
            return res.status(201).json({
                success:true,
                message: 'La orden ha sido actualizada',
                data: `${id_order}` //ID de la categoria creada
            }); });
    },

    //Actualizar latitud y longitud 
    updateLatLng(req,res){
        const order = req.body;
        console.log('ORDER:',order);

        Order.updateLatLng(order,(err, id_order)=> {
            if(err){
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error al actualizar la orden',
                    error: err
                });
            }
            return res.status(201).json({
                success:true,
                message: 'La orden ha sido actualizada',
                data: `${id_order}` //ID de la categoria creada
            }); });
    }

}