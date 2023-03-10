const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const storage = require('../utils/cloud_storage');
const rol = require('../models/roles')
module.exports = {

    findDeliveryMen(req,res){
        User.findDeliveryMen((err,data) =>{
            if(err){
                return res.status(501).json({
                    success:false,
                    message:'Hubo un error al listar los repartidores',
                    error: err
                });
            }
            return res.status(201).json(data);
        });
    },

    login(req,res){
    //Obtener email y password
    const email = req.body.email;
    const password = req.body.password;

    User.findByEmail(email, async (err,myUser) =>{
        if(err){
            return res.status(501).json({
                success: false,
                message: 'Hubo un error al iniciar sesion',
                error: err
            });
        }

        if(!myUser){
            // El cliente no tiene autorizacion para la realizar la peticion
            return res.status(401).json({
                success: false,
                message: 'Email no encontrado',
               
            });
        }
        const isPasswordValid = await bcrypt.compare(password, myUser.password);
        if(isPasswordValid){
        const token = jwt.sign({id: myUser.id,email: myUser.email}, keys.secretOrKey, {
            
        });
        
        //Respuesta del cliente
        const data = {
            id: `${myUser.id}`,
            name: myUser.name,
            lastname: myUser.lastname,
            email:myUser.email,
            phone: myUser.phone,
            image: myUser.image,
            password: myUser.password,
            session_token: `JWT ${token}`,
            //JSON.parse transforma la respuesta en un JSON nativo sin /
            roles: JSON.parse(myUser.roles)
        }

        return res.status(201).json({
            success: true,
            message: 'Usuario verificado',
            data: data // ID del nuevo usuario registrado
        });

        } else{
            return res.status(401).json({
                success: false,
                message: 'Password incorrecto',
               
            });
        }
        
    });

    },

    register(req,res){
        const user = req.body; //Captura los datos del cliente 
        User.create(user, (err,data) =>{
            if(err){
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error al registrar usuario',
                    error: err
                });
            }
            return res.status(201).json({
                success: true,
                message: 'Registro de usuario realizado correctamente',
                data: data // ID del nuevo usuario registrado
            });
        });


    },
    async registerWithImage(req,res) {
        const user = JSON.parse(req.body.user); //Captura los datos del cliente 
        
        //Almacenar la imagen
        const files = req.files;
        if(files.length > 0){
            const path = `image_${Date.now()}`
            const url = await storage(files[0], path);
            if(url != undefined && url != null){
                user.image = url;
            }
        }
       
        User.create(user, (err,data) =>{


            if(err){
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error al registrar usuario',
                    error: err
                });
            }

            user.id = `${data}`;      
            const token = jwt.sign({id: user.id,email: user.email}, keys.secretOrKey, {});
            user.session_token =`JWT ${token}`;
            //Crea el rol por defecto CLIENT con el id_rol 3 
            rol.create(user.id, 3, (err, data) =>{
                if(err){
                    return res.status(501).json({
                        success: false, 
                        message: 'Fallo al asignar rol del usuario',
                        error:err
                    });
                }

                return res.status(201).json({
                     success: true,
                     message: 'Registro de usuario realizado correctamente',
                     data: user  // ID del nuevo usuario registrado
                 });
            });

        });


    },
    //Actualizar datos incluyendo la imagen del usuario
    async updateWithImage(req,res) {

        const user = JSON.parse(req.body.user); //Actualiza los datos con imagen 
        
        //Almacenar la imagen en Firestore
        const files = req.files;

        if(files.length > 0){
            const path = `image_${Date.now()}`
            const url = await storage(files[0], path);
            if(url != undefined && url != null){
                user.image = url;
            }
        }
       
        User.updatewithImage(user, (err,data) =>{

            if(err){
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error al registrar usuario',
                    error: err
                });
            }
 
            User.findById(data,(err,MyData) => {
                if(err){
                    return res.status(501).json({
                        success: false,
                        message: 'hubo un error con el registro de usuario',
                        error: err
                    });
                }
            
                MyData[0].session_token = user.session_token;
                MyData[0].roles = JSON.parse(MyData[0].roles);

                return res.status(201).json({
                success: true,
                message: 'El usuario se ha actualizado',
                data: MyData
                });

            })
        });
    },
    //Acualiza los d                                                                    sxnm xnzttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttatos del usuario sin sobreescribir la imagen
    async updateWithoutImage(req,res) {

        const user = req.body; //Actualiza los datos de manera normal
       
        User.updateWithoutImage(user, (err,data) =>{
            if(err){
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error al registrar usuario',
                    error: err
                });
            }
 
            User.findById(data,(err,MyData) => {
                if(err){
                    return res.status(501).json({
                        success: false,
                        message: 'hubo un error con el registro de usuario',
                        error: err
                    });
                }
               
                MyData.session_token = user.session_token;
                MyData[0].roles = JSON.parse(MyData[0].roles);
                
                return res.status(201).json({
                success: true,
                message: 'El usuario se ha actualizado',
                data: MyData
                });

            })

        });
    },
    
    async updateNotificationToken(req,res) {

        const id = req.body.id; //Actualiza los datos de manera normal
        const token = req.body.token;

        User.updateNotificationToken(id,token, (err,id_user) =>{
            if(err){
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error al actualizar el token del usuario',
                    error: err
                });
            }
 
           
                
                return res.status(201).json({
                success: true,
                message: 'El token notificacion se ha actualizado',
                data: id_user
                });

         

        });
    }
} 
