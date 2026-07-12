-- Datos semilla (idempotente: INSERT IGNORE no duplica si ya existen los ids)

INSERT IGNORE INTO categoria (id, nombre, descripcion) VALUES
(1, 'Bebidas', 'Gaseosas, jugos y aguas'),
(2, 'Almacén', 'Productos de despensa'),
(3, 'Librería', 'Útiles escolares y de oficina'),
(4, 'Tecnología', 'Accesorios y periféricos');

INSERT IGNORE INTO producto (id, nombre, descripcion, precio, imagen, stock, categoria_id) VALUES
(1, 'Coca Cola 1.5L', 'Gaseosa cola retornable 1.5 litros', 4500, 'https://picsum.photos/seed/cocacola/400/300', 24, 1),
(2, 'Agua Mineral 2L', 'Agua mineral sin gas', 1800, 'https://picsum.photos/seed/agua/400/300', 40, 1),
(3, 'Jugo de Naranja 1L', 'Jugo exprimido natural', 3200, 'https://picsum.photos/seed/jugo/400/300', 15, 1),
(4, 'Fideos Spaghetti 500g', 'Pasta de sémola de trigo', 1500, 'https://picsum.photos/seed/fideos/400/300', 30, 2),
(5, 'Arroz Largo Fino 1kg', 'Arroz tipo 00000', 2100, 'https://picsum.photos/seed/arroz/400/300', 25, 2),
(6, 'Aceite de Girasol 1.5L', 'Aceite comestible', 5200, 'https://picsum.photos/seed/aceite/400/300', 12, 2),
(7, 'Cuaderno Tapa Roja', 'Cuaderno rayado 48 hojas', 900, 'https://picsum.photos/seed/cuaderno/400/300', 50, 3),
(8, 'Lapicera Azul', 'Bolígrafo trazo medio', 350, 'https://picsum.photos/seed/lapicera/400/300', 100, 3),
(9, 'Mouse Inalámbrico', 'Mouse óptico USB 2.4GHz', 12500, 'https://picsum.photos/seed/mouse/400/300', 8, 4),
(10, 'Auriculares Bluetooth', 'Auriculares in-ear con micrófono', 18900, 'https://picsum.photos/seed/auris/400/300', 5, 4);

INSERT IGNORE INTO usuario (id, nombre, email, direccion) VALUES
(1, 'Miranda Portocarrero', 'miranda@techlab.com', 'Av. Siempre Viva 123'),
(2, 'Juan Pérez', 'juan.perez@mail.com', 'Calle Falsa 456'),
(3, 'Ana García', 'ana.garcia@mail.com', 'Ruta 8 km 42');
