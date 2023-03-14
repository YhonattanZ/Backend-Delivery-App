const e = require('express');
const mercadopago = require('mercadopago');
const Order = require('../models/order');
const OrderHasProducts = require('../models/order_has_products');
const pushNotificationController = require('./push_notifications_controller');
const User = require('../models/user');

mercadopago.configure({
    sandbox: true,
    access_token: 'TEST-2624909819854127-030211-d79183abf77196e4026fc498f1aaf5b0-1321606467',
});

module.exports = {
    //Crear pago en mercadopago
    async createPayment(req,res){
        let payment = req.body;
        console.log('PAYMENT:', payment);
    //Datos del cliente
        const payment_data = {
            token: payment.token,
            issuer_id: payment.issuer_id,
            payment_method_id: payment.payment_method_id,
            transaction_amount: payment.transaction_amount,
            installments: payment.installments,
            payer: {
                email: payment.payer.email,
                identification: {
                    type: payment.payer.identification.type,
                    number: payment.payer.identification.number,
                },
            },
        }
        const data = await mercadopago.payment.create(payment_data).catch((err)=> {
            console.log('Error de mercado pago', err);
            return res.status(501).json({
                success: false,
                message: 'Hubo un error al crear el pago con MercadoPago',
                error: err
            });
        });
        if(data){

    //Realizamos esta validacion para que en caso de error el servidor no caiga        
if(data.body !== null && data.body !== undefined){
    const order = payment.order;
    //Pago de la orden del usuario
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

        User.findAdminRestaurant((err,users) => {
            if(users !== undefined && users !== null){
                if(users.length > 0){
               //Definimos una variable length para almacenar los token en un array
                    let tokens = [];
                    users.forEach(u => {
                        tokens.push(u.notification_token);
                    });
                    console.log('TOKENS MULTIUSUARIO', tokens);
                    pushNotificationController.sendNotificationMultipleDevices(tokens, {
                        title: 'COMPRA REALIZADA',
                        body: 'Un cliente ha realizado una compra',
                        id_notification: '2'
                    });
                }
                
            }
        
        });
        

        return res.status(201).json({
            success:true,
            message: 'La orden ha sido pagada',
            data: data.response
        });        
    });    
}else{
    return res.status(501).json({
        success: false,
        message: 'Error al crear el pago',
        });
} 

    
} 
else{
    return res.status(501).json({
        success: false,
        message: 'Error en algun dato de la peticion',
        error: err
    });
}
}
}
