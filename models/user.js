const db = require('../config/config');
const bcrypt = require('bcryptjs');
const User = {};
//Encontrar usuario por ID
User.findById = (id, result) => {
    const sql = //Encontrar por email y extrar el rol
    `
SELECT
    CONVERT(U.id, char) AS id,
	U.email,
    U.name,
    U.lastname,
    U.image,
    U.phone,
    U.password,
    JSON_ARRAYAGG(
    JSON_OBJECT(
    'id', CONVERT(R.id, char),
    'name', R.name,
    'image', R.image,
    'route', R.route
	)
    ) AS roles
FROM
    users AS U      
INNER JOIN
	user_has_roles AS UHR    
	ON UHR.id_user = U.id         
INNER JOIN
	roles AS R
    ON UHR.id_rol = R.id
WHERE
    U.id 
    `;
    db.query(
        sql,
        [id],
        (err, user) => {
            if (err){
                console.log('Error:', err)
                result(err,null);
            }else{
                console.log('Usuario obtenido ', user);
                result(null, user);
            }
})
}

User.findDeliveryMen = (result) =>{
    const sql = `
    SELECT
	CONVERT(U.id, char) AS id,
	U.email,
	U.name,
	U.lastname,
	U.image,
	U.phone
FROM
	users AS U
INNER JOIN
	user_has_roles AS UHR
ON
	UHR.id_user = U.id
INNER JOIN
	roles AS R
ON
	R.id = UHR.id_rol
WHERE
	R.id = 2;    
        
    `;
    db.query(
        sql,
        (err,data) => {
            if(err){
                console.log('Error:', err);
                result(err,null);
            }
            else{
                result(null,data);
            }
        });
}

//Encontrar usuario por Email
User.findByEmail = (email, result) => {
    const sql = //Encontrar por email y extrar el rol
    `
    SELECT
        U.id,
		U.email,
        U.name,
        U.lastname,
        U.image,
        U.phone,
        U.password,
        JSON_ARRAYAGG(
        JSON_OBJECT(
        'id', CONVERT(R.id, char),
        'name', R.name,
        'image', R.image,
        'route', R.route
			)
        ) AS roles
    FROM
        users AS U      
    INNER JOIN
		user_has_roles AS UHR    
	    ON UHR.id_user = U.id         
    INNER JOIN
		roles AS R
        ON UHR.id_rol = R.id
    WHERE
        email = ?
	GROUP BY
    U.id
    `;

    db.query(
        sql,
        [email],
        (err,res) =>{
            if(err){
                console.log('Error:', err)
                result(err,null);
            }
            else{
                console.log('Usuario:', res[0]);
                result(err, res[0]);
            }
        },
        )
}

//Crear usuario
User.create = async (user, result) => {
    //Encriptar contrasena del usuario
    const hash = await bcrypt.hash(user.password, 10); 
    const sql = `
    INSERT INTO 
        users(
            email,
            name,
            lastname,
            phone,
            image,
            password,
            created_at,
            updated_at
        )
    VALUES(?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query
    (
        sql,
        [
            user.email,
            user.name,
            user.lastname,
            user.phone,
            user.image,
            hash,
            new Date(),
            new Date()
        ],
        (err,res) =>{
            if(err){
                console.log('Error:', err)
                result(err,null);
            }
            else{
                console.log('ID del usuario:', res.insertId);
                result(err, res.insertId);
            }
        }

    )
}
//Metodo para actualizar datos del usuario
User.updatewithImage = (user,result) => {

const sql = `
UPDATE
    users
SET
    name = ?,    
    lastname = ?,    
    phone = ?,    
    image = ?,    
    updated_at = ?    
 WHERE
    id = ?
`;

db.query
    (
        sql,
        [
            user.name,
            user.lastname,
            user.phone,
            user.image,
            new Date(),
            user.id
        ],
        (err,res) =>{
            if(err){
                console.log('Error:', err)
                result(err,null);
            }
            else{
                console.log('Usuario actualizado:', user.id);
                result(null, user);
            }
        }

    )

}

//Metodo para actualizar el usuario pero no la imagen
User.updateWithoutImage = (user,result) => {

const sql = `
UPDATE
    users
SET
    name = ?,    
    lastname = ?,    
    phone = ?,        
    updated_at = ?    
 WHERE
    id = ?
`;

db.query
    (
        sql,
        [
            user.name,
            user.lastname,
            user.phone,
            new Date(),
            user.id
        ],
        (err,res) =>{
            if(err){
                console.log('Error:', err)
                result(err,null);
            }
            else{
                console.log('La informacion personal se ha actualizado:', user.id);
                result(null, user);
            }
        }

    )

}

module.exports = User;