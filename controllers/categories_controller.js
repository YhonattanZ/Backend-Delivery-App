const Category = require('../models/categories');

module.exports = {

    //Metodo para crear categorias
    create(req,res){
        const category = req.body;

        Category.create(category,(err,id)=>{

            if(err){
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error al solicitar las categorias',
                    error: err
                });
            }

            return res.status(201).json({
                success:true,
                message: 'Categoria creada correctamente',
                data: `${id}` //ID de la categoria creada
            });
        });
    },

    getAll(req,res){
        Category.getAll((err,data)=>{
            if(err){
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error al momento de listar las categorias',
                    error: err
                });
            }

            return res.status(201).json({
                success:true,
                message: 'Categoria solicitadas correctamente',
                data: data //Traemos las categorias como una lista
            });
        })
    }

}