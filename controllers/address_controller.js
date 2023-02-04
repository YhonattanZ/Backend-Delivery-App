const Address = require('../models/address');

module.exports = {
    findByUser(req,res){
        const id_user = req.params.id_user;
        Address.findByIdUser(id_user, (err,data) => {
            if(err){
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error al tratar de obtener las direcciones',
                    error: err
                });
            }

            return res.status(201).json(data);
        })
    },
    //Metodo para crear categorias
    create(req,res){
        const address = req.body;

        Address.create(address,(err,id) => {

            if(err){
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error al registrar la dirección',
                    error: err
                });
            }

            return res.status(201).json({
                success:true,
                message: 'Dirección creada correctamente',
                data: `${id}` //ID de la categoria creada
            });
        });
    },

}