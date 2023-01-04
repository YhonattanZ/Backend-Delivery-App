const db =require('../config/config');

const rol = {};
//Crear rol de usuario por defecto el rol sera CLIENTE
rol.create = (id_user, id_rol, result) =>{
    const sql = `
    INSERT INTO 
    user_has_roles(
        id_user,
        id_rol,
        created_at,
        updated_at
    )
VALUES(?, ?, ?, ?)
`;

        db.query(
            sql,
            [id_user,id_rol, new Date(), new Date()],
            (err,res) =>{
                if(err){
                    console.log('Error:', err)
                    result(err,null);
                }
                else{
                    console.log('Usuario:', res.insertId);
                    result(null, res.insertId);
                }
            },
            )
    
}
module.exports = rol;