USE delivery;

--Tabla para crear usuarios
CREATE TABLE users(
	id BIGINT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(180) NOT NULL UNIQUE,
    name VARCHAR(90) NOT NULL,
    lastname VARCHAR(90) NOT NULL,
    notification_token VARCHAR(255),
    phone VARCHAR(90) NOT NULL,
    image VARCHAR(255) NULL,
    password VARCHAR(90) NOT NULL,
    created_at TIMESTAMP(0) NOT NULL,
    updated_at TIMESTAMP(0) NOT NULL
);
--Tabla para crear roles--
CREATE TABLE roles(
id BIGINT PRIMARY KEY AUTO_INCREMENT,
name VARCHAR(90) NOT NULL UNIQUE,
image VARCHAR(255) NULL,
route VARCHAR(200) NOT NULL,
created_at TIMESTAMP(0) NOT NULL,
updated_at TIMESTAMP(0) NOT NULL
);

INSERT INTO roles(
name,
route,
created_at,
updated_at
)
					-- ROL ADMIN --
VALUES(
'RESTAURANT',
'/restaurant/orders/list',
'2023-01-03',
'2023-01-03'
);

INSERT INTO roles(
name,
route,
created_at,
updated_at
)

					-- ROL DELIVERY --
VALUES(
'REPARTIDOR',
'/delivery/orders/list',
'2023-01-03',
'2023-01-03'
);
                      -- ROL CLIENTE -- 
INSERT INTO roles(
name,
route,
created_at,
updated_at
)
VALUES(
'CLIENTE',
'/client/products/list',
'2023-01-03',
'2023-01-03'
);
--Tabla roles del usuario--
CREATE TABLE user_has_roles(
id_user BIGINT NOT NULL,
id_rol BIGINT NOT NULL,
created_at TIMESTAMP(0) NOT NULL,
updated_at TIMESTAMP(0) NOT NULL,
FOREIGN KEY(id_user) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE,
FOREIGN KEY(id_rol) REFERENCES roles(id) ON UPDATE CASCADE ON DELETE CASCADE,
PRIMARY KEY(id_user, id_rol)
);

--Tabla categorias--
CREATE TABLE categories(
id BIGINT PRIMARY KEY AUTO_INCREMENT,
name VARCHAR(180) NOT NULL,
description TEXT NOT NULL,
created_at TIMESTAMP(0) NOT NULL,
updated_at TIMESTAMP(0) NOT NULL
);
--TABLA PRODUCTOS--
CREATE TABLE products(
id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(180) NOT NULL UNIQUE,
    description TEXT NOT NULL,
    price DECIMAL NOT NULL,
    image1 VARCHAR(255) NULL,
    image2 VARCHAR(255) NULL,
    image3 VARCHAR(255) NULL,
    id_category BIGINT NOT NULL,
    created_at TIMESTAMP(0) NOT NULL,
    updated_at TIMESTAMP(0) NOT NULL,
--RELACIONA LA TABLA ACTUAL CON CUALQUIER OTRA, ON UPDATE Y ON DELETE SIRVE PARA SI LA CATEGORIA ES ELIMINADA, SE ELIMINA TODO LO QUE ESTE RELACIONADO--
FOREIGN KEY(id_category) REFERENCES categories(id) ON UPDATE CASCADE ON DELETE CASCADE
);

--Direcciones con google map--
CREATE TABLE address (
id BIGINT PRIMARY KEY AUTO_INCREMENT,
address VARCHAR(255) NOT NULL,
neighborhood VARCHAR(180) NOT NULL,
lat DOUBLE PRECISION NOT NULL,
lng DOUBLE PRECISION NOT NULL,
created_at TIMESTAMP(0) NOT NULL,
updated_at TIMESTAMP(0) NOT NULL,
id_user BIGINT NOT NULL,
FOREIGN KEY(id_user) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE
);

--Tabla para las ordenes--
CREATE TABLE orders(
id BIGINT PRIMARY KEY AUTO_INCREMENT,
id_client BIGINT NOT NULL,
id_delivery BIGINT NULL,
id_address BIGINT NOT NULL,
lat DOUBLE PRECISION,
lng DOUBLE PRECISION,
status VARCHAR(90) NOT NULL, 
timestamp BIGINT NOT NULL,
created_at TIMESTAMP(0) NOT NULL,
updated_at TIMESTAMP(0) NOT NULL,
FOREIGN KEY(id_client) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE,
FOREIGN KEY(id_delivery) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE,
FOREIGN KEY(id_address) REFERENCES address(id) ON UPDATE CASCADE ON DELETE CASCADE
);

--Tabla de ordenes con productos--
CREATE TABLE order_has_product(
id_order BIGINT NOT NULL,
id_product BIGINT NOT NULL, 
quantity BIGINT NOT NULL,
created_at TIMESTAMP(0) NOT NULL,
updated_at TIMESTAMP(0) NOT NULL,
PRIMARY KEY (id_order,id_product),
FOREIGN KEY (id_order) REFERENCES orders(id) ON UPDATE CASCADE ON DELETE CASCADE,
FOREIGN KEY (id_product) REFERENCES products(id) ON UPDATE CASCADE ON DELETE CASCADE

);

